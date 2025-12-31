import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'fr', 'ht', 'es'],

    // Used when no locale matches
    defaultLocale: 'ht'
});

// Typed navigation helpers
export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation(routing);
