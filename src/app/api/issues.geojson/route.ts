import { db } from "@/db";
import { issues } from "@/db/schema";
import { desc } from "drizzle-orm";

type IssuePoint = {
  id: string;
  title: string;
  latitude: number | null;
  longitude: number | null;
  created_at: Date | null;
};

export async function GET() {
  try {
    const data = await db
      .select({
        id: issues.id,
        title: issues.title,
        latitude: issues.latitude,
        longitude: issues.longitude,
        created_at: issues.created_at,
      })
      .from(issues)
      .orderBy(desc(issues.created_at))
      .limit(200);

    const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true";
    const points: IssuePoint[] = data;

    const features = (points.length > 0
      ? points
      : enableLocalMode
        ? [
          {
            id: "sample-point-1",
            title: "Streetlight outage",
            latitude: 18.5395,
            longitude: -72.3385,
            created_at: new Date(),
          },
          {
            id: "sample-point-2",
            title: "Trash pickup delay",
            latitude: 18.551,
            longitude: -72.335,
            created_at: new Date(),
          },
        ]
        : [])
      .filter((issue) => typeof issue.latitude === "number" && typeof issue.longitude === "number")
      .map((issue) => ({
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [issue.longitude as number, issue.latitude as number],
        },
        properties: {
          id: issue.id,
          title: issue.title,
          created_at: issue.created_at?.toISOString(),
        },
      }));

    return Response.json({ type: "FeatureCollection", features });
  } catch (error) {
    const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true";
    if (!enableLocalMode) {
      return Response.json(
        { error: "Failed to fetch issues" },
        {
          status: 500,
        }
      );
    }
    return Response.json({ type: "FeatureCollection", features: [] });
  }
}
