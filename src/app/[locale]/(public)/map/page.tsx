"use client";

import dynamic from "next/dynamic";
import { Link } from "@/i18n/navigation";

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr: false });

export default function MapPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold text-white">City issues map</h1>
        <p className="text-sm text-slate-300">
          Explore reported issues across Port-au-Prince. Click a point to see details, then follow up in the issues list.
        </p>
        <Link
          href="/issues"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          View recent issues
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 21 10.5l-3.75 3.75M21 10.5H3" />
          </svg>
        </Link>
      </div>
      <MapView />
    </div>
  );
}
