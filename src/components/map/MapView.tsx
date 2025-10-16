"use client";

import { useEffect, useRef, useState } from "react";

type GeoJsonFeatureCollection = {
  type: "FeatureCollection";
  features: Array<Record<string, unknown>>;
};

interface MapClickEvent {
  features?: Array<{
    geometry?: { coordinates: [number, number] };
    properties?: Record<string, unknown>;
  }>;
}

interface MapInstance {
  addControl(control: unknown, position?: string): void;
  addSource(id: string, source: { type: "geojson"; data: GeoJsonFeatureCollection }): void;
  addLayer(layer: Record<string, unknown>): void;
  on(event: "load", handler: () => void): void;
  on(event: "click", layerId: string, handler: (event: MapClickEvent) => void): void;
  remove(): void;
}

interface PopupInstance {
  setLngLat(coordinates: [number, number]): PopupInstance;
  setHTML(html: string): PopupInstance;
  addTo(map: MapInstance): PopupInstance;
}

type MapLibreType = {
  Map: new (options: {
    container: HTMLElement;
    style: string;
    center: [number, number];
    zoom: number;
    attributionControl?: boolean;
  }) => MapInstance;
  NavigationControl: new () => unknown;
  ScaleControl: new (options?: { maxWidth?: number; unit?: string }) => unknown;
  Popup: new (options?: { closeOnClick?: boolean }) => PopupInstance;
};

const MAP_STYLE_URL = "https://demotiles.maplibre.org/style.json";
const MAPLIBRE_SCRIPT = "https://unpkg.com/maplibre-gl@3.5.1/dist/maplibre-gl.js";
const MAPLIBRE_STYLES = "https://unpkg.com/maplibre-gl@3.5.1/dist/maplibre-gl.css";

let maplibrePromise: Promise<MapLibreType> | null = null;

declare global {
  interface Window {
    maplibregl?: MapLibreType;
  }
}

function loadMapLibre(): Promise<MapLibreType> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("MapLibre can only be loaded in the browser"));
  }

  if (maplibrePromise) {
    return maplibrePromise;
  }

  maplibrePromise = new Promise((resolve, reject) => {
    if (window.maplibregl) {
      resolve(window.maplibregl);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${MAPLIBRE_SCRIPT}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.maplibregl) {
          resolve(window.maplibregl);
        } else {
          reject(new Error("Failed to load MapLibre"));
        }
      });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load MapLibre")));
    } else {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = MAPLIBRE_STYLES;
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = MAPLIBRE_SCRIPT;
      script.async = true;
        script.onload = () => {
          if (window.maplibregl) {
            resolve(window.maplibregl);
          } else {
            reject(new Error("Failed to load MapLibre"));
          }
        };
        script.onerror = () => reject(new Error("Failed to load MapLibre"));
      document.head.appendChild(script);
    }
  });

  return maplibrePromise;
}

export default function MapView() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let map: MapInstance | null = null;

    async function init() {
      try {
        const maplibre = await loadMapLibre();
        if (!containerRef.current) return;

        map = new maplibre.Map({
          container: containerRef.current,
          style: MAP_STYLE_URL,
          center: [-72.338, 18.539],
          zoom: 12,
          attributionControl: true,
        });

        map.addControl(new maplibre.NavigationControl(), "top-right");
        map.addControl(new maplibre.ScaleControl({ maxWidth: 120, unit: "metric" }), "bottom-left");

        map.on("load", async () => {
          try {
            const response = await fetch("/api/issues.geojson");
            if (!response.ok) {
              throw new Error("Unable to load issue points");
            }
            const geojson = await response.json();
            map.addSource("issues", {
              type: "geojson",
              data: geojson,
            });

            map.addLayer({
              id: "issues-points",
              type: "circle",
              source: "issues",
              paint: {
                "circle-radius": 6,
                "circle-color": "#34d399",
                "circle-stroke-width": 2,
                "circle-stroke-color": "#0f172a",
              },
            });

            map.addLayer({
              id: "issues-labels",
              type: "symbol",
              source: "issues",
              layout: {
                "text-field": ["get", "title"],
                "text-offset": [0, 1.2],
                "text-size": 12,
                "text-anchor": "top",
                "text-allow-overlap": false,
              },
              paint: {
                "text-color": "#f8fafc",
                "text-halo-color": "#0f172a",
                "text-halo-width": 1.5,
              },
            });

            map.on("click", "issues-points", (event) => {
              const coordinates = event.features?.[0]?.geometry?.coordinates?.slice() as [number, number] | undefined;
              const title = (event.features?.[0]?.properties?.title as string | undefined) ?? "Issue";
              if (!coordinates) return;
              new maplibre.Popup({ closeOnClick: true })
                .setLngLat(coordinates)
                .setHTML(`<strong>${title}</strong>`)
                .addTo(map);
            });
          } catch (issueError) {
            setError(issueError instanceof Error ? issueError.message : "Failed to load issues");
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to initialize map");
      }
    }

    init();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        aria-label="Interactive map of reported issues in Haiti"
        role="region"
        className="h-[32rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80"
      />
      {error && (
        <p className="text-sm text-rose-200">We could not load the map data: {error}</p>
      )}
    </div>
  );
}
