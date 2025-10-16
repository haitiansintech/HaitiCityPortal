import Link from "next/link";

const quickActions = [
  { href: "/issues/new", label: "Report Issue", description: "Submit photos and details about a public issue." },
  { href: "/events", label: "Check Events", description: "See town halls, clinics, and community meetings." },
  { href: "/map", label: "Open Map", description: "View ongoing issues plotted across the city." },
  { href: "/data", label: "Open Data", description: "Download datasets for research and accountability." },
  { href: "/tax/lookup", label: "Pay Property Tax", description: "Look up outstanding property tax balances." },
  { href: "/title/request/new", label: "Title Verification", description: "Start a title verification request online." },
];

const announcements = [
  {
    id: 1,
    title: "Hurricane season readiness webinars",
    href: "/events",
    date: "Feb 12, 2025",
    summary: "Weekly preparedness sessions with emergency management leaders.",
  },
  {
    id: 2,
    title: "New sanitation pick-up pilot in Carrefour",
    href: "/issues",
    date: "Jan 28, 2025",
    summary: "Track pilot progress and report feedback directly in the portal.",
  },
  {
    id: 3,
    title: "Community grant applications due March 15",
    href: "/data",
    date: "Jan 15, 2025",
    summary: "Download the grant data pack and submit proposals digitally.",
  },
];

const stats = [
  { label: "Issues resolved", value: "1,248" },
  { label: "Datasets online", value: "86" },
  { label: "Volunteer hours", value: "32K" },
  { label: "Neighborhood partners", value: "54" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.25),transparent_55%)]" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
              Civic services, centralized
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Local services for Haiti, all in one trusted portal.
            </h1>
            <p className="text-lg text-slate-200 sm:text-xl">
              Submit and track public issues, explore events, analyze open data, and access key services from any device in English, Kreyòl, French, or Spanish.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/issues/new"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Report an issue
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-emerald-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Browse services
              </Link>
            </div>
          </div>
          <div className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-300">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-300">
              Empowering residents with transparent timelines, accessible data, and coordinated municipal responses.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
          <p className="text-sm text-slate-300">Most-requested services at your fingertips.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-6 transition hover:border-emerald-300 hover:bg-slate-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <div>
                <p className="text-lg font-semibold text-white">{action.label}</p>
                <p className="mt-3 text-sm text-slate-300">{action.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 group-hover:text-emerald-200">
                Get started
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
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:flex-row">
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-semibold text-white">Announcements</h2>
            <p className="mt-2 text-sm text-slate-300">
              Stay informed about municipal updates, emergency alerts, and public meetings.
            </p>
          </div>
          <div className="grid flex-1 gap-6 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <article key={announcement.id} className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-300">{announcement.date}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{announcement.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{announcement.summary}</p>
                </div>
                <Link
                  href={announcement.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  View details
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
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/5 px-6 py-10 text-center shadow-lg sm:grid-cols-2 sm:text-left">
          <div>
            <h2 className="text-3xl font-semibold text-white">Partner with the municipality</h2>
            <p className="mt-3 text-sm text-slate-200">
              Request on-site assistance, schedule a mobile help desk, or bring training workshops to your neighborhood association.
            </p>
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-slate-950 shadow transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Contact the municipality
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
