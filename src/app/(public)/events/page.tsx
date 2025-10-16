import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";

type EventRecord = {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string | null;
  location: string | null;
};

function formatRange(start: string, end: string | null) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  if (!endDate) return formatter.format(startDate);
  return `${formatter.format(startDate)} → ${formatter.format(endDate)}`;
}

function groupByMonth(events: EventRecord[]) {
  return events.reduce<Record<string, EventRecord[]>>((acc, event) => {
    const key = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(new Date(event.start_time));
    acc[key] = acc[key] ? [...acc[key], event] : [event];
    return acc;
  }, {});
}

async function fetchEvents() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("events")
    .select("id,title,description,start_time,end_time,location")
    .order("start_time", { ascending: true })
    .gte("start_time", new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString())
    .limit(50);

  const enableLocalMode = process.env.ENABLE_LOCAL_MODE === "true";
  if (error && !enableLocalMode) {
    console.error("Failed to load events", error.message);
  }

  if (!data || data.length === 0 || error) {
    if (!enableLocalMode) {
      return [] as EventRecord[];
    }
    const now = new Date();
    return [
      {
        id: "sample-event-1",
        title: "Town Hall: Port-au-Prince Waterfront Plan",
        description: "Join the planning team to review proposed waterfront improvements and share feedback.",
        start_time: new Date(now.getTime() + 5 * 24 * 3600 * 1000).toISOString(),
        end_time: new Date(now.getTime() + 5 * 24 * 3600 * 1000 + 90 * 60000).toISOString(),
        location: "City Hall Auditorium",
      },
      {
        id: "sample-event-2",
        title: "Mobile civil registry clinic",
        description: "Get assistance with birth certificates and national ID updates in Carrefour-Feuilles.",
        start_time: new Date(now.getTime() + 12 * 24 * 3600 * 1000).toISOString(),
        end_time: null,
        location: "Ecole Nationale Carrefour-Feuilles",
      },
      {
        id: "sample-event-3",
        title: "Community clean-up and data dive",
        description: "Data team shares neighborhood dashboard insights after morning clean-up.",
        start_time: new Date(now.getTime() + 20 * 24 * 3600 * 1000).toISOString(),
        end_time: new Date(now.getTime() + 20 * 24 * 3600 * 1000 + 2 * 3600 * 1000).toISOString(),
        location: "Place du Marché",
      },
    ];
  }

  return data as EventRecord[];
}

export default async function EventsPage() {
  const events = await fetchEvents();
  const grouped = groupByMonth(events);
  const monthKeys = Object.keys(grouped);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Community events</h1>
          <p className="mt-2 text-sm text-slate-300">
            Upcoming municipal meetings, trainings, and volunteer opportunities. Subscribe via the calendar feed.
          </p>
        </div>
        <Link
          href="/api/events/ics"
          className="inline-flex items-center justify-center rounded-full border border-emerald-400/50 px-5 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Download calendar (.ics)
        </Link>
      </div>
      {monthKeys.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-300">
          No upcoming events yet. Check back soon or subscribe to the ICS feed.
        </div>
      ) : (
        <div className="space-y-10">
          {monthKeys.map((month) => (
            <section key={month} aria-labelledby={month.replace(/\s+/g, "-") + "-heading"}>
              <div className="mb-4 flex items-center justify-between">
                <h2 id={month.replace(/\s+/g, "-") + "-heading"} className="text-2xl font-semibold text-white">
                  {month}
                </h2>
                <span className="text-xs uppercase tracking-wide text-slate-400">
                  {grouped[month].length} event{grouped[month].length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {grouped[month].map((event) => (
                  <article key={event.id} className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{event.description ?? "Details coming soon."}</p>
                    </div>
                    <dl className="mt-4 space-y-2 text-sm text-slate-300">
                      <div className="flex items-start gap-2">
                        <dt className="font-semibold text-emerald-200">When</dt>
                        <dd>{formatRange(event.start_time, event.end_time)}</dd>
                      </div>
                      <div className="flex items-start gap-2">
                        <dt className="font-semibold text-emerald-200">Where</dt>
                        <dd>{event.location ?? "To be announced"}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
