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
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Issues</h1>
          <p className="mt-2 text-sm text-slate-300">
            Recent reports from residents across the municipality. Public read access is enabled.
          </p>
        </div>
        <Link
          href="/issues/new"
          className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Report an issue
        </Link>
      </div>
      {error && (
        <div className="mb-6 rounded-lg border border-rose-400/60 bg-rose-500/10 p-4 text-sm text-rose-200">
          Unable to load issues right now. {error.message}
        </div>
      )}
      <ul className="space-y-4">
        {issues.map((issue) => (
          <li key={issue.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">{issue.title}</h2>
                {issue.description ? (
                  <p className="mt-2 text-sm text-slate-300">{issue.description}</p>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">No description provided.</p>
                )}
              </div>
              <span className="inline-flex items-center self-start rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                {formatStatus(issue.status)}
              </span>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Reported on {new Date(issue.created_at).toLocaleString()}
            </p>
          </li>
        ))}
        {issues.length === 0 && !error && (
          <li className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-300">
            No issues reported yet. Be the first to submit one!
          </li>
        )}
      </ul>
    </div>
  );
}
