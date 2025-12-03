import Link from "next/link";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";

const footerLinks = {
  About: [
    { href: "/about", label: "About the portal" },
    { href: "/contact", label: "Contact" },
  ],
  "Open Data": [
    { href: "/data", label: "Data catalog" },
    { href: "/api/events/ics", label: "Events calendar (.ics)" },
  ],
  Policies: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ],
  Support: [
    { href: "mailto:info@haiticity.org", label: "info@haiticity.org" },
    { href: "/issues/new", label: "Report an issue" },
  ],
} as const;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/80 text-slate-200 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,2fr)]">
          <div className="space-y-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-lg font-semibold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <span
                aria-hidden
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/80 to-orange-400/80 text-sm font-bold uppercase tracking-wide text-white shadow-md ring-1 ring-white/20 transition group-hover:shadow-lg"
              >
                HT
              </span>
              <span className="leading-tight">
                Haiti City Portal
                <span className="block text-xs font-normal text-slate-300">Municipal innovation hub</span>
              </span>
            </Link>
            <p className="max-w-md text-sm text-slate-300">
              A digital platform connecting residents with civic services, data, and events across the municipality. Built in partnership with local government and community leaders.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                Always-on support
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="flex h-2 w-2 rounded-full bg-sky-400" aria-hidden />
                Multilingual access
              </span>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-cyan-200">{section}</h2>
                <ul className="space-y-2 text-sm text-slate-300">
                  {links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("mailto:") ? (
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Haiti City Portal. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <LocaleSwitcher />
            <Link
              href="/accessibility"
              className="rounded-md border border-white/10 px-3 py-1 text-slate-200 transition hover:border-cyan-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              Accessibility
            </Link>
            <Link
              href="mailto:info@haiticity.org"
              className="rounded-md border border-white/10 px-3 py-1 text-slate-200 transition hover:border-cyan-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
