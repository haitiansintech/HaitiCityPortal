"use client";

import { useTransition, useState } from "react";

const locales = [
  { value: "en", label: "English" },
  { value: "ht", label: "Kreyòl" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
];

export default function LocaleSwitcher() {
  const [locale, setLocale] = useState("en");
  const [isPending, startTransition] = useTransition();

  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-300">
      <span className="hidden sm:inline">Language</span>
      <select
        value={locale}
        onChange={(event) => {
          const next = event.target.value;
          startTransition(() => setLocale(next));
        }}
        aria-label="Select language"
        className="rounded-md border border-white/20 bg-slate-900/80 px-3 py-1 text-sm text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        disabled={isPending}
      >
        {locales.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
