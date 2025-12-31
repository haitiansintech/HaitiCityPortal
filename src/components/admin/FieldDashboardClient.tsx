"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, CheckCircle2, AlertTriangle, XCircle, RefreshCw, AlertCircle } from "lucide-react";
import { verifyFacility } from "@/app/actions/verify-facility";
import { useToast } from "@/hooks/use-toast";

interface Facility {
    id: string;
    name: string;
    latitude: number | null;
    longitude: number | null;
    status: string;
    last_verified_at: Date | string | null;
}

interface FieldDashboardClientProps {
    facilities: Facility[];
}

import { getActiveAlert } from "@/app/actions/emergency-alerts";

// ... existing imports

export default function FieldDashboardClient({ facilities }: FieldDashboardClientProps) {
    const [sortedFacilities, setSortedFacilities] = useState<Facility[]>(facilities);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeAlert, setActiveAlert] = useState<any>(null);
    const { toast } = useToast();

    // Poll for alerts every 60s
    useEffect(() => {
        const fetchAlert = async () => {
            const alert = await getActiveAlert();
            setActiveAlert(alert);
        };
        fetchAlert(); // Initial fetch
        const interval = setInterval(fetchAlert, 60000); // 60s
        return () => clearInterval(interval);
    }, []);

    // Haversine formula to calculate distance
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };

    const handleLocateMe = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });

                    // Sort facilities by distance
                    const sorted = [...facilities].sort((a, b) => {
                        if (!a.latitude || !a.longitude) return 1;
                        if (!b.latitude || !b.longitude) return -1;

                        const distA = getDistance(latitude, longitude, a.latitude, a.longitude);
                        const distB = getDistance(latitude, longitude, b.latitude, b.longitude);
                        return distA - distB;
                    });

                    setSortedFacilities(sorted);
                    setLoading(false);
                    toast({ title: "Pozisyon ou jwenn!", description: "Lis la òdone pa distans ki pi pre a." });
                },
                (error) => {
                    console.error(error);
                    setLoading(false);
                    toast({ title: "Erè", description: "Nou pa ka jwenn pozisyon ou.", variant: "destructive" });
                }
            );
        } else {
            setLoading(false);
            toast({ title: "Erè", description: "Navigatè sa a pa sipòte jewolokalizasyon.", variant: "destructive" });
        }
    };

    const handleVerify = async (id: string, status: string) => {
        try {
            await verifyFacility(id, status);
            toast({ title: "Siksè", description: "Estati a mete ajou!" });

            // Optimistic update
            setSortedFacilities(prev => prev.map(f => f.id === id ? { ...f, status, last_verified_at: new Date() } : f));
        } catch (e) {
            toast({ title: "Erè", description: "Echèk pou mete ajou.", variant: "destructive" });
        }
    };

    return (
        <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <div className="bg-blue-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-brand-blue" />
                </div>
                <div>
                    <h4 className="text-sm font-black text-brand-blue uppercase tracking-wide">Mizajou Pwotokòl</h4>
                    <p className="text-xs text-blue-800 font-medium leading-tight mt-1">
                        Gen nouvo gid nan Handbook la. Tanpri li yo avan w ale sou teren.
                    </p>
                </div>
            </div>

            {/* Emergency Alert Banner */}
            {activeAlert && (
                <div className="bg-red-600 text-white p-4 rounded-2xl shadow-xl border-4 border-red-500 animate-pulse flex items-start gap-3">
                    <AlertCircle className="h-8 w-8 shrink-0 animate-bounce" />
                    <div>
                        <h3 className="font-black text-lg uppercase tracking-widest underline decoration-wavy decoration-white/50 mb-1">
                            {activeAlert.severity === 'critical' ? 'IJANS KRITIK' : 'ALÈT ENPÒTAN'}
                        </h3>
                        <p className="font-bold text-lg leading-snug">{activeAlert.message_kr}</p>
                        <p className="text-sm opacity-80 mt-1 italic">{activeAlert.message_fr}</p>
                    </div>
                </div>
            )}

            <Button
                onClick={handleLocateMe}
                disabled={loading}
                className="w-full h-16 text-lg font-black uppercase tracking-widest rounded-2xl bg-brand-blue shadow-xl active:scale-95 transition-all"
            >
                {loading ? <RefreshCw className="h-6 w-6 animate-spin mr-2" /> : <Navigation className="h-6 w-6 mr-2" />}
                {loading ? "Chache..." : "Kote m ye? (Near Me)"}
            </Button>

            {userLocation && (
                <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-center font-bold text-sm border border-emerald-100">
                    📍 Pozisyon w: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </div>
            )}

            <div className="grid gap-6">
                {sortedFacilities.map((facility) => (
                    <Card key={facility.id} className="rounded-[2rem] overflow-hidden shadow-md border-2 border-weak">
                        <CardHeader className="bg-slate-50 border-b border-weak pb-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-black text-ink-primary leading-tight">
                                    {facility.name}
                                </CardTitle>
                                {facility.last_verified_at && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                        Verifye
                                    </span>
                                )}
                            </div>
                            {userLocation && facility.latitude && facility.longitude && (
                                <div className="flex items-center gap-1 text-sm font-bold text-brand-blue">
                                    <MapPin className="h-4 w-4" />
                                    {getDistance(userLocation.lat, userLocation.lng, facility.latitude, facility.longitude).toFixed(1)} km lwen
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="p-4 pt-6">
                            <p className="text-center text-sm font-bold text-ink-secondary mb-4 uppercase tracking-widest">
                                Ki jan etablisman sa ye kounye a?
                            </p>
                            <div className="grid grid-cols-3 gap-3">
                                <VerificationButton
                                    label="An Sèvis"
                                    icon={CheckCircle2}
                                    color="bg-emerald-500 hover:bg-emerald-600 border-emerald-700"
                                    isActive={facility.status === 'operational'}
                                    onClick={() => handleVerify(facility.id, 'operational')}
                                />
                                <VerificationButton
                                    label="Sèvis Limite"
                                    icon={AlertTriangle}
                                    color="bg-amber-500 hover:bg-amber-600 border-amber-700"
                                    isActive={facility.status === 'limited_services'}
                                    onClick={() => handleVerify(facility.id, 'limited_services')}
                                />
                                <VerificationButton
                                    label="Fèmen"
                                    icon={XCircle}
                                    color="bg-rose-500 hover:bg-rose-600 border-rose-700"
                                    isActive={facility.status === 'closed'}
                                    onClick={() => handleVerify(facility.id, 'closed')}
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function VerificationButton({ label, icon: Icon, color, isActive, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all active:scale-95 border-b-4 ${isActive ? 'ring-4 ring-offset-2 ring-brand-blue' : ''} ${color} text-white shadow-lg`}
        >
            <Icon className="h-8 w-8" />
            <span className="text-[10px] font-black uppercase leading-tight text-center">{label}</span>
        </button>
    )
}
