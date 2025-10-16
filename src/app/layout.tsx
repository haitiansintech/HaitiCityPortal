import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haiti-city-portal.example"),
  title: {
    default: "Haiti City Portal",
    template: "%s · Haiti City Portal",
  },
  description:
    "Report civic issues, explore local events, and access municipal data across Haiti in one modern portal.",
  openGraph: {
    title: "Haiti City Portal",
    description:
      "Report civic issues, explore local events, and access municipal data across Haiti in one modern portal.",
    url: "https://haiti-city-portal.example",
    siteName: "Haiti City Portal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haiti City Portal",
    description:
      "Report civic issues, explore local events, and access municipal data across Haiti in one modern portal.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-slate-900"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1 bg-gradient-to-b from-slate-900 to-slate-950">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
