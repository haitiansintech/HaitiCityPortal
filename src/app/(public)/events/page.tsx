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
    <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Community events</h1>
          <p className="mt-2 text-sm text-slate-300">
            Upcoming municipal meetings, trainings, and volunteer opportunities. Subscribe via the calendar feed.
          </p>
        </div>
        <Link
          href="/api/events/ics"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
        >
          Download calendar (.ics)
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </Link>
      </div>
      {monthKeys.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300 shadow-xl shadow-black/20">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-200">
            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Zm4-4h2v2H9v-2Z" />
            </svg>
          </div>
          <p className="mt-4 font-semibold text-white">No upcoming events just yet.</p>
          <p className="mt-2 text-slate-300">Check back soon or subscribe above to receive calendar updates automatically.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {monthKeys.map((month) => (
            <section key={month} aria-labelledby={month.replace(/\s+/g, "-") + "-heading"} className="relative">
              <div className="mb-6 flex items-center justify-between">
                <h2 id={month.replace(/\s+/g, "-") + "-heading"} className="text-2xl font-semibold text-white">
                  {month}
                </h2>
                <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-200">
                  <span className="flex h-2 w-2 rounded-full bg-cyan-400" aria-hidden />
                  {grouped[month].length} event{grouped[month].length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="relative pl-6 sm:pl-10">
                <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-white/20 to-transparent" aria-hidden />
                <div className="grid gap-6 md:grid-cols-2">
                  {grouped[month].map((event) => (
                    <article
                      key={event.id}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-400/20"
                    >
                      <span className="absolute left-[-34px] top-6 hidden h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-300 shadow-md sm:block" aria-hidden />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                        <p className="mt-2 text-sm text-slate-300">{event.description ?? "Details coming soon."}</p>
                      </div>
                      <dl className="mt-5 space-y-3 text-sm text-slate-300">
                        <div className="flex items-start gap-2">
                          <dt className="inline-flex items-center gap-2 font-semibold text-cyan-200">
                            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l2.5 2.5" />
                            </svg>
                            When
                          </dt>
                          <dd>{formatRange(event.start_time, event.end_time)}</dd>
                        </div>
                        <div className="flex items-start gap-2">
                          <dt className="inline-flex items-center gap-2 font-semibold text-cyan-200">
                            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5c1.657 0 3-1.343 3-3S13.657 4.5 12 4.5 9 5.843 9 7.5s1.343 3 3 3Zm0 0c3.314 0 6 2.239 6 5v.75c0 .621-.504 1.125-1.125 1.125H7.125A1.125 1.125 0 0 1 6 16.25V15.5c0-2.761 2.686-5 6-5Z" />
                            </svg>
                            Where
                          </dt>
                          <dd>{event.location ?? "To be announced"}</dd>
                        </div>
                      </dl>
                      <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          RSVP recommended
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-300/80">
                          <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h18m-16.5 3h15m-12 3H18" />
                          </svg>
                          Add to agenda
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
