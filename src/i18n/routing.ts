/**
 * next-intl routing configuration.
 *
 * Defines the supported locales and default locale for all locale-prefixed
 * routes in the application (e.g. /ht/services, /fr/pay, /en/report).
 * This config is consumed by:
 *  - src/middleware.ts  — to detect and redirect to the correct locale
 *  - src/app/[locale]/layout.tsx — to validate the locale param at render time
 *  - Navigation helpers exported below — for type-safe locale-aware <Link>s
 */

import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // The four supported locales in order of prominence.
    // en  = English        (international diaspora, NGOs)
    // fr  = French         (official government language of Haiti)
    // ht  = Haitian Creole (Kreyòl — the primary spoken language of ~95% of the population)
    // es  = Spanish        (cross-border and regional accessibility)
    locales: ['en', 'fr', 'ht', 'es'],

    // Haitian Creole ('ht') is the defaultLocale because it is the mother
    // tongue of the vast majority of Haitian citizens. Setting it as the
    // default ensures that users who arrive without an explicit locale prefix
    // (or whose browser language is not in the supported list) see content in
    // the most accessible language rather than defaulting to colonial French
    // or English.
    defaultLocale: 'ht'
});

// Typed navigation helpers — use these instead of Next.js's built-in Link,
// redirect, usePathname, and useRouter so that locale prefixes are handled
// automatically and TypeScript can enforce valid route paths.
export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation(routing);
