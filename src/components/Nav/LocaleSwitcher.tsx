"use client";
import { useState } from "react";

// ✅ Task P0: LocaleSwitcher implemented (stub)
export default function LocaleSwitcher() {
  const [locale, setLocale] = useState("en");
  return (
    <div className="inline-flex items-center gap-2">
      <label htmlFor="locale" className="sr-only">Language</label>
      <select
        id="locale"
        aria-label="Select language"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="rounded border bg-white/5 px-2 py-1 text-sm"
      >
        <option value="en">EN</option>
        <option value="ht">HT</option>
        <option value="fr">FR</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
}