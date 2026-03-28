# Haiti City Portal

Next.js 15 + TypeScript civic portal for Haitian municipalities. Residents can report issues, access municipal services, pay fees, view officials, find facilities, and read local news — all in four languages.

## Architecture: Headless Multi-Tenant SaaS

One codebase serves multiple municipalities. Cities are identified by subdomain (e.g. `jacmel.portal.ht`). The middleware extracts the subdomain from the `Host` header, injects it as the `x-tenant-subdomain` request header, and every downstream Server Component reads that header to scope all database queries by `tenant_id`.

## Getting Started

### 1. Start the local database

```bash
docker compose up -d
```

This starts a Postgres 16 container on port 5432 (user: `postgres`, password: `password`, db: `haiticityportal`).

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.

### 3. Install dependencies

```bash
npm install
```

### 4. Push the schema and seed the demo tenant

```bash
npm run db:push   # Apply the Drizzle schema to Postgres
npm run db:seed   # Create the "demo" localhost tenant
```

You must seed at least one tenant — without it the homepage cannot resolve a city.

### 5. Run the dev server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). The app defaults to the Haitian Creole locale (`/ht/`).

---

## Project Structure

```
haiticityportal/
├── src/
│   ├── app/
│   │   ├── [locale]/               # All locale-prefixed routes
│   │   │   ├── layout.tsx          # Per-locale layout (intl provider, navbar, footer)
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── (public)/           # Public routes (no auth required)
│   │   │   │   ├── about/          # About pages + sub-pages (impact, roadmap, tech)
│   │   │   │   ├── contact/        # Contact form
│   │   │   │   ├── contribute/     # Open-source contribution page
│   │   │   │   ├── data/           # Open data gallery
│   │   │   │   ├── directory/      # Facilities directory with map
│   │   │   │   ├── donate/         # Community fundraising projects
│   │   │   │   ├── events/         # City events listing
│   │   │   │   ├── government/     # City council page
│   │   │   │   ├── login/          # Auth login page
│   │   │   │   ├── map/            # MapLibre issues map
│   │   │   │   ├── news/           # News index + [slug] detail pages
│   │   │   │   ├── officials/      # Elected officials directory
│   │   │   │   ├── pay/            # Payment hub (MonCash, wire transfer)
│   │   │   │   ├── plan-site/      # HTML sitemap
│   │   │   │   ├── privacy/        # Privacy policy (MDX)
│   │   │   │   ├── report/         # Issue/service request form
│   │   │   │   ├── services/       # Services index + 8 detail pages
│   │   │   │   ├── tax/            # Property tax lookup + bill
│   │   │   │   ├── terms/          # Terms of service (MDX)
│   │   │   │   ├── title/          # Title verification wizard
│   │   │   │   └── transparency/   # Public finance transparency
│   │   │   └── (protected)/        # Admin-only routes (require session)
│   │   │       └── admin/          # Admin dashboard, requests, finance
│   │   ├── actions/                # Next.js Server Actions
│   │   ├── api/                    # API route handlers
│   │   │   ├── auth/[...nextauth]/ # NextAuth handler
│   │   │   ├── events/ics/         # ICS calendar export
│   │   │   ├── health/             # Health-check endpoint
│   │   │   ├── issues.geojson/     # GeoJSON feed for map
│   │   │   ├── tax/lookup/         # Property tax lookup stub
│   │   │   └── title/requests/     # Title verification stub
│   │   ├── not-found.tsx           # 404 page (uses next/link — outside [locale] layout)
│   │   ├── error.tsx               # Global error boundary
│   │   ├── layout.tsx              # Root layout
│   │   ├── robots.ts               # robots.txt generation
│   │   └── sitemap.ts              # sitemap.xml generation
│   ├── components/
│   │   ├── admin/                  # Admin-panel components
│   │   ├── auth/                   # LoginForm, LogoutButton
│   │   ├── common/                 # BilingualGuide
│   │   ├── data/                   # DatasetCard
│   │   ├── directory/              # DirectoryClient, DirectoryMap, SuggestionModal
│   │   ├── donation/               # ProjectCard
│   │   ├── forms/                  # ServiceRequestForm
│   │   ├── layout/                 # Footer, InfoLayout
│   │   ├── map/                    # MapView (MapLibre client component)
│   │   ├── nav/                    # Navbar, LocaleSwitcher
│   │   ├── officials/              # SectionFilter
│   │   ├── payments/               # PaymentSearchAndList, WireForm
│   │   ├── providers/              # ClientIntlProvider, LanguageProvider, TenantProvider
│   │   ├── services/               # TowingLookup
│   │   └── ui/                     # shadcn/ui components + custom UI primitives
│   ├── content/                    # MDX prose content (see "Content Architecture" below)
│   │   ├── news/                   # News articles
│   │   └── services/               # Service description pages
│   ├── db/
│   │   ├── index.ts                # Drizzle client
│   │   ├── schema.ts               # Full database schema (see "Database Schema" below)
│   │   ├── schema_open311.ts       # Open311 type definitions
│   │   └── seed.ts                 # Demo tenant seed script
│   ├── features/
│   │   ├── auth/                   # SignIn, SignUp components
│   │   ├── incidents/              # IncidentList, IncidentDetail
│   │   └── reports/                # ReportForm
│   ├── hooks/                      # use-toast
│   ├── i18n/
│   │   ├── routing.ts              # Locale list, defaultLocale config
│   │   ├── request.ts              # Server-side locale detection
│   │   └── navigation.ts           # Typed Link / redirect / useRouter exports
│   ├── lib/
│   │   ├── content.tsx             # MDX loading utilities + MarkdownRenderer
│   │   ├── tenants.ts              # getTenantBySubdomain()
│   │   └── utils.ts                # cn() and shared helpers
│   ├── middleware.ts               # Locale detection + auth guard + tenant injection
│   ├── scripts/                    # Dev/debug scripts
│   └── utils/
│       └── validators.ts
├── messages/                       # next-intl translation JSON files
│   ├── en.json
│   ├── fr.json
│   ├── ht.json
│   └── es.json
├── docs/                           # Architecture and contributor docs
├── docker-compose.yml              # Local Postgres
├── drizzle.config.ts               # Drizzle ORM config
└── next.config.ts
```

---

## Content Architecture

All prose content (service descriptions, news articles, legal pages) lives in **MDX files** under `src/content/`. UI labels (button text, nav labels, page titles, short strings) live in **`messages/*.json`**.

### File naming convention

```
src/content/{slug}.mdx            → English (default / fallback)
src/content/{slug}.fr.mdx         → French
src/content/{slug}.ht.mdx         → Haitian Creole
src/content/{slug}.es.mdx         → Spanish
```

Slugs may include subdirectories: `services/birth-certificates`, `news/2025-02-12-hurricane-season`.

### Service pages (`src/content/services/`)

Eight services, each with four locale files:

| Service | Slug |
|---|---|
| Archives & Birth Certificates | `birth-certificates` |
| Environmental Cleanup | `cleanup` |
| Culture & Recreation | `culture` |
| Government Guide | `governance` |
| National ID (CIN) | `national-id` |
| Business Permits | `permits` |
| Vehicle Towing | `towing` |
| Trash Collection | `trash` |

Each file uses YAML frontmatter to carry structured data consumed directly by the `ServiceInfoPage` component:

```yaml
---
title: Archives & Birth Certificates
description: Short description shown in the card.
steps:
  - Step one text
  - Step two text
documents:
  - Required document
fees: Fee description string
---

Optional longer markdown body rendered below the structured section.
```

### News articles (`src/content/news/`)

Files are date-prefixed for automatic newest-first sorting: `YYYY-MM-DD-{slug}.mdx`.

```yaml
---
date: "Feb 12, 2025"
dateISO: "2025-02-12"
title: "Article title"
description: "Short excerpt shown on homepage and news index."
---

Full article body in Markdown.
```

### Static pages

`about`, `privacy`, `terms`, and `tech` each have four locale files at the root of `src/content/`.

### Loading utilities (`src/lib/content.tsx`)

| Export | Purpose |
|---|---|
| `loadContent(slug, locale?)` | Load any MDX file with locale fallback |
| `loadNewsItems(locale?, limit?)` | Load N newest news articles (default 3, used on homepage) |
| `loadAllNewsItems(locale?)` | Load all news articles (used on `/news` index page) |
| `loadNewsItem(slug, locale?)` | Load a single news article by slug |
| `getNewsSlugs()` | Returns all slugs — used by `generateStaticParams` |
| `getNewsCount()` | Returns total article count — used by homepage "View All" link |
| `MarkdownRenderer` | React component to render a markdown string with consistent Tailwind styling |

All functions are memoised with `React.cache` and fall back to English when a locale file is absent.

---

## Internationalization

**Supported locales:** `en` (English), `fr` (French), `ht` (Haitian Creole), `es` (Spanish)

**Default locale:** `ht` (Haitian Creole) — the mother tongue of ~95% of Haiti's population.

All routes are prefixed: `/ht/services`, `/fr/pay`, `/en/report`, etc. The middleware (`src/middleware.ts`) detects the locale from the URL and redirects bare paths automatically.

### Translation files

`messages/{locale}.json` contains only UI labels — nav links, button text, page section headings, short form labels. No prose content belongs here.

To add a new UI string:
1. Add the key and English value to `messages/en.json`
2. Add the translated value to `messages/fr.json`, `messages/ht.json`, and `messages/es.json`
3. Use `const t = await getTranslations("Namespace")` in a Server Component, or `const t = useTranslations("Namespace")` in a Client Component.

### MDX content

For prose pages, create the four locale files in `src/content/`. The system falls back to English automatically if a translation file is missing, so you can ship English first and add translations incrementally.

---

## Database

The schema is defined in `src/db/schema.ts` using Drizzle ORM. Key tables:

| Table | Description |
|---|---|
| `tenants` | Municipality records. Each row has a `subdomain` that drives routing. |
| `users` | Residents and admins, scoped to a `tenant_id`. |
| `services` | Service catalogue per tenant (JSONB multilingual fields). |
| `service_requests` | Open311-compatible civic issue/request submissions. |
| `payment_records` | Payment attempts (MonCash, wire transfer) with memo code for reconciliation. |
| `events` | City events. |
| `officials` | Elected officials (CASEC, ASEC, Mayor, Town Delegates). |
| `communal_sections` | Sub-municipal geographic units. |
| `facilities` | Schools, hospitals, police stations, etc. with GPS coordinates. |
| `datasets` | Open data downloads. |
| `projects` | Community fundraising projects. |
| `handbook_articles` | Admin governance handbook with role-based access. |
| `emergency_alerts` | Tenant-scoped emergency alerts. |
| `audit_snapshots` | Finance audit trail snapshots. |

**Schema rules:**
- Every entity table has a `tenant_id` UUID foreign key. All queries must filter by it.
- All primary keys are `uuid().defaultRandom()` — no integer auto-increment.
- Multilingual text fields use JSONB with shape `{ en: "...", fr: "...", ht: "...", es: "..." }`.

### npm scripts

| Script | Description |
|---|---|
| `npm run db:push` | Push Drizzle schema to the database (no migration files) |
| `npm run db:generate` | Generate SQL migration files |
| `npm run db:studio` | Open Drizzle Studio at `https://local.drizzle.studio` |
| `npm run db:seed` | Seed the demo tenant (localhost → "Demo City") |

---

## Authentication

NextAuth v5 (beta) is configured in `src/auth.ts` and `src/auth.config.ts`. The middleware protects any route containing `/admin` — unauthenticated requests are redirected to the locale-aware `/login` page with a `callbackUrl`.

Roles: `user`, `admin`, `superadmin`.

---

## Tooling

| Tool | Purpose |
|---|---|
| Next.js 15 + Turbopack | Framework + fast dev builds |
| React 19 RC | UI runtime |
| TypeScript 5 | Type checking |
| Tailwind CSS v4 | Styling (CSS-first config via `@import "tailwindcss"`) |
| shadcn/ui | Accessible UI primitives (Button, Card, Dialog, Input, Label, Select, Tabs, etc.) |
| Drizzle ORM | Type-safe database access |
| PostgreSQL 16 | Database (Docker locally, managed Postgres in production) |
| NextAuth v5 | Authentication |
| next-intl | Internationalization |
| gray-matter | YAML frontmatter parsing for MDX content |
| react-markdown | Markdown body rendering |
| MapLibre GL | Interactive map (client-side) |
| Leaflet | Secondary map component |
| Zod | Schema validation |
| bcryptjs | Password hashing |
| Lucide React | Icon set |

---

## API Routes

| Route | Description |
|---|---|
| `GET /api/health` | Health check |
| `GET /api/events/ics` | ICS calendar export |
| `GET /api/issues.geojson` | GeoJSON feed of recent service requests (for map) |
| `GET /api/tax/lookup` | Property tax lookup stub |
| `POST /api/title/requests` | Title verification reference generator stub |
| `/api/auth/[...nextauth]` | NextAuth authentication handler |

---

## Public Routes

All routes are locale-prefixed. Example: `/ht/services`, `/en/news/2025-02-12-hurricane-season`.

| Route | Description |
|---|---|
| `/` | Homepage: hero, quick actions, services grid, mayor, latest news |
| `/services` | Services directory |
| `/services/[service]` | Service detail page (content from MDX) |
| `/news` | All news articles |
| `/news/[slug]` | News article detail |
| `/report` | Service request / issue reporting form |
| `/pay` | Payment hub |
| `/pay/moncash` | MonCash payment flow |
| `/pay/wire` | Wire transfer form |
| `/pay/history` | Payment history |
| `/pay/quittance/[id]` | Payment receipt |
| `/officials` | Elected officials directory |
| `/directory` | Facilities directory (hospitals, schools, etc.) |
| `/directory/[id]` | Facility detail |
| `/events` | City events |
| `/map` | MapLibre map of issues |
| `/data` | Open data gallery |
| `/donate` | Community fundraising projects |
| `/tax/lookup` | Property tax lookup |
| `/tax/bill/[id]` | Tax bill detail |
| `/title/request/new` | Title verification wizard |
| `/transparency` | Public finance transparency |
| `/government/city-council` | City council page |
| `/contact` | Contact form |
| `/about` | About page (and sub-pages: `/impact`, `/roadmap`, `/tech`) |
| `/contribute` | Open-source contribution info |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/plan-site` | HTML sitemap |
| `/login` | Authentication |

---

## Further Documentation

- [docs/haiti-city-portal-prd.md](docs/haiti-city-portal-prd.md) — Product Requirements Document
- [docs/technical-notes.md](docs/technical-notes.md) — Architecture deep-dives and implementation roadmap
- [docs/BRANCH_PROTECTION.md](docs/BRANCH_PROTECTION.md) — GitHub branch protection setup
- [CONTRIBUTING.md](CONTRIBUTING.md) — Contribution guidelines
- [SECURITY.md](SECURITY.md) — Security policy and vulnerability reporting
