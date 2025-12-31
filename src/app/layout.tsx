import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import "./manual-fixes.css"; // Force load overrides

import { headers } from "next/headers";
import { db } from "@/db";
import { tenants } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TenantProvider } from "@/components/providers/TenantProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haiti-city-portal.example"),
  title: {
    default: "Haiti City Portal",
    template: "%s · Haiti City Portal",
  },
  description:
    "Report civic issues, explore local events, and access municipal data across Haiti in one modern portal.",
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
      console.warn(`[Layout] No tenant found for subdomain: ${subdomainHeader}`);
    }
  } catch (error) {
    console.error("[Layout] Failed to fetch tenant:", error);
  }

  // Fallback if DB fetch fails or tenant not found
  if (!tenant) {
    tenant = {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Haiti City Portal (System)",
      subdomain: "demo",
      logo_url: null,
      primary_color: "#0284c7",
      created_at: new Date()
    }
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} min-h-screen font-sans bg-canvas text-ink`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <TenantProvider tenant={tenant}>
          <div className="flex min-h-screen w-full flex-col bg-white">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </TenantProvider>
      </body>
    </html>
  );
}

