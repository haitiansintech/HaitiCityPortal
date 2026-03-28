/**
 * Root layout for all locale-prefixed routes (`/[locale]/...`).
 *
 * This Server Component wraps every page under the locale segment. It is
 * responsible for:
 *  - Validating the locale param and returning 404 for unsupported values
 *  - Resolving the active tenant from the `x-tenant-subdomain` header set by middleware
 *  - Loading all i18n message bundles for the requested locale
 *  - Establishing the global provider chain that all child pages inherit
 *
 * Provider chain order (outermost → innermost):
 *  1. ClientIntlProvider — wraps next-intl's IntlProvider, makes translation
 *     functions available via useTranslations() in Client Components.
 *  2. TenantProvider — exposes the resolved Tenant object via useTenant(),
 *     so any Client Component can read city-specific config (name, colors,
 *     WhatsApp number, etc.) without an additional fetch.
 *  3. LanguageProvider — tracks the active locale in React context for any
 *     component that needs to react to locale changes beyond next-intl's
 *     built-in hooks.
 */

import type { Metadata } from "next";
import { getMessages, setRequestLocale } from 'next-intl/server';
import ClientIntlProvider from "@/components/providers/ClientIntlProvider";
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import "../globals.css";

import { headers } from "next/headers";
import { TenantProvider } from "@/components/providers/TenantProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getTenantBySubdomain } from "@/lib/tenants";


export const metadata: Metadata = {
  metadataBase: new URL("https://haiti-city-portal.example"),
  title: {
    default: "Haiti City Portal",
    template: "%s · Haiti City Portal",
  },
  description:
    "Report civic issues, explore local events, and access municipal data across Haiti in one modern portal.",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
    "noai": true,
    "noimageai": true,
  } as any,
  openGraph: {
    type: "website",
    siteName: "Haiti City Portal",
    title: "Haiti City Portal",
    description: "Report civic issues, explore local events, and access municipal data across Haiti.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@HaitiCityPortal",
    creator: "@HaitiCityPortal",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // setRequestLocale() is required by next-intl for Server Components.
  // Without this call, next-intl cannot determine the active locale when
  // rendering Server Components because there is no React context in the
  // server rendering pipeline. It must be called before any translation
  // function (getTranslations, getMessages) or server-side navigation helper
  // is used in this layout or any of its children.
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Read the tenant subdomain injected by middleware. The value is guaranteed
  // to be present (middleware always sets it) but we default to "demo" as a
  // safety net during local development without middleware running.
  const headersList = await headers();
  const subdomainHeader = headersList.get("x-tenant-subdomain") || "demo";
  const tenant = await getTenantBySubdomain(subdomainHeader);

  return (
    <ClientIntlProvider
      messages={messages}
      locale={locale}
      timeZone="America/Port-au-Prince"
    >
      {/*
        "Skip to main content" accessibility landmark.
        Visually hidden by default (sr-only) but becomes visible when focused
        via keyboard navigation. This allows screen reader and keyboard users
        to bypass the Navbar and jump directly to page content, satisfying
        WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks).
      */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <TenantProvider tenant={tenant as any}>
        <LanguageProvider>
          <div className="flex min-h-screen w-full flex-col bg-canvas">
            <Navbar />
            <Breadcrumbs />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            {tenant.whatsapp_number && <WhatsAppButton phoneNumber={tenant.whatsapp_number} />}
          </div>
        </LanguageProvider>
      </TenantProvider>
    </ClientIntlProvider>
  );
}
