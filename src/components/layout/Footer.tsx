import Link from "next/link";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";

const footerLinks = {
  About: [
    { href: "/about", label: "About the Portal" },
    { href: "/contact", label: "Contact" },
  ],
  "Open Data": [
    { href: "/data", label: "Data Catalog" },
    { href: "/api/events/ics", label: "Events Calendar (.ics)" },
  ],
  Policies: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ],
  Support: [
    { href: "mailto:info@haiticity.org", label: "info@haiticity.org" },
    { href: "/issues/new", label: "Report an Issue" },
  ],
} as const;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950/95 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
                {section}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
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
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-400">© {year} Haiti City Portal. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <Link
              href="/data"
              className="rounded-md border border-white/20 px-3 py-1 text-sm text-slate-200 transition hover:border-emerald-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Open Data
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
