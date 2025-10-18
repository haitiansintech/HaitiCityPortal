import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";

interface IssueRecord {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  created_at: string;
}

function formatStatus(status: string | null) {
  if (!status) return "Pending";
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const statusTone: Record<string, string> = {
  Resolved: "bg-emerald-500/10 text-emerald-200 border-emerald-400/30",
  "In Progress": "bg-cyan-500/10 text-cyan-200 border-cyan-400/30",
  Submitted: "bg-sky-500/10 text-sky-200 border-sky-400/30",
  Pending: "bg-slate-500/10 text-slate-200 border-slate-400/30",
};

export default async function IssuesListPage() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("issues")
    .select("id,title,description,status,created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true";
  const fallbackIssues: IssueRecord[] = enableLocalMode
    ? [
        {
          id: "sample-1",
          title: "Streetlight outage on Rue Capois",
          description: "Streetlight in front of the market has been out for two weeks.",
          status: "in_progress",
          created_at: new Date().toISOString(),
        },
        {
          id: "sample-2",
          title: "Blocked drainage near Avenue Christophe",
          description: "Debris blocking the drainage channel after recent storms.",
          status: "submitted",
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]
    : [];

  const issues = (data && data.length > 0 ? data : fallbackIssues) ?? [];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Issues</h1>
          <p className="mt-2 text-sm text-slate-300">
            Recent reports from residents across the municipality. Public read access is enabled.
          </p>
        </div>
        <Link
          href="/issues/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          Report an issue
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </Link>
      </div>
      {error && (
        <div className="mb-8 flex items-start gap-4 rounded-3xl border border-rose-400/40 bg-rose-500/10 p-5 text-sm text-rose-100 shadow-lg shadow-rose-500/10">
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mt-0.5 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3h.008v.008H12V15.75Zm9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <div>
            <p className="font-semibold">Unable to load issues right now.</p>
            <p className="mt-1 text-rose-100/80">{error.message}</p>
          </div>
        </div>
      )}
      {issues.length === 0 && !error ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300 shadow-xl shadow-black/20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-500/15 text-sky-300">
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18m-16.5 3H21m-16.5 3H21M7.5 3v2.25m9-2.25V5.25M5.625 21h12.75A2.625 2.625 0 0 0 21 18.375V5.625A2.625 2.625 0 0 0 18.375 3H5.625A2.625 2.625 0 0 0 3 5.625v12.75A2.625 2.625 0 0 0 5.625 21Z" />
            </svg>
          </div>
          <p className="mt-4 font-semibold text-white">All quiet for now.</p>
          <p className="mt-2 text-slate-300">No issues reported yet. Be the first to submit one and help guide the response team.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400/60 via-white/20 to-transparent sm:block" aria-hidden />
          <ul className="space-y-6">
            {issues.map((issue) => {
              const statusLabel = formatStatus(issue.status);
              const tone = statusTone[statusLabel as keyof typeof statusTone] ?? statusTone.Pending;
              return (
                <li
                  key={issue.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-400/20"
                >
                  <span className="absolute -left-1 top-6 hidden h-5 w-5 rounded-full border-4 border-slate-950 bg-cyan-300 shadow-md sm:block" aria-hidden />
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{issue.title}</h2>
                      {issue.description ? (
                        <p className="mt-2 text-sm text-slate-300">{issue.description}</p>
                      ) : (
                        <p className="mt-2 text-sm italic text-slate-400">No description provided.</p>
                      )}
                    </div>
                    <span className={`inline-flex items-center self-start rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${tone}`}>
                      {statusLabel}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l2.5 2.5" />
                      </svg>
                      Reported on {new Date(issue.created_at).toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-300/80">
                      <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Transparent routing with SMS updates
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
