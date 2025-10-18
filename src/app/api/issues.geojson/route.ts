import { createServerSupabaseWithAccess } from "@/lib/supabase/server";

type IssuePoint = {
  id: string;
  title: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
};

export async function GET() {
  const supabase = await createServerSupabaseWithAccess();
  const { data, error } = await supabase
    .from("issues")
    .select("id,title,latitude,longitude,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true";
  const points: IssuePoint[] = (data as IssuePoint[] | null) ?? [];

  const features = (points.length > 0
    ? points
    : enableLocalMode
    ? [
        {
          id: "sample-point-1",
          title: "Streetlight outage",
          latitude: 18.5395,
          longitude: -72.3385,
          created_at: new Date().toISOString(),
        },
        {
          id: "sample-point-2",
          title: "Trash pickup delay",
          latitude: 18.551,
          longitude: -72.335,
          created_at: new Date().toISOString(),
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
        created_at: issue.created_at,
      },
    }));

  if (error && !enableLocalMode) {
    return Response.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }

  return Response.json({ type: "FeatureCollection", features });
}
