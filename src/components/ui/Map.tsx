"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export interface MapMarker {
    lat: number;
    lng: number;
    title?: string;
    description?: string;
    status?: string;
    id?: string;
}

interface MapProps {
    markers: MapMarker[];
    height?: string;
    zoom?: number;
    centerLat?: number;
    centerLng?: number;
}

// Custom marker icons for different statuses
const getMarkerIcon = (status?: string) => {
    const iconUrl = status === "closed"
        ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
        : status === "acknowledged"
            ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
            : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";

    return new L.Icon({
        iconUrl,
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });
};

export default function Map({
    markers,
    height = "400px",
    zoom = 13,
    centerLat,
    centerLng,
}: MapProps) {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Determine map center
        const center: [number, number] = centerLat && centerLng
            ? [centerLat, centerLng]
            : markers.length > 0
                ? [markers[0].lat, markers[0].lng]
                : [18.5944, -72.3074]; // Default: Port-au-Prince

        // Initialize map
        const map = L.map(containerRef.current).setView(center, zoom);

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(map);

        // Add markers
        markers.forEach((marker) => {
            const leafletMarker = L.marker([marker.lat, marker.lng], {
                icon: getMarkerIcon(marker.status),
            }).addTo(map);

            // Create popup content
            const popupContent = `
        <div class="p-2">
          <h3 class="font-semibold text-sm mb-1">${marker.title || "Service Request"}</h3>
          ${marker.description ? `<p class="text-xs text-gray-600 mb-2">${marker.description.substring(0, 100)}${marker.description.length > 100 ? "..." : ""}</p>` : ""}
          ${marker.status ? `<span class="inline-block px-2 py-1 text-xs rounded-full ${marker.status === "open"
                    ? "bg-amber-100 text-amber-700"
                    : marker.status === "acknowledged"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    }">${marker.status}</span>` : ""}
          ${marker.id ? `<br/><a href="/admin/requests/${marker.id}" class="text-xs text-brand-blue hover:underline mt-2 inline-block">View Details →</a>` : ""}
        </div>
      `;

            leafletMarker.bindPopup(popupContent);
        });

        // Fit bounds if multiple markers
        if (markers.length > 1) {
            const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }

        mapRef.current = map;

        // Cleanup
        return () => {
            map.remove();
        };
    }, [markers, zoom, centerLat, centerLng]);

    return <div ref={containerRef} style={{ height, width: "100%", zIndex: 0 }} />;
}
