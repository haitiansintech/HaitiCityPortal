"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Facility {
    id: string;
    name: string;
    latitude: number | null;
    longitude: number | null;
    category: string;
    status: string;
    contact_phone: string | null;
    section?: { name: string } | null;
}

interface DirectoryMapProps {
    facilities: Facility[];
}

export default function DirectoryMap({ facilities }: DirectoryMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<L.Map | null>(null);
    const markersLayer = useRef<L.LayerGroup | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return;

        // Default center (Jacmel)
        const center: [number, number] = [18.2346, -72.5350];

        mapInstance.current = L.map(mapRef.current).setView(center, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance.current);

        markersLayer.current = L.layerGroup().addTo(mapInstance.current);

        // Fix Leaflet marker icons icon path issue in Next.js
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!mapInstance.current || !markersLayer.current) return;

        markersLayer.current.clearLayers();

        const bounds = L.latLngBounds([]);
        let hasValidPoints = false;

        facilities.forEach((f) => {
            if (f.latitude && f.longitude) {
                const marker = L.marker([f.latitude, f.longitude])
                    .bindPopup(`
                        <div class="p-3 font-sans min-w-[200px]">
                            <div class="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1">${f.category}</div>
                            <h3 class="text-base font-bold text-slate-900 mb-1 leading-tight">${f.name}</h3>
                            <div class="flex items-center gap-1.5 text-xs text-slate-500 mb-2 italic">
                                📍 ${f.section?.name || 'Local District'}
                            </div>
                            <div class="flex items-center gap-2 mb-3">
                                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${f.status === 'operational' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }">
                                    ${f.status.replace('_', ' ')}
                                </span>
                            </div>
                            ${f.contact_phone ? `
                                <a href="tel:${f.contact_phone}" 
                                   class="block w-full text-center py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-black transition-colors">
                                   📞 CALL: ${f.contact_phone}
                                </a>
                            ` : ''}
                        </div>
                    `);

                markersLayer.current?.addLayer(marker);
                bounds.extend([f.latitude, f.longitude]);
                hasValidPoints = true;
            }
        });

        if (hasValidPoints) {
            mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [facilities]);

    return (
        <div
            ref={mapRef}
            className="h-[500px] w-full z-0"
            style={{ borderRadius: '0 0 3rem 3rem' }}
        />
    );
}
