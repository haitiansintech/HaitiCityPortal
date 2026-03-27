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

const SAMPLE_POINTS: IssuePoint[] = [
  { id: "sample-point-1", title: "Streetlight outage", latitude: 18.5395, longitude: -72.3385, created_at: new Date() },
  { id: "sample-point-2", title: "Trash pickup delay", latitude: 18.551, longitude: -72.335, created_at: new Date() },
];

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
    return Response.json(toFeatureCollection(points.length > 0 ? points : SAMPLE_POINTS));
  } catch {
    return Response.json({ error: "Failed to fetch issues" }, { status: 500 });
  }
}
