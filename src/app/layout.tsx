import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

import { headers } from "next/headers";
import { db } from "@/db";
import { tenants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TenantProvider } from "@/components/providers/TenantProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";


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
    // Block AI scrapers
    "noai": true,
    "noimageai": true,
  } as any, // Cast to any because Next.js types might not strictly support custom standard tags yet, but browsers respect them
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const subdomainHeader = headersList.get("x-tenant-subdomain") || "demo";

  let tenant = null;
  try {
    // Query by subdomain instead of ID
    const result = await db.select().from(tenants).where(eq(tenants.subdomain, subdomainHeader)).limit(1);
    tenant = result[0];

    if (!tenant) {
      // No tenant found - fallback to demo
    }
  } catch (error) {
    // Fail silently in production
  }

  // Fallback if DB fetch fails or tenant not found
  if (!tenant) {
    tenant = {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Haiti City Portal (System)",
      subdomain: "demo",
      logo_url: null,
      primary_color: "#0284c7",
      moncash_merchant_id: null,
      bank_name: null,
      bank_swift_code: null,
      bank_account_number: null,
      bank_beneficiary_name: null,
      whatsapp_number: null,
      created_at: new Date()
    }
  }

  return (
    <html lang="en">
      <body
        className="min-h-screen font-sans bg-canvas text-ink"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <TenantProvider tenant={tenant as any}>
          <LanguageProvider>
            <div className="flex min-h-screen w-full flex-col bg-white">
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              {tenant.whatsapp_number && <WhatsAppButton phoneNumber={tenant.whatsapp_number} />}
            </div>
          </LanguageProvider>
        </TenantProvider>
      </body>
    </html>
  );
}

