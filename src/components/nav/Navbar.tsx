"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";
import { useTenant } from "@/components/providers/TenantProvider";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/officials", label: "Government" },
  { href: "/report", label: "Report" },
  { href: "/pay", label: "Pay" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const tenant = useTenant();

  return (
    <header className="sticky top-0 z-[1001] w-full border-b border-gray-200 bg-white shadow-sm">
      {/* Top Alert Bar - Kept for utility */}
      <div className="bg-slate-50 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between text-xs font-medium text-slate-600">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sky-700">24/7 Hotline: 129</span>
            <span className="hidden sm:inline">Emergency alerts & updates</span>
          </div>
          <LocaleSwitcher />
        </div>
      </div>

      <div className="flex h-20 items-center justify-between px-6">
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-3">
          {tenant?.logo_url ? (
            <img src={tenant.logo_url} alt="Logo" className="h-10 w-10 rounded-lg object-contain" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue text-sm font-bold text-white">
              HT
            </div>
          )}
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold text-ink">{tenant?.name || "Haiti City Portal"}</span>
            <span className="text-xs font-medium text-gray-500">Municipal Services Hub</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-primary hover:text-brand-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="destructive" asChild>
            <Link href="/donate">Donate</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-ink-primary"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4 px-6 space-y-4 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-ink-primary hover:text-brand-blue"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="destructive" asChild className="w-full justify-start">
            <Link href="/pay" onClick={() => setIsOpen(false)}>Donate / Pay</Link>
          </Button>
        </div>
      )}
    </header>
  );
}

