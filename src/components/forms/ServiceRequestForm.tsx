"use client";

import { useState, useEffect } from "react";
import { submitServiceRequest, type ServiceRequestInput } from "@/app/actions/submit-request";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Wifi, WifiOff, CheckCircle2, Loader2 } from "lucide-react";

interface Service {
    id: string;
    service_code: string;
    service_name: any; // JSONB field
}

interface ServiceRequestFormProps {
    services: Service[];
}

const DRAFT_STORAGE_KEY = "service_request_draft";

export default function ServiceRequestForm({ services }: ServiceRequestFormProps) {
    const [isOnline, setIsOnline] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);

    // Form state
    const [formData, setFormData] = useState({
        service_code: "",
        description: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
    });

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

    // Load draft from localStorage on mount
    useEffect(() => {
        const draft = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (draft) {
            try {
                const parsed = JSON.parse(draft);
                setFormData(parsed.formData || formData);
                setLocation(parsed.location || null);
            } catch (e) {
                console.error("Failed to parse draft:", e);
            }
        }
    }, []);

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

        setIsSubmitting(true);

        const payload: ServiceRequestInput = {
            service_code: formData.service_code,
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

        try {
            const result = await submitServiceRequest(payload);

            if (result.success) {
                setSuccessMessage(`Request submitted successfully! Ticket ID: ${result.requestId}`);
                // Clear draft
                localStorage.removeItem(DRAFT_STORAGE_KEY);
                // Reset form
                setFormData({
                    service_code: "",
                    description: "",
                    email: "",
                    first_name: "",
                    last_name: "",
                    phone: "",
                    address: "",
                });
                setLocation(null);
            } else {
                setErrorMessage(result.message || "Failed to submit request");
            }
        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        >
                            <option value="">Select a service...</option>
                            {services.map((service) => (
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
                    {successMessage && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-700">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="p-4 bg-rose-50 border border-rose-200 rounded-md text-rose-700">
                            {errorMessage}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isSubmitting || !isOnline}
                        className="w-full"
                    >
                        {isSubmitting ? (
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
