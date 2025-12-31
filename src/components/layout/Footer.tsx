"use client";

import Link from "next/link";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";
import { useTenant } from "@/components/providers/TenantProvider";
import { Facebook, Youtube, Twitter } from "lucide-react";

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
          {/* Col 1: Logo & Socials */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-600 text-xs font-bold text-white">HT</div>
              <span className="font-bold text-[#333333]">{tenant?.name || "Haiti City Portal"}</span>
            </Link>
            <p className="text-sm text-gray-600 leading-snug">
              Connecting residents with civic services and data.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@CityHallJacmel" target="_blank" rel="noopener noreferrer" className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 text-slate-800 rounded-full hover:bg-slate-100 transition-colors" aria-label="X (Twitter)">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Project Details */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#333333]">Project Details</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-sky-600">Our Vision</Link></li>
              <li><Link href="/about/tech" className="hover:text-sky-600">Technical Manifesto</Link></li>
              <li><Link href="/about/impact" className="hover:text-sky-600">Impact in Haiti</Link></li>
              <li><Link href="/about/roadmap" className="hover:text-sky-600">Project Roadmap</Link></li>
              <li><Link href="/contribute" className="hover:text-sky-600">Contribution Guide</Link></li>
            </ul>
          </div>

          {/* Col 3: Open Data & Policies */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#333333]">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/data" className="hover:text-sky-600">Open Data Catalog</Link></li>
              <li><Link href="/api/events/ics" className="hover:text-sky-600">Events API</Link></li>
              <li><Link href="/terms" className="hover:text-sky-600">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-sky-600">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#333333]">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/contact" className="hover:text-sky-600">Contact Us</Link></li>
              <li><Link href="/report" className="hover:text-sky-600">Report an Issue</Link></li>
              <li><a href="mailto:info@haiticity.org" className="hover:text-sky-600">info@haiticity.org</a></li>
              <li><a href="https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600">Suggest a Feature</a></li>
            </ul>
          </div>
        </div>

      </div>

      {/* Lower Footer Bar */}
      <div className="bg-slate-100 border-t border-slate-200 py-4">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <Link href="/plan-site" className="hover:text-brand-blue flex items-center gap-1">
            Tout Sèvis (Sitemap)
          </Link>
        </div>
      </div>

      <div className="mt-0 flex flex-col gap-4 border-t border-gray-200 pt-6 pb-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col gap-1">
          <p>© {year} {tenant?.name || "Haiti City Portal"}. All rights reserved.</p>
          <p className="text-xs text-slate-400">© 2025 Haiti City Portal Project. Source-Available License. Commercial use prohibited.</p>
        </div>
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

