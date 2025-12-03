import Link from "next/link";

const quickActions = [
  {
    href: "/issues/new",
    label: "Report Issue",
    description: "Submit photos and details about a public issue.",
    icon: (
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-10 w-10 text-sky-400"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    href: "/events",
    label: "Check Events",
    description: "See town halls, clinics, and community meetings.",
    icon: (
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-10 w-10 text-cyan-300"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5m-7.5 3h7.5m-12 9h16.5a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5V18a1.5 1.5 0 0 0 1.5 1.5Zm3-12V3.75m10.5 3V3.75" />
      </svg>
    ),
  },
  {
    href: "/map",
    label: "Open Map",
    description: "View ongoing issues plotted across the city.",
    icon: (
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-10 w-10 text-orange-400"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75 3 5.25v14.25l4.5-1.5 4.5 1.5 4.5-1.5 4.5 1.5V5.25l-4.5-1.5-4.5 1.5-4.5-1.5Zm9 1.5v14.25m-4.5-12v14.25" />
      </svg>
    ),
  },
  {
    href: "/data",
    label: "Open Data",
    description: "Download datasets for research and accountability.",
    icon: (
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-10 w-10 text-sky-400"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h16.5M3.75 9h16.5m-16.5 4.5h16.5M3.75 18h9" />
      </svg>
    ),
  },
  {
    href: "/tax/lookup",
    label: "Pay Property Tax",
    description: "Look up outstanding property tax balances.",
    icon: (
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-10 w-10 text-cyan-300"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4.5m0 1.5a4.5 4.5 0 0 1 4.5 4.5H9.75m2.25 0h-6m6 0v1.5m0-1.5a4.5 4.5 0 0 1-4.5-4.5h8.25m-2.25 9v1.5m0-1.5a4.5 4.5 0 0 0-4.5 4.5H9.75m2.25 0h-6m6 0v1.5m0-1.5a4.5 4.5 0 0 0 4.5-4.5H9.75" />
      </svg>
    ),
  },
  {
    href: "/title/request/new",
    label: "Title Verification",
    description: "Start a title verification request online.",
    icon: (
      <svg
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-10 w-10 text-orange-400"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h9m-9 3h9m-9 3h5.25M4.5 18.75h15a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5h-15a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5Z" />
      </svg>
    ),
  },
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
  { label: "Issues resolved", value: "1,248", accent: "from-sky-500/80 to-sky-400/40" },
  { label: "Datasets online", value: "86", accent: "from-cyan-400/70 to-cyan-300/40" },
  { label: "Volunteer hours", value: "32K", accent: "from-orange-400/80 to-orange-300/40" },
  { label: "Neighborhood partners", value: "54", accent: "from-emerald-500/70 to-emerald-400/30" },
];

const languages = ["Kreyòl Ayisyen", "English", "Français", "Español"];

const trustSignals = [
  { label: "ISO 37120 Smart City", detail: "Certified 2024" },
  { label: "Open Data Charter", detail: "Member" },
  { label: "Digital Resilience Lab", detail: "5 partner cities" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgba(21,170,191,0.35) 0%, rgba(3,6,20,0.4) 35%, rgba(249,115,98,0.25) 100%), url('data:image/svg+xml,%3Csvg width=\"160\" height=\"160\" viewBox=\"0 0 160 160\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cdefs%3E%3ClinearGradient id=\"g\" x1=\"0\" x2=\"1\" y1=\"0\" y2=\"1\"%3E%3Cstop stop-color=\"%23030f2b\"/%3E%3Cstop offset=\"1\" stop-color=\"%2302223b\" stop-opacity=\"0.4\"/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d=\"M0 80 Q40 60 80 80 T160 80 V160 H0Z\" fill=\"url(%23g)\" opacity=\"0.5\"/%3E%3C/svg%3E')",
            maskImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.85), transparent 70%), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.5), transparent 65%)",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.25),transparent_60%)]" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 py-24 sm:px-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-sky-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-200">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(21,170,191,0.65)]" aria-hidden />
              Civic services, centralized
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Local services for Haiti, all in one trusted portal.
            </h1>
            <p className="text-lg text-slate-200 sm:text-xl">
              Submit and track public issues, explore events, analyze open data, and access key services from any device. Built with resilient infrastructure inspired by Haiti&apos;s coastal ingenuity.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="font-semibold uppercase tracking-wide text-slate-300">Available in</span>
              {languages.map((language) => (
                <span
                  key={language}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-100 shadow-sm ring-1 ring-white/10 transition hover:border-cyan-400/60 hover:bg-cyan-400/20 hover:text-white"
                >
                  <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-cyan-300">
                    <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="m5 12 3 3 6-6" />
                  </svg>
                  {language}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/issues/new"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-7 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Report an issue
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-base font-semibold text-slate-100 transition hover:border-orange-400/60 hover:bg-orange-400/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Browse services
              </Link>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              {trustSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="group rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-inner shadow-white/5 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{signal.label}</p>
                  <p className="mt-2 text-sm font-medium text-white group-hover:text-cyan-100">{signal.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-1 shadow-[0_0_40px_rgba(17,24,39,0.35)] backdrop-blur">
              <div className="absolute inset-x-6 -top-6 flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-slate-300 shadow-inner shadow-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden />
                  Service momentum
                </span>
                <span className="hidden sm:inline text-slate-500">Updated weekly</span>
              </div>
              <div className="rounded-[2.25rem] border border-white/10 bg-background/90 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20"
                    >
                      <div
                        className={`pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br ${stat.accent}`}
                        aria-hidden
                      />
                      <div className="relative">
                        <p className="text-sm uppercase tracking-wide text-slate-300">{stat.label}</p>
                        <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-slate-300">
                  Empowering residents with transparent timelines, accessible data, and coordinated municipal responses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
          <p className="text-sm text-slate-300">Most-requested services at your fingertips.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-transparent p-7 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-cyan-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl transition group-hover:scale-150 group-hover:opacity-80" aria-hidden />
              <div>
                <div className="mb-5 inline-flex items-center justify-center rounded-2xl bg-white/8 p-3 ring-1 ring-white/10">
                  {action.icon}
                </div>
                <p className="text-lg font-semibold text-white">{action.label}</p>
                <p className="mt-3 text-sm text-slate-300">{action.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1 group-hover:text-cyan-200">
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

      <section className="border-y border-white/10 bg-white/3">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 lg:flex-row">
          <div className="lg:w-1/3">
            <h2 className="text-2xl font-semibold text-white">Announcements</h2>
            <p className="mt-2 text-sm text-slate-300">
              Stay informed about municipal updates, emergency alerts, and public meetings.
            </p>
          </div>
          <div className="relative flex-1">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-400 via-white/30 to-orange-400 lg:block" aria-hidden />
            <div className="grid gap-6 lg:grid-cols-3">
              {announcements.map((announcement, index) => (
                <article
                  key={announcement.id}
                  className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-background/80 p-6 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-400/40"
                >
                  <div className="absolute -left-7 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-slate-950 bg-cyan-400/80 text-xs font-bold text-slate-950 shadow lg:flex">
                    {index + 1}
                  </div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                    <span>{announcement.date}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[0.65rem] text-cyan-300">
                      <svg aria-hidden xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                        <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Update
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <h3 className="text-lg font-semibold text-white">{announcement.title}</h3>
                    <p className="text-sm text-slate-300">{announcement.summary}</p>
                  </div>
                  <Link
                    href={announcement.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
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
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400/15 via-white/5 to-transparent px-8 py-12 text-center shadow-xl shadow-cyan-400/20 backdrop-blur sm:grid-cols-2 sm:text-left">
          <div>
            <h2 className="text-3xl font-semibold text-white">Partner with the municipality</h2>
            <p className="mt-3 text-sm text-slate-200">
              Request on-site assistance, schedule a mobile help desk, or bring training workshops to your neighborhood association.
            </p>
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-400 via-cyan-400 to-sky-500 px-7 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-orange-400/40 transition hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              Contact the municipality
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5 15.75 12l-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
