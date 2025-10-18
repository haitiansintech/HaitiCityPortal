"use client";

import Link from "next/link";
import { useState } from "react";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/issues", label: "Issues" },
  { href: "/events", label: "Events" },
  { href: "/map", label: "Map" },
  { href: "/data", label: "Data" },
  { href: "/tax/lookup", label: "Tax Lookup" },
  { href: "/title/request/new", label: "Title Request" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleMobile() {
    setMobileOpen((open) => !open);
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 text-white shadow-[0_1px_0_rgba(20,48,79,0.65)]">
      <div className="border-b border-white/10 bg-gradient-to-r from-background/80 via-background/60 to-background/80 backdrop-blur">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 text-xs text-slate-200 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-2 py-0.5 font-semibold text-cyan-100">
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-3.5 w-3.5"
              >
                <path
                  d="M6.75 3A1.75 1.75 0 0 0 5 4.75v14.5A1.75 1.75 0 0 0 6.75 21h10.5A1.75 1.75 0 0 0 19 19.25V4.75A1.75 1.75 0 0 0 17.25 3h-10.5Zm2.5 2h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5Zm0 3h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1 0-1.5ZM12 18a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 18Z"
                  fill="currentColor"
                />
              </svg>
              24/7 Hotline: 129
            </span>
            <span className="hidden sm:inline text-slate-300">Emergency alerts in four languages</span>
          </div>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <Link
              href="/alerts"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 font-medium text-slate-200 transition hover:border-orange-400/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <span>Alerts</span>
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-3.5 w-3.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#0f1a2d]/95 via-[#081327]/90 to-[#0f1a2d]/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 text-lg font-semibold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          onClick={closeMobile}
        >
          <span
            aria-hidden
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/80 to-orange-400/80 text-sm font-bold uppercase tracking-wide text-white shadow-md ring-1 ring-white/20 transition group-hover:shadow-lg"
          >
            HT
          </span>
          <span className="leading-tight">
            Haiti City Portal
            <span className="block text-xs font-normal text-slate-300">Municipal innovation hub</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-full border border-orange-400/40 bg-orange-400/10 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:border-orange-400/60 hover:bg-orange-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
          >
            Login
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium leading-none text-white shadow-sm transition hover:border-orange-400/60 hover:text-orange-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          onClick={toggleMobile}
        >
          <span className="sr-only">Toggle navigation menu</span>
          <svg
            aria-hidden
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
          >
            {mobileOpen ? (
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </button>
      </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-cyan-400/50 via-orange-400/40 to-sky-500/50" aria-hidden />
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#070f1f]/95 via-[#030614]/98 to-[#030614] px-4 transition-all duration-300 ease-out md:hidden",
          mobileOpen ? "max-h-[32rem] py-4 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobile}
                  className="group relative block rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-orange-400/40 hover:bg-orange-400/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 right-3 my-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-xs text-slate-300 transition group-hover:bg-orange-400/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                onClick={closeMobile}
                className="block rounded-xl bg-gradient-to-r from-orange-400 to-orange-400/70 px-4 py-3 text-center text-sm font-semibold text-slate-950 shadow-lg transition hover:from-orange-400/90 hover:to-orange-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
