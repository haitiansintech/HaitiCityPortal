import Link from "next/link";
import { headers } from "next/headers";
import { db } from "@/db";
import { service_requests, tenants } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";

interface ServiceRequestRecord {
  id: string;
  service_name: string | null;
  description: string | null;
  status: string | null;
  requested_datetime: Date | null;
}

function formatStatus(status: string | null) {
  if (!status) return "Open";
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const statusTone: Record<string, string> = {
  Closed: "bg-emerald-500/10 text-emerald-200 border-emerald-400/30",
  Acknowledged: "bg-cyan-500/10 text-cyan-200 border-cyan-400/30",
  Open: "bg-sky-500/10 text-sky-200 border-sky-400/30",
};

export default async function IssuesListPage() {
  const headersList = await headers();
  const subdomainHeader = headersList.get("x-tenant-subdomain") || "demo";

  let data: ServiceRequestRecord[] = [];
  let error: { message: string } | null = null;

  try {
    // SECURITY: First, resolve tenant by subdomain, then filter requests
    const tenant = await db
      .select()
      .from(tenants)
      .where(eq(tenants.subdomain, subdomainHeader))
      .limit(1);

    if (tenant.length > 0) {
      const result = await db
        .select({
          id: service_requests.id,
          service_name: service_requests.service_name,
          description: service_requests.description,
          status: service_requests.status,
          requested_datetime: service_requests.requested_datetime,
        })
        .from(service_requests)
        .where(eq(service_requests.tenant_id, tenant[0].id))
        .orderBy(desc(service_requests.requested_datetime))
        .limit(20);
      data = result;
    }
  } catch (e: any) {
    error = { message: e.message };
  }

  const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true";
  const fallbackIssues: ServiceRequestRecord[] = enableLocalMode
    ? [
      {
        id: "sample-1",
        service_name: "Pothole Repair",
        description: "Large pothole near the market entrance causing vehicle damage.",
        status: "open",
        requested_datetime: new Date(),
      },
      {
        id: "sample-2",
        service_name: "Streetlight Outage",
        description: "Streetlight has been out for over a week on Rue Capois.",
        status: "acknowledged",
        requested_datetime: new Date(Date.now() - 86400000),
      },
    ]
    : [];

  const issuesList = (data && data.length > 0 ? data : fallbackIssues) ?? [];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-6xl lg:px-8">
      <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-white">Service Requests</h1>
          <p className="text-sm text-slate-300">
            Track recent reports from residents across the municipality. Status updates are refreshed in real time.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400" aria-hidden />
            Updated hourly from the civic response queue
          </div>
        </div>
        <Link
          href="/issues/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
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
            <p className="font-semibold">Unable to load requests right now.</p>
            <p className="mt-1 text-rose-100/80">{error.message}</p>
          </div>
        </div>
      )}
      {issuesList.length === 0 && !error ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300 shadow-xl shadow-black/20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-500/15 text-sky-300">
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18m-16.5 3H21m-16.5 3H21M7.5 3v2.25m9-2.25V5.25M5.625 21h12.75A2.625 2.625 0 0 0 21 18.375V5.625A2.625 2.625 0 0 0 18.375 3H5.625A2.625 2.625 0 0 0 3 5.625v12.75A2.625 2.625 0 0 0 5.625 21Z" />
            </svg>
          </div>
          <p className="mt-4 font-semibold text-white">All quiet for now.</p>
          <p className="mt-2 text-slate-300">No requests reported yet. Be the first to submit one and help guide the response team.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400/60 via-white/20 to-transparent sm:block" aria-hidden />
          <ul className="space-y-6 pl-0 sm:pl-6">
            {issuesList.map((request) => {
              const statusLabel = formatStatus(request.status);
              const tone = statusTone[statusLabel as keyof typeof statusTone] ?? statusTone.Open;
              return (
                <li
                  key={request.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-400/20"
                >
                  <span className="absolute -left-[22px] top-6 hidden h-5 w-5 rounded-full border-4 border-slate-950 bg-cyan-300 shadow-md sm:block" aria-hidden />
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{request.service_name || "Service Request"}</h2>
                      {request.description ? (
                        <p className="mt-2 text-sm text-slate-300">{request.description}</p>
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
                      Reported on {request.requested_datetime ? new Date(request.requested_datetime).toLocaleString() : "Unknown"}
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

