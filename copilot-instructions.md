# Copilot Instructions — Haiti City Portal

Next.js 15 + TypeScript civic portal for Haitian municipalities. One codebase serves multiple cities via subdomain-based multi-tenancy.

## Stack

- **Framework**: Next.js 15 App Router, React 19 RC, TypeScript 5
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"` in globals.css), shadcn/ui components
- **Database**: PostgreSQL 16, Drizzle ORM (`src/db/schema.ts`)
- **Auth**: NextAuth v5 beta (`src/auth.ts`, `src/auth.config.ts`)
- **i18n**: next-intl, 4 locales: `en`, `fr`, `ht` (default), `es`
- **Content**: MDX files in `src/content/`, parsed with gray-matter + react-markdown
- **Maps**: MapLibre GL (client), Leaflet (secondary)

---

## ARCHITECTURE HARD RULES (Never Violate)

1. **Multi-Tenancy**: Every database table (except `tenants`) MUST have a `tenant_id uuid` column. Every query must filter by `tenant_id`. No exceptions.

2. **UUIDs only**: NEVER use integer auto-increment IDs. ALWAYS use `uuid().defaultRandom()` for all primary keys. This supports offline ID generation without collision.

3. **Localization**: NEVER hardcode user-visible strings in components. UI labels go in `messages/{locale}.json` accessed via `getTranslations()` (server) or `useTranslations()` (client). Prose content goes in `src/content/**/*.mdx` files.

4. **Locale prefix**: ALL pages live under `src/app/[locale]/`. Never create routes outside this prefix (except `not-found.tsx` and `error.tsx` which are at the app root by necessity).

5. **Tenant injection via middleware**: The `x-tenant-subdomain` header is written by `src/middleware.ts` and trusted by Server Components. Never accept this header from user-supplied request data.

6. **Typed navigation**: Import `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/navigation` (NOT from `next/link` or `next/navigation`). The exception is `src/app/not-found.tsx` which must use `next/link` because it renders outside the `[locale]` layout.

---

## Content System

### Where content lives

| Type | Location | Used for |
|---|---|---|
| UI labels | `messages/{locale}.json` | Nav, buttons, headings, short strings |
| Service pages | `src/content/services/{slug}.{locale}.mdx` | Service descriptions, steps, fees, documents |
| News articles | `src/content/news/{YYYY-MM-DD-slug}.{locale}.mdx` | News body and metadata |
| Static pages | `src/content/{slug}.{locale}.mdx` | About, privacy, terms, tech |

### Locale file convention

```
{slug}.mdx          → English (always required, used as fallback)
{slug}.fr.mdx       → French
{slug}.ht.mdx       → Haitian Creole
{slug}.es.mdx       → Spanish
```

### Loading content in a page

```tsx
import { loadContent } from "@/lib/content";

const entry = await loadContent("services/trash", locale);
// entry.title — from frontmatter title: or first H1
// entry.body  — markdown body text
// entry.data  — all frontmatter fields
```

### News frontmatter shape

```yaml
---
date: "Feb 12, 2025"
dateISO: "2025-02-12"
title: "Article title"
description: "Short excerpt for cards."
---
Body text here.
```

### Service frontmatter shape

```yaml
---
title: Service Name
description: Short description.
steps:
  - Step one
  - Step two
documents:
  - Required document
fees: Fee description
---
Optional longer body.
```

---

## Database Schema Conventions

- All IDs: `uuid().defaultRandom().primaryKey()`
- All entity tables: add `tenant_id: uuid("tenant_id").references(() => tenants.id).notNull()`
- All tables: add `created_at: timestamp("created_at").defaultNow().notNull()`
- Multilingual text: use JSONB with shape `{ en: "...", fr: "...", ht: "...", es: "..." }`
- Add indexes on `tenant_id` for every entity table

---

## Middleware Behavior

`src/middleware.ts` runs on every request and does three things in order:

1. **Locale detection (next-intl)**: Redirects to locale-prefixed URL if missing. Default locale is `ht`.
2. **Tenant injection**: Extracts subdomain from `Host` header, writes to `x-tenant-subdomain` response header.
3. **Auth guard**: Routes containing `/admin` require a valid NextAuth session. Unauthenticated requests redirect to `/{locale}/login?callbackUrl=...`.

---

## File Naming

- React components: `PascalCase.tsx`
- Utility functions / hooks: `camelCase.ts`
- Route pages: `page.tsx` (Next.js convention)
- Route layouts: `layout.tsx`
- Server actions: `src/app/actions/{name}.ts`

---

## Adding a New Page

1. Create `src/app/[locale]/(public)/your-route/page.tsx`
2. The page receives `params: Promise<{ locale: string }>` — await it to get the locale.
3. Use `getTranslations("Namespace")` for UI strings (add the keys to all four `messages/*.json` first).
4. If the page has prose content, create `src/content/your-slug.mdx` (and locale variants) and use `loadContent()`.
5. Link to the new page using `<Link href="/your-route">` from `@/i18n/navigation`.

---

## Adding a New Service

1. Create `src/content/services/{slug}.mdx` (and `.fr.mdx`, `.ht.mdx`, `.es.mdx`)
2. Create `src/app/[locale]/(public)/services/{slug}/page.tsx` — call `loadContent("services/{slug}", locale)` and pass the result to `<ServiceInfoPage />`.
3. Add a card to `src/app/[locale]/(public)/services/page.tsx`.

---

## Adding a News Article

1. Create `src/content/news/YYYY-MM-DD-{slug}.mdx` with the required frontmatter fields.
2. Create locale variants as needed. The article will appear on the homepage (latest 3) and the `/news` index automatically — no code changes required.

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret for NextAuth |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) |

---

## NPM Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |
| `npm run db:push` | Push schema to database |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Seed demo tenant |
