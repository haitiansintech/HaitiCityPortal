"use client";

import { useState, useEffect, useOptimistic, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { submitServiceRequest, type ServiceRequestInput } from "@/app/actions/submit-request";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wifi, WifiOff, CheckCircle2, Loader2, Camera, Paperclip, X } from "lucide-react";

interface Service {
    id: string;
    service_code: string;
    service_name: any; // JSONB field
}

interface ServiceRequestFormProps {
    services: Service[];
    sections: { id: string; name: string }[];
}

const DRAFT_STORAGE_KEY = "service_request_draft";

export default function ServiceRequestForm({ services, sections }: ServiceRequestFormProps) {
    const [isOnline, setIsOnline] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [optimisticStatus, setOptimisticStatus] = useOptimistic<
        { status: "idle" | "submitting" | "success" | "error"; message?: string },
        "submitting" | "success" | "error"
    >(
        { status: "idle" },
        (state, action) => {
            if (action === "submitting") return { status: "submitting" };
            if (action === "success") return { status: "success", message: "Report Submitted (Optimistic)" };
            if (action === "error") return { status: "error" };
            return state;
        }
    );
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        service_code: "",
        communal_section_id: "",
        description: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        issue_type: "", // For deep linking support
    });

    // Client-side compression helper
    const compressImage = async (file: File): Promise<File> => {
        // Only compress images
        if (!file.type.startsWith('image/')) return file;

        // Skip small images
        if (file.size < 1024 * 1024) return file;

        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target?.result as string;
            };

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(file);

                // Max dimension 1280px
                const MAX_WIDTH = 1280;
                const MAX_HEIGHT = 1280;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() }));
                    } else {
                        resolve(file); // Fallback
                    }
                }, 'image/jpeg', 0.7); // 70% quality
            };

            img.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUploadError(null);
            const newFiles = Array.from(e.target.files);

            // Validate Max Files
            if (files.length + newFiles.length > 5) {
                setUploadError("Maximum 5 files allowed.");
                return;
            }

            const processedFiles: File[] = [];
            const newPreviews: string[] = [];

            for (const file of newFiles) {
                // Validate Size (20MB)
                if (file.size > 20 * 1024 * 1024) {
                    setUploadError(`File ${file.name} is too large (Max 20MB).`);
                    continue;
                }

                try {
                    const readyFile = await compressImage(file);
                    processedFiles.push(readyFile);
                    newPreviews.push(URL.createObjectURL(readyFile));
                } catch (err) {
                    console.error("Compression failed", err);
                    // Fallback to original
                    processedFiles.push(file);
                    newPreviews.push(URL.createObjectURL(file));
                }
            }

            setFiles(prev => [...prev, ...processedFiles]);
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        // Revoke URL to avoid memory leaks
        URL.revokeObjectURL(previews[index]);
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Monitor online/offline status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        setIsOnline(navigator.onLine);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const searchParams = useSearchParams();

    // Load draft from localStorage on mount or params
    useEffect(() => {
        const issueParam = searchParams.get("issue");
        const draft = localStorage.getItem(DRAFT_STORAGE_KEY);

        if (issueParam === "missed_pickup") {
            setFormData(prev => ({
                ...prev,
                service_code: "sanitation_trash",
                issue_type: "missed_pickup",
                description: "Missed trash pickup request."
            }));
        } else if (issueParam === "street_cleanup") {
            setFormData(prev => ({
                ...prev,
                service_code: "sanitation_general", // Mapping to general sanitation
                issue_type: "street_cleanup",
                description: "Request for street cleanup / illegal dumping removal."
            }));
        } else if (issueParam === "abandoned_vehicle") {
            setFormData(prev => ({
                ...prev,
                service_code: "transportation_towing", // Mapping to towing/police
                issue_type: "abandoned_vehicle",
                description: "Report of an abandoned vehicle blocking public way."
            }));
        } else if (draft) {
            try {
                const parsed = JSON.parse(draft);
                setFormData(parsed.formData || formData);
                setLocation(parsed.location || null);
            } catch (e) {
                console.error("Failed to parse draft:", e);
            }
        }
    }, [searchParams]);

    // Auto-save draft to localStorage
    useEffect(() => {
        const draft = {
            formData,
            location,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }, [formData, location]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!isOnline) {
            setErrorMessage("You are offline. Your draft has been saved and will be available when you reconnect.");
            return;
        }

        const payload: ServiceRequestInput = {
            service_code: formData.service_code,
            communal_section_id: formData.communal_section_id,
            description: formData.description,
            email: formData.email || undefined,
            first_name: formData.first_name || undefined,
            last_name: formData.last_name || undefined,
            phone: formData.phone || undefined,
            address: formData.address || undefined,
            latitude: location?.lat,
            longitude: location?.lng,
            idempotency_key: `${Date.now()}-${Math.random()}`, // Simple idempotency key
        };

        startTransition(async () => {
            setOptimisticStatus("submitting");
            setIsSubmitting(true);

            // Optimistically show success after 500ms if still running
            const optimisticTimer = setTimeout(() => {
                setOptimisticStatus("success");
            }, 800);

            try {
                const result = await submitServiceRequest(payload);

                clearTimeout(optimisticTimer);

                if (result.success) {
                    setSuccessMessage(`Request submitted successfully! Ticket ID: ${result.requestId}`);
                    // Clear draft
                    localStorage.removeItem(DRAFT_STORAGE_KEY);
                    // Reset form
                    setFormData({
                        service_code: "",
                        communal_section_id: "",
                        description: "",
                        email: "",
                        first_name: "",
                        last_name: "",
                        phone: "",
                        address: "",
                        issue_type: "",
                    });
                    setLocation(null);
                } else {
                    setErrorMessage(result.message || "Failed to submit request");
                    setOptimisticStatus("error");
                }
            } catch (error) {
                clearTimeout(optimisticTimer);
                setErrorMessage("An unexpected error occurred. Please try again.");
                setOptimisticStatus("error");
            } finally {
                setIsSubmitting(false);
            }
        });
    };

    // Deduplicate services based on service_code
    const uniqueServices = services.reduce((acc: Service[], current) => {
        const x = acc.find(item => item.service_code === current.service_code);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Report a Service Request</CardTitle>
                        <CardDescription>
                            Describe the issue and we'll route it to the appropriate department
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        {isOnline ? (
                            <div className="flex items-center gap-1 text-sm text-emerald-600">
                                <Wifi className="h-4 w-4" />
                                <span>Online</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 text-sm text-amber-600">
                                <WifiOff className="h-4 w-4" />
                                <span>Offline (Draft saved)</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Communal Section */}
                    <div>
                        <label htmlFor="communal_section_id" className="block text-sm font-medium mb-2">
                            Neighborhood / Communal Section *
                        </label>
                        <select
                            id="communal_section_id"
                            name="communal_section_id"
                            required
                            value={formData.communal_section_id}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white shadow-sm transition-all"
                        >
                            <option value="">Select your section...</option>
                            {sections.map((section) => (
                                <option key={section.id} value={section.id}>
                                    {section.name}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1.5 text-xs text-gray-500 italic">
                            Reports are routed to the local official of your selected area.
                        </p>
                    </div>

                    {/* Service Type */}
                    <div>
                        <label htmlFor="service_code" className="block text-sm font-medium mb-2">
                            Service Type *
                        </label>
                        <select
                            id="service_code"
                            name="service_code"
                            required
                            value={formData.service_code}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white shadow-sm transition-all"
                        >
                            <option value="">Select a service...</option>
                            {uniqueServices.map((service) => (
                                <option key={service.id} value={service.service_code}>
                                    {service.service_name?.en || service.service_code}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                            Description *
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Please describe the issue in detail..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        />

                        {/* Media Upload */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Evidence (Photos/Videos)</label>

                            <div className="flex flex-wrap gap-4 mb-3">
                                {previews.map((preview, idx) => (
                                    <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeFile(idx)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-1 hover:bg-red-600 transition-colors"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <input
                                type="file"
                                id="media-upload"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => document.getElementById('media-upload')?.click()}
                                className="flex items-center gap-2 w-full sm:w-auto"
                                disabled={files.length >= 5}
                            >
                                <Camera className="h-4 w-4" />
                                <Paperclip className="h-4 w-4" />
                                Add Photo / Video
                            </Button>

                            {uploadError && (
                                <p className="text-xs text-rose-600 mt-2">{uploadError}</p>
                            )}
                            <p className="text-xs text-gray-400 mt-2">
                                Max 5 files. Images are automatically compressed to save data.
                            </p>
                        </div>
                    </div>

                    {/* Location with Geocoding */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Location (Optional)</label>
                        <div className="space-y-3">
                            {/* Address Search with Autocomplete */}
                            <div className="relative">
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={async (e) => {
                                        const value = e.target.value;
                                        setFormData({ ...formData, address: value });

                                        // Fetch geocoding suggestions
                                        if (value.length > 3) {
                                            try {
                                                const response = await fetch(
                                                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=ht&limit=5`,
                                                    {
                                                        headers: {
                                                            'User-Agent': 'Haiti City Portal'
                                                        }
                                                    }
                                                );
                                                const data = await response.json();
                                                setAddressSuggestions(data);
                                            } catch (error) {
                                                console.error("Geocoding error:", error);
                                            }
                                        } else {
                                            setAddressSuggestions([]);
                                        }
                                    }}
                                    placeholder="Search for an address in Haiti..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                />

                                {/* Autocomplete Dropdown */}
                                {addressSuggestions.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {addressSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({ ...formData, address: suggestion.display_name });
                                                    setLocation({
                                                        lat: parseFloat(suggestion.lat),
                                                        lng: parseFloat(suggestion.lon),
                                                    });
                                                    setAddressSuggestions([]);
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                                            >
                                                <div className="font-medium">{suggestion.display_name}</div>
                                                <div className="text-xs text-gray-500">
                                                    {suggestion.type}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Use My Location Button */}
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setLocationLoading(true);
                                        navigator.geolocation.getCurrentPosition(
                                            (position) => {
                                                setLocation({
                                                    lat: position.coords.latitude,
                                                    lng: position.coords.longitude,
                                                });
                                                setFormData({ ...formData, address: "Current Device Location" });
                                                setLocationLoading(false);
                                            },
                                            (error) => {
                                                console.error("Geolocation error:", error);
                                                setErrorMessage("Unable to get location. Please enable location services.");
                                                setLocationLoading(false);
                                            }
                                        );
                                    }}
                                    disabled={locationLoading}
                                    className="flex items-center gap-2"
                                >
                                    {locationLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <MapPin className="h-4 w-4" />
                                    )}
                                    Use My Location
                                </Button>

                                {/* Location Locked Badge */}
                                {location && (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-md text-sm text-emerald-700">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span>Location locked: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            />
                        </div>
                    </div>

                    {/* Success/Error Messages */}
                    {(successMessage || (optimisticStatus.status === "success" && !successMessage)) && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-700 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            <span>{successMessage || optimisticStatus.message}</span>
                        </div>
                    )}
                    {(errorMessage || optimisticStatus.status === "error") && (
                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-md text-rose-700">
                            {errorMessage || "Submission failed. Please check your connection."}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting || isPending || !isOnline}
                        className="w-full"
                    >
                        {isSubmitting || isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : !isOnline ? (
                            "Offline - Draft Saved"
                        ) : (
                            "Submit Request"
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
