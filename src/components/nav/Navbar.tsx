"use client";

import Link from "next/link";
import { useState } from "react";
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
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/90 text-white backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          onClick={closeMobile}
        >
          <span aria-hidden className="inline-block rounded-full bg-emerald-500/90 px-2 py-1 text-xs font-medium uppercase tracking-wide">
            Haiti
          </span>
          <span>Haiti City Portal</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-full border border-emerald-400/80 px-4 py-1.5 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Login
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/20 px-3 py-2 text-sm font-medium leading-none text-white shadow-sm transition hover:border-emerald-400/80 hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:hidden"
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
      <div
        id="mobile-menu"
        className={cn(
          "border-t border-white/10 bg-slate-950/95 px-4 py-4 transition duration-200 md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMobile}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                onClick={closeMobile}
                className="block rounded-md bg-emerald-500/90 px-3 py-2 text-center text-sm font-semibold text-slate-900 transition hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
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
