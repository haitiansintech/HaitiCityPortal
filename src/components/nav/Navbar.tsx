"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";
import { useTenant } from "@/components/providers/TenantProvider";
import { Facebook, Youtube, Twitter } from "lucide-react";

import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const tenant = useTenant();

  const navLinks = [
    { href: "/services", label: t("services") },
    { href: "/directory", label: "Infrastructure" },
    { href: "/officials", label: t("government") },
    { href: "/report", label: t("report") },
    { href: "/pay", label: t("pay") },
  ];

  return (
    <header className="sticky top-0 z-[1001] w-full border-b border-gray-200 bg-white shadow-sm">
      {/* Top Alert Bar - Kept for utility */}
      <div className="bg-slate-50 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between text-xs font-medium text-slate-600">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sky-700">{t("hotline")}</span>
            <span className="hidden sm:inline">{t("emergencyAlerts")}</span>
            <div className="hidden md:flex items-center gap-3 ml-4 border-l border-slate-200 pl-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600" aria-label="Facebook">
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a href="https://youtube.com/@CityHallJacmel" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-600" aria-label="YouTube">
                <Youtube className="h-3.5 w-3.5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800" aria-label="X (Twitter)">
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
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
            <span className="text-xs font-medium text-gray-500">{t("hub")}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as any}
              className="text-sm font-medium text-ink-primary hover:text-brand-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="destructive" asChild>
            <Link href="/donate">{t("donate")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">{t("openMenu")}</span>
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
              href={link.href as any}
              onClick={() => setIsOpen(false)}
              className="block text-base font-semibold text-ink-primary hover:text-brand-blue"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="destructive" asChild className="w-full justify-start">
            <Link href="/donate" onClick={() => setIsOpen(false)}>{t("donatePay")}</Link>
          </Button>
        </div>
      )}
    </header>
  );
}

