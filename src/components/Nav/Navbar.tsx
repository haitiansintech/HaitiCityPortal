"use client";
import Link from "next/link";
import { useState } from "react";

// ✅ Task P0: Navbar implemented
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/issues", label: "Issues" },
    { href: "/events", label: "Events" },
    { href: "/map", label: "Map" },
    { href: "/data", label: "Data" },
    { href: "/tax/lookup", label: "Taxes" },
    { href: "/title/request/new", label: "Title" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-black/80 text-white backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">Haiti City Portal</Link>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>☰</button>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map(l => (
            <li key={l.href}><Link className="hover:underline" href={l.href}>{l.label}</Link></li>
          ))}
          <li><Link href="/login" className="rounded bg-white px-3 py-1 text-black">Login</Link></li>
        </ul>
      </nav>
      {open && (
        <div className="px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map(l => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
            <li><Link href="/login" className="inline-block rounded bg-white px-3 py-1 text-black">Login</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}