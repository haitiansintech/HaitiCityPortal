"use client";

import Link from "next/link";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";
import { useTenant } from "@/components/providers/TenantProvider";

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
    { href: "/report", label: "Report an issue" },
  ],
} as const;

export default function Footer() {
  const year = new Date().getFullYear();
  const tenant = useTenant();

  return (
    <footer className="mt-24 border-t border-gray-200 bg-gray-50 text-gray-700">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Col 1: Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-600 text-xs font-bold text-white">HT</div>
              <span className="font-bold text-[#333333]">{tenant?.name || "Haiti City Portal"}</span>
            </Link>
            <p className="text-sm text-gray-600 leading-snug">
              Connecting residents with civic services and data.
            </p>
          </div>

          {/* Col 2: Open Data */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#333333]">Open Data</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/data" className="hover:text-sky-600">Data Catalog</Link></li>
              <li><Link href="/api/events" className="hover:text-sky-600">Events API</Link></li>
            </ul>
          </div>

          {/* Col 3: Policies */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#333333]">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/terms" className="hover:text-sky-600">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-sky-600">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#333333]">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/report" className="hover:text-sky-600">Report an Issue</Link></li>
              <li><a href="mailto:info@haiticity.org" className="hover:text-sky-600">info@haiticity.org</a></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {tenant?.name || "Haiti City Portal"}. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <LocaleSwitcher />
          <Link
            href="/accessibility"
            className="rounded-md border border-gray-200 px-3 py-1 text-gray-600 transition hover:border-primary hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Accessibility
          </Link>
          <Link
            href="mailto:info@haiticity.org"
            className="rounded-md border border-gray-200 px-3 py-1 text-gray-600 transition hover:border-primary hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Feedback
          </Link>
        </div>
      </div>
    </footer>
  );
}

