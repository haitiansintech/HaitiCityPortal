"use client";

import dynamic from "next/dynamic";

export interface MapMarker {
    lat: number;
    lng: number;
    title?: string;
    description?: string;
    status?: string;
    id?: string;
}

interface DashboardMapProps {
    markers: MapMarker[];
    height?: string;
    zoom?: number;
    centerLat?: number;
    centerLng?: number;
}

// Dynamically import Map with no SSR (allowed in Client Components)
const Map = dynamic(() => import("@/components/ui/Map"), {
    ssr: false,
    loading: () => (
        <div
            className="flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200"
            style={{ height: "400px" }}
        >
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-blue border-r-transparent"></div>
                <p className="mt-2 text-sm text-gray-600">Loading Map...</p>
            </div>
        </div>
    ),
});

export default function DashboardMap({
    markers,
    height = "400px",
    zoom,
    centerLat,
    centerLng,
}: DashboardMapProps) {
    return (
        <Map
            markers={markers}
            height={height}
            zoom={zoom}
            centerLat={centerLat}
            centerLng={centerLng}
        />
    );
}
