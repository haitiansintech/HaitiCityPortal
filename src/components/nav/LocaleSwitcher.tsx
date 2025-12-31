"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname, routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as any;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-gray-600">
      <span className="hidden sm:inline">Language</span>
      <select
        defaultValue={locale}
        onChange={onSelectChange}
        aria-label="Select language"
        className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        disabled={isPending}
      >
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {cur === 'ht' ? 'Kreyòl' : cur === 'fr' ? 'Français' : cur === 'es' ? 'Español' : 'English'}
          </option>
        ))}
      </select>
    </label>
  );
}
