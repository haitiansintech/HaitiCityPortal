/**
 * GET /api/issues.geojson
 *
 * Serves the latest infrastructure issue reports as a GeoJSON FeatureCollection.
 * This endpoint is consumed by the interactive map view to render pinned
 * incident markers. Each feature represents one service request that has
 * geographic coordinates attached.
 *
 * In production the data comes from the `service_requests` table (up to 200
 * most-recent records ordered by submission time). In local development or
 * when ENABLE_LOCAL_MODE is set, the endpoint returns a small set of hardcoded
 * sample points so the map is populated without a live database connection.
 */

import { db } from "@/db";
import { service_requests } from "@/db/schema";
import { desc } from "drizzle-orm";

type IssuePoint = {
  id: string;
  title: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: Date | null;
};

/**
 * Hardcoded fallback data points used when the database is not available.
 *
 * These are realistic-looking coordinates within the Jacmel/Port-au-Prince
 * area so that the map renders sensibly during local development and in
 * demos. They are never written to the database and are never returned in
 * production when actual service request rows exist.
 */
const SAMPLE_POINTS: IssuePoint[] = [
  { id: "sample-point-1", title: "Streetlight outage", latitude: 18.5395, longitude: -72.3385, created_at: new Date() },
  { id: "sample-point-2", title: "Trash pickup delay", latitude: 18.551, longitude: -72.335, created_at: new Date() },
];

/**
 * Converts an array of IssuePoint objects into a GeoJSON FeatureCollection.
 *
 * GeoJSON FeatureCollection format (RFC 7946):
 * ```json
 * {
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "geometry": { "type": "Point", "coordinates": [longitude, latitude] },
 *       "properties": { "id": "...", "title": "...", "created_at": "..." }
 *     }
 *   ]
 * }
 * ```
 * Note: GeoJSON coordinates are [longitude, latitude] (x, y order), NOT the
 * more intuitive [latitude, longitude] used elsewhere in the codebase.
 * Points without valid numeric coordinates are silently filtered out.
 *
 * @param points - Array of issue points to convert.
 * @returns A GeoJSON FeatureCollection object ready to be serialised as JSON.
 */
function toFeatureCollection(points: IssuePoint[]) {
  return {
    type: "FeatureCollection",
    features: points
      .filter((p) => typeof p.latitude === "number" && typeof p.longitude === "number")
      .map((p) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [p.longitude as number, p.latitude as number] },
        properties: { id: p.id, title: p.title, created_at: p.created_at?.toISOString() },
      })),
  };
}

export async function GET() {
  // ENABLE_LOCAL_MODE bypasses the database entirely and returns sample data.
  // Set ENABLE_LOCAL_MODE=true in .env.local to use this during development
  // when no Neon database URL is configured. In non-production environments
  // it defaults to true so the map always works out of the box.
  const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true" || process.env.NODE_ENV !== "production";

  if (enableLocalMode) {
    return Response.json(toFeatureCollection(SAMPLE_POINTS));
  }

  try {
    const data = await db
      .select({
        id: service_requests.id,
        title: service_requests.service_name,
        latitude: service_requests.latitude,
        longitude: service_requests.longitude,
        created_at: service_requests.requested_datetime,
      })
      .from(service_requests)
      .orderBy(desc(service_requests.requested_datetime))
      .limit(200);

    const points: IssuePoint[] = data;
    // Fall back to SAMPLE_POINTS if the table exists but has no rows yet,
    // so the map is never empty during early deployment.
    return Response.json(toFeatureCollection(points.length > 0 ? points : SAMPLE_POINTS));
  } catch {
    return Response.json({ error: "Failed to fetch issues" }, { status: 500 });
  }
}
