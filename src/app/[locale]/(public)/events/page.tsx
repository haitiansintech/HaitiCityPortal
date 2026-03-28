import { Link } from "@/i18n/navigation";
import { db } from "@/db";
import { events } from "@/db/schema";
import { asc, gte } from "drizzle-orm";
import { Calendar, MapPin, Clock, Share2 } from "lucide-react";

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

    data = result.map((e) => ({
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
    if (!enableLocalMode) return [] as EventRecord[];
    const now = new Date();
    return [
      {
        id: "sample-event-1",
        title: "Town Hall: Digital Portal Demo",
        description: "Submitting service requests and paying taxes directly in your neighborhood.",
        start_time: new Date(now.getTime() + 1 * 24 * 3600 * 1000).toISOString(),
        end_time: new Date(now.getTime() + 1 * 24 * 3600 * 1000 + 90 * 60000).toISOString(),
        location: "Place Congres, Bel-Air",
      },
      {
        id: "sample-event-2",
        title: "Municipal Budget Review",
        description: "Discussing fiscal year goals.",
        start_time: new Date(now.getTime() + 14 * 24 * 3600 * 1000).toISOString(),
        end_time: null,
        location: "Mairie de Port-au-Prince",
      },
      {
        id: "sample-event-3",
        title: "Jacmel Film Festival",
        description: "An annual celebration of cinema in the heart of Jacmel.",
        start_time: new Date(now.getTime() + 14 * 24 * 3600 * 1000 + 2 * 3600 * 1000).toISOString(),
        end_time: null,
        location: "Jacmel Cultural Center",
      },
    ];
  }

  return data;
}

export default async function EventsPage() {
  const eventList = await fetchEvents();
  const grouped = groupByMonth(eventList);
  const monthKeys = Object.keys(grouped);

  // JSON-LD structured data for search engines
  const eventsSchema = eventList.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.start_time,
    endDate: event.end_time || event.start_time,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.location || "City Hall",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mairie",
        addressCountry: "HT",
      },
    },
    description: event.description,
  }));

  return (
    <div className="min-h-screen bg-neutral-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />

      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-ink-primary tracking-tight">
              Community Events
            </h1>
            <p className="mt-2 text-ink-secondary">
              Upcoming municipal meetings, trainings, and volunteer opportunities.
            </p>
          </div>
          <Link
            href="/api/events/ics"
            className="inline-flex items-center gap-2 self-start rounded-full border-2 border-sky-600 px-5 py-2.5 text-sm font-bold text-sky-600 hover:bg-sky-600 hover:text-white transition-colors whitespace-nowrap"
          >
            <Calendar className="h-4 w-4" />
            Download calendar (.ics)
          </Link>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 md:px-6 py-12">
        {monthKeys.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-neutral-200 shadow-sm p-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue/10 mb-6">
              <Calendar className="h-10 w-10 text-brand-blue" />
            </div>
            <p className="text-xl font-bold text-ink-primary">No upcoming events just yet.</p>
            <p className="mt-2 text-ink-secondary max-w-sm">
              Check back soon or subscribe above to receive calendar updates automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {monthKeys.map((month) => (
              <section key={month} aria-labelledby={month.replace(/\s+/g, "-") + "-heading"}>

                {/* Month heading */}
                <div className="mb-6 flex items-center justify-between border-b-4 border-neutral-200 pb-4">
                  <h2
                    id={month.replace(/\s+/g, "-") + "-heading"}
                    className="text-2xl font-bold uppercase tracking-wide text-ink-primary"
                  >
                    {month}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue">
                    <span className="h-2 w-2 rounded-full bg-brand-blue" aria-hidden />
                    {grouped[month].length} event{grouped[month].length > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Timeline */}
                <div className="relative pl-6 sm:pl-10">
                  {/* Vertical line */}
                  <div
                    className="absolute left-2 top-0 h-full w-0.5 bg-gradient-to-b from-brand-blue/50 via-brand-blue/20 to-transparent"
                    aria-hidden
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    {grouped[month].map((event) => (
                      <article
                        key={event.id}
                        className="group relative flex flex-col justify-between rounded-2xl bg-white border border-neutral-200 p-6 shadow-sm hover:border-brand-blue/40 hover:shadow-md transition-all"
                      >
                        {/* Timeline dot */}
                        <span
                          className="absolute left-[-34px] top-6 hidden h-4 w-4 rounded-full border-4 border-neutral-50 bg-brand-blue shadow sm:block"
                          aria-hidden
                        />

                        {/* Event title + description */}
                        <div>
                          <h3 className="text-lg font-bold text-ink-primary group-hover:text-brand-blue transition-colors">
                            {event.title}
                          </h3>
                          <p className="mt-2 text-sm text-ink-secondary leading-relaxed">
                            {event.description ?? "Details coming soon."}
                          </p>
                        </div>

                        {/* When / Where */}
                        <dl className="mt-5 space-y-2.5 text-sm text-ink-secondary">
                          <div className="flex items-start gap-2">
                            <dt className="inline-flex items-center gap-1.5 font-bold text-brand-blue shrink-0">
                              <Clock className="h-4 w-4" />
                              When
                            </dt>
                            <dd>{formatRange(event.start_time, event.end_time)}</dd>
                          </div>
                          {event.location && (
                            <div className="flex items-start gap-2">
                              <dt className="inline-flex items-center gap-1.5 font-bold text-brand-blue shrink-0">
                                <MapPin className="h-4 w-4" />
                                Where
                              </dt>
                              <dd>{event.location}</dd>
                            </div>
                          )}
                        </dl>

                        {/* Footer: RSVP note + WhatsApp share */}
                        <div className="mt-5 flex items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-secondary">
                            <svg
                              aria-hidden
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              className="h-3.5 w-3.5 text-emerald-500"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            RSVP recommended
                          </span>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                              `${event.title} — ${new Date(event.start_time).toLocaleDateString()}${event.location ? ` at ${event.location}` : ""}. See you there!`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-600 transition-colors"
                          >
                            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
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
    </div>
  );
}
