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
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-cyan-400/30 bg-white/5 p-8 shadow-xl shadow-cyan-400/20 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-white">Open data catalog</h1>
          <p className="text-sm text-slate-300">
            Download civic datasets curated by the municipality. Use them for research, accountability, and community planning.
          </p>
          <div className="flex flex-wrap gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-1 font-semibold uppercase tracking-wide text-cyan-100">
              <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
              </svg>
              Weekly refresh
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 font-semibold uppercase tracking-wide text-orange-200">
              <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              QA certified
            </span>
          </div>
        </div>
        <a
          href="mailto:data@haiticity.org"
          className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          Request a dataset
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 21 10.5l-3.75 3.75M21 10.5H3" />
          </svg>
        </a>
      </div>
      {items.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300 shadow-xl shadow-black/20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-500/15 text-sky-300">
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15m-12 3h12m-9 3h9m-6 3h6M8.25 6.75V4.5m7.5 2.25V4.5M8.25 21v-2.25m7.5 2.25V18.75M3 9.75v9A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75v-9A2.25 2.25 0 0 0 18.75 7.5H5.25A2.25 2.25 0 0 0 3 9.75Z" />
            </svg>
          </div>
          <p className="mt-4 font-semibold text-white">No datasets published yet.</p>
          <p className="mt-2 text-slate-300">Check back soon or request access via <span className="font-semibold text-cyan-200">data@haiticity.org</span>.</p>
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
