import { DatasetCard } from "@/components/data/DatasetCard";
import { createServerSupabase } from "@/lib/supabase/server";

type DatasetRecord = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  download_url: string | null;
};

async function fetchDatasets() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("datasets")
    .select("id,title,description,category,download_url")
    .order("title", { ascending: true })
    .limit(24);

  if (error) {
    console.error("Failed to load datasets", error.message);
    return [] as DatasetRecord[];
  }

  return (data as DatasetRecord[] | null) ?? [];
}

const localFallback: DatasetRecord[] = [
  {
    id: "sample-dataset-1",
    title: "Road repair schedule",
    description: "Weekly updates on roadway maintenance and resurfacing projects.",
    category: "Infrastructure",
    download_url: "https://example.com/datasets/road-repairs.csv",
  },
  {
    id: "sample-dataset-2",
    title: "Water quality readings",
    description: "Public water testing results across Port-au-Prince neighborhoods.",
    category: "Environment",
    download_url: "https://example.com/datasets/water-quality.csv",
  },
  {
    id: "sample-dataset-3",
    title: "Service request backlog",
    description: "Aggregated counts of open service requests by department.",
    category: "Operations",
    download_url: "https://example.com/datasets/service-requests.csv",
  },
  {
    id: "sample-dataset-4",
    title: "Disaster relief grants",
    description: "Grant awards, timelines, and beneficiaries by commune.",
    category: "Finance",
    download_url: "https://example.com/datasets/disaster-grants.csv",
  },
  {
    id: "sample-dataset-5",
    title: "Emergency shelter capacity",
    description: "Real-time capacity updates for emergency shelters.",
    category: "Emergency",
    download_url: "https://example.com/datasets/shelters.csv",
  },
  {
    id: "sample-dataset-6",
    title: "Public Wi-Fi access points",
    description: "Locations, uptime, and usage statistics for public Wi-Fi.",
    category: "Digital",
    download_url: "https://example.com/datasets/public-wifi.csv",
  },
];

export default async function DataGalleryPage() {
  const datasets = await fetchDatasets();
  const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true";
  const items = datasets.length > 0 ? datasets : enableLocalMode ? localFallback : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold text-white">Open data catalog</h1>
        <p className="text-sm text-slate-300">
          Download civic datasets curated by the municipality. Use them for research, accountability, and community planning.
        </p>
      </div>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-300">
          No datasets published yet. Check back soon or request access via <a href="mailto:data@haiticity.org" className="font-semibold text-emerald-300">data@haiticity.org</a>.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              title={dataset.title}
              category={dataset.category ?? "General"}
              description={dataset.description ?? undefined}
              downloadUrl={dataset.download_url ?? undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
