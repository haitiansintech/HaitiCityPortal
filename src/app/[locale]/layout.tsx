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

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const headersList = await headers();
  const subdomainHeader = headersList.get("x-tenant-subdomain") || "demo";
  const tenant = await getTenantBySubdomain(subdomainHeader);

  return (
    <ClientIntlProvider
      messages={messages}
      locale={locale}
      timeZone="America/Port-au-Prince"
    >
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

