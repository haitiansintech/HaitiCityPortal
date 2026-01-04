"use client";

import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";
import { useTenant } from "@/components/providers/TenantProvider";
import { Facebook, Youtube, Twitter } from "lucide-react";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();
  const tenant = useTenant();
  const tenantName = tenant?.name || "Haiti City Portal";

  const footerSections = [
    {
      title: t("projectDetails"),
      links: [
        { href: "/about", label: t("vision") },
        { href: "/about/tech", label: t("techManifesto") },
        { href: "/about/impact", label: t("impact") },
        { href: "/about/roadmap", label: t("roadmap") },
        { href: "/contribute", label: t("contribution") },
      ]
    },
    {
      title: t("resources"),
      links: [
        { href: "/data", label: t("dataCatalog") },
        { href: "/api/events/ics", label: t("eventsApi") },
        { href: "/terms", label: t("terms") },
        { href: "/privacy", label: t("privacy") },
      ]
    },
    {
      title: t("support"),
      links: [
        { href: "/contact", label: t("contactUs") },
        { href: "/report", label: t("reportIssue") },
        { href: "mailto:info@haiticity.org", label: "info@haiticity.org" },
        { href: "https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose", label: t("suggestFeature") },
      ]
    }
  ];

  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50 text-gray-700">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Col 1: Logo & Socials */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-600 text-xs font-bold text-white">HT</div>
              <span className="font-bold text-[#333333]">{tenant?.name || "Haiti City Portal"}</span>
            </Link>
            <p className="text-sm text-gray-600 leading-snug">
              {t("tagline")}
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

          {/* Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#333333]">{section.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="hover:text-sky-600">
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

      {/* Lower Footer Bar */}
      <div className="bg-slate-100 border-t border-slate-200 py-4">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <Link href="/plan-site" className="hover:text-brand-blue flex items-center gap-1">
            {t("sitemap")}
          </Link>
        </div>
      </div>

      <div className="mt-0 flex flex-col gap-4 border-t border-gray-200 pt-6 pb-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col gap-1">
          <p>
            © {year} {tenantName}. {t("rights")}
            <span className="block text-xs text-slate-400">{t("license")}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <LocaleSwitcher />
          <Link
            href="/accessibility"
            className="rounded-md border border-gray-200 px-3 py-1 text-gray-600 transition hover:border-primary hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("accessibility")}
          </Link>
          <Link
            href="mailto:info@haiticity.org"
            className="rounded-md border border-gray-200 px-3 py-1 text-gray-600 transition hover:border-primary hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t("feedback")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

