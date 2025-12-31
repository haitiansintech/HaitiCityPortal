import Link from "next/link";

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

import { db } from "@/db";
import { events } from "@/db/schema";
import { asc, gte } from "drizzle-orm";

async function fetchEvents() {
  let data: EventRecord[] = [];
  let error: { message: string } | null = null;

  try {
    const result = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        start_time: events.start_time,
        end_time: events.end_time,
        location: events.location,
      })
      .from(events)
      .where(gte(events.start_time, new Date(Date.now() - 7 * 24 * 3600 * 1000)))
      .orderBy(asc(events.start_time))
      .limit(50);

    // Convert dates to ISO strings to match EventRecord type if needed, 
    // but EventRecord expects strings. Drizzle returns Dates for timestamp columns.
    // We need to map them.
    data = result.map(e => ({
      ...e,
      start_time: e.start_time.toISOString(),
      end_time: e.end_time ? e.end_time.toISOString() : null,
    }));

  } catch (e: any) {
    error = { message: e.message };
  }

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

  return data;
}

export default async function EventsPage() {
  const events = await fetchEvents();
  const grouped = groupByMonth(events);
  const monthKeys = Object.keys(grouped);

  // Generate JSON-LD for Events
  const eventsSchema = events.map(event => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "startDate": event.start_time,
    "endDate": event.end_time || event.start_time, // Fallback if no end time
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location || "City Hall",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mairie",
        "addressCountry": "HT"
      }
    },
    "description": event.description
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
      <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Community events</h1>
          <p className="mt-2 text-sm text-slate-300">
            Upcoming municipal meetings, trainings, and volunteer opportunities. Subscribe via the calendar feed.
          </p>
        </div>
        <Link
          href="/api/events/ics"
          className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-cyan-400/50 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
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
                      <div className="mt-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <svg aria-hidden xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-3.5 w-3.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            RSVP recommended
                          </span>
                        </div>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(`Meeting at City Hall: ${event.title} on ${new Date(event.start_time).toLocaleDateString()}. See you there!`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-bold text-green-400 border border-green-500/20 hover:bg-green-500 hover:text-white transition-all transform hover:scale-105"
                        >
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          WhatsApp Share
                        </a>
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
