"use client";

import { useTransition, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const locales = [
  { value: "en", label: "English" },
  { value: "ht", label: "Kreyòl" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
];

export default function LocaleSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isPending, startTransition] = useTransition();

  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-600">
      <span className="hidden sm:inline">Language</span>
      <select
        value={language}
        onChange={(event) => {
          const next = event.target.value as "en" | "fr" | "ht" | "es";
          startTransition(() => setLanguage(next));
        }}
        aria-label="Select language"
        className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
