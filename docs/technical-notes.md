# Technical Notes — Haiti City Portal

This document covers architecture decisions, implementation details, and coding conventions for contributors and maintainers.

---

## Architecture Overview

Haiti City Portal is a **Next.js 15 App Router** application using **React 19 RC** and **TypeScript**. It is a multi-tenant SaaS where one running instance serves all municipalities.

### Tenant resolution

Every HTTP request goes through `src/middleware.ts`:

1. **next-intl middleware** runs first, detecting the locale from the URL or browser headers and redirecting if needed. Default locale is `ht` (Haitian Creole).
2. The subdomain is extracted from the `Host` header using `extractSubdomain()`. `jacmel.portal.ht` → `"jacmel"`. `localhost:3000` → `"demo"`.
3. The subdomain is written to the `x-tenant-subdomain` response header. This header is trusted by all downstream Server Components.
4. The auth guard checks for an active NextAuth session on any path containing `/admin`. Unauthenticated requests are redirected to `/{locale}/login?callbackUrl=...`.

Server Components read the subdomain header:

```ts
import { headers } from "next/headers";
const headersList = await headers();
const subdomain = headersList.get("x-tenant-subdomain") || "demo";
const tenant = await getTenantBySubdomain(subdomain);
```

**Security note**: The `x-tenant-subdomain` header is written by middleware and cannot be spoofed from outside. Do not add any code path that reads this header directly from client-supplied `Request` headers.

---

## Content System

### Three tiers

| Tier | Location | When to use |
|---|---|---|
| Database (Drizzle) | `src/db/schema.ts` | Dynamic data: tenants, users, officials, service requests, payments, events, facilities |
| UI messages | `messages/{locale}.json` | Short UI strings: nav labels, button text, aria labels, form placeholders |
| MDX files | `src/content/**/*.mdx` | Prose: service descriptions, news articles, static pages |

A key migration has already occurred: service descriptions and news articles that were previously stored in JSON message files have been moved to MDX files. Do not add prose content back to `messages/*.json`.

### MDX file loading (`src/lib/content.tsx`)

`loadContent(slug, locale?)` reads the locale-specific file if it exists, falls back to the English base file silently. Results are memoised per `(slug, locale)` pair using `React.cache` so multiple components on the same page do not trigger duplicate disk reads.

`gray-matter` parses YAML frontmatter. The frontmatter data is returned on `entry.data` as a plain object — callers cast it to a typed interface.

`MarkdownRenderer` is a React Server Component that renders the body markdown with `react-markdown`. It applies consistent Tailwind classes to `h2`, `h3`, `p`, `ul`, `ol`, `li`, `strong`, and `a` elements. The `@tailwindcss/typography` plugin is NOT used.

### News article pipeline

`loadNewsItems(locale, limit)` — used by the homepage to load the three most recent articles.
`loadAllNewsItems(locale)` — used by the `/news` index page.
`loadNewsItem(slug, locale)` — used by `/news/[slug]` detail pages.
`getNewsSlugs()` — used by `generateStaticParams` to pre-render all news detail pages at build time.
`getNewsCount()` — used by the homepage to conditionally show the "View All" link (only shown when there are more than 3 articles).

News files are date-prefixed (`YYYY-MM-DD-{slug}.mdx`) so that a `.sort().reverse()` on the filename list produces newest-first order without parsing dates.

---

## Database Schema Design

Full schema: `src/db/schema.ts`.

### Mandatory conventions

1. **UUIDs for all PKs**: `id: uuid("id").defaultRandom().primaryKey()`. This enables offline-generated IDs that will not collide when synced to the server.
2. **tenant_id on every entity table**: `tenant_id: uuid("tenant_id").references(() => tenants.id).notNull()`. Add an index: `tenantIdx: index("table_tenant_idx").on(table.tenant_id)`.
3. **created_at on every table**: `created_at: timestamp("created_at").defaultNow().notNull()`.
4. **JSONB for multilingual text**: Columns that store user-visible text in multiple languages use `jsonb()` with the shape `{ en: string, fr: string, ht: string, es: string }`. This avoids needing separate columns per language and allows adding new locales without a schema migration.

### Schema management

This project uses **Drizzle ORM**. The schema is the source of truth. Changes to `src/db/schema.ts` are applied with:

```bash
npm run db:push      # Directly push schema changes (no migration files — preferred for development)
npm run db:generate  # Generate SQL migration files (for production deployments)
```

Drizzle Studio for visual inspection:

```bash
npm run db:studio
```

---

## Internationalization

Configured in `src/i18n/routing.ts`. Locales: `['en', 'fr', 'ht', 'es']`. Default: `'ht'`.

### Navigation helpers

Import `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/navigation` — NOT from `next/link` or `next/navigation`. This ensures locale prefixes are handled automatically and TypeScript enforces valid route paths.

**Exception**: `src/app/not-found.tsx` must use `next/link` because it is rendered at the app root, outside the `[locale]` layout tree. Using `@/i18n/navigation` here would cause a runtime error.

### Adding a locale

1. Add the locale code to the `locales` array in `src/i18n/routing.ts`.
2. Create `messages/{locale}.json` with all keys translated.
3. For each MDX file in `src/content/`, create a `{slug}.{locale}.mdx` variant.

---

## Authentication

NextAuth v5 (beta) is used. Configuration is split across:

- `src/auth.config.ts` — Safe config (no DB imports) used by the Edge middleware.
- `src/auth.ts` — Full config with the Drizzle adapter, used by the API route handler.
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth route handler.
- `src/app/actions/auth.ts` — Server Actions for sign-in and sign-out.

### Roles

Users have a `role` field: `"user"`, `"admin"`, or `"superadmin"`. Role-based access is enforced in Server Components and Server Actions by checking `session.user.role`.

### Protected routes

Any route path containing `/admin` is protected by the middleware. You can also add per-page protection in `page.tsx` by calling `auth()` from `src/auth.ts` and checking the session.

---

## Payment Flow (Phase 1: Manual Reconciliation)

The current payment implementation does not integrate with a live payment gateway. The flow is:

1. Resident fills out the payment form with amount, type, and contact info.
2. A `payment_records` row is created with `status = "pending_upload"` and a human-readable `generated_memo_code` (e.g. `JAC-TAX-8821`).
3. The resident is shown the memo code and instructed to make the payment via MonCash or wire transfer with that code as the reference.
4. The admin panel lists pending payments; admins can mark payments as verified after manual reconciliation with bank or MonCash statements.

A future phase will integrate MonCash webhooks and Stripe for automated confirmation.

---

## Map Components

Two map libraries are used:

- **MapLibre GL** (`src/components/map/MapView.tsx`) — The primary public-facing map at `/map`. Renders a GeoJSON layer of service requests fetched from `/api/issues.geojson`.
- **Leaflet** (`src/components/ui/Map.tsx`, `src/components/directory/DirectoryMap.tsx`) — Used in the directory and potentially other locations where a simpler map is needed.

Both are client components (`"use client"`) because WebGL/DOM APIs are required.

---

## Middleware Matcher

The middleware matcher (in `src/middleware.ts`) excludes:
- `/api/*` — API routes
- `/_next/static/*` — Static assets
- `/_next/image/*` — Image optimization
- `favicon.ico`, `icon`, `apple-icon`, `manifest` — Static public files

This keeps the middleware lightweight for high-frequency asset requests.

---

## Seeding

`src/db/seed.ts` creates the minimal data needed to run the app locally:

- One `tenants` row with `subdomain = "demo"` and `name = "Demo City"`.

Run it once after initial setup:

```bash
npm run db:seed
```

Debug scripts for tenant resolution are in `src/scripts/`.

---

## Implementation Roadmap

### Completed (current codebase)

- Multi-tenant subdomain routing
- Locale-prefixed routing (4 languages, default `ht`)
- Homepage: hero, quick actions, services, mayor section, latest news
- 8 service detail pages driven by MDX content
- News system: MDX files, locale fallback, homepage feed, full index, detail pages
- Payment infrastructure (Phase 1 manual reconciliation)
- Officials directory with communal section filter
- Facilities directory with map view and suggestion flow
- Admin panel: service requests, finance, emergency alerts, handbook
- Open311-compatible service request form
- Public finance transparency page
- Community fundraising / donate page
- Property tax lookup and title verification (stubs)
- Events with ICS export
- Open data gallery
- Static pages (About, Privacy, Terms, Tech) via MDX

### Planned (not yet implemented)

| Feature | Phase | Notes |
|---|---|---|
| Offline draft mode | Phase 2 | IndexedDB queue, service worker background sync |
| MonCash live integration | Phase 2 | Webhook handler for real-time confirmation |
| Stripe (diaspora payments) | Phase 2 | USD/EUR checkout |
| Blockchain audit trail | Phase 3 | SHA-256 hash on Polygon/Ethereum for finalized records |
| WhatsApp status updates | Phase 3 | Automated localized bot messages |
| PWA manifest + service worker | Phase 2 | Offline caching, installable |
| Portuguese (pt-BR) | Phase 2 | Fifth language |
| GIS property lookup | Phase 3 | OpenStreetMap parcel layer |
| E2E test suite | Ongoing | Playwright for critical flows |
| CI/CD pipeline | Ongoing | GitHub Actions |
