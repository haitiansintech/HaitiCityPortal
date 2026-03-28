# Haiti City Portal — Product Requirements Document

Version 2.1 (Current Implementation)

---

## 1. Overview

Haiti City Portal (HCP) is a multi-tenant, multilingual SaaS platform that modernises local governance in Haiti. A single codebase and database serves multiple municipalities, each identified by subdomain (e.g. `jacmel.portal.ht`, `cap.portal.ht`). Citizens can access services, pay fees, report issues, find officials, and read local news. Municipal admins manage their city's data through a protected admin panel.

---

## 2. Architecture

**Type**: Multi-Tenant SaaS (Next.js App Router, headless)

**Tenant Resolution**: Middleware reads the `Host` header, extracts the subdomain (e.g. `jacmel` from `jacmel.portal.ht`), and injects it as the `x-tenant-subdomain` header. Server Components read this header to scope all database queries.

**Data Isolation**: Every entity table in the database carries a `tenant_id` UUID foreign key. All queries must filter by `tenant_id`.

**Content Strategy**:
- **Database**: Dynamic data — tenants, officials, service requests, payments, events, facilities, projects, handbook articles, emergency alerts.
- **`messages/*.json`**: UI labels — nav links, button text, section headings, short strings. Managed by `next-intl`.
- **`src/content/**/*.mdx`**: Prose content — service descriptions, news articles, static pages (About, Privacy, Terms). Parsed at request time by `gray-matter` + `react-markdown`.

**Routing**: All user-facing pages live under `src/app/[locale]/` and are locale-prefixed in the URL.

---

## 3. Target Users

| User Type | Description |
|---|---|
| Haitian Citizens | Primary users: residents who access services, pay fees, report issues |
| Haitian Diaspora | Secondary users: overseas residents who support municipalities financially |
| Municipal Officials | Admin panel users: CASEC, ASEC, Mayor staff, finance admins |
| Open-Source Contributors | Developers contributing features or translations |

---

## 4. Implemented Features (Current State)

### Citizen-Facing

| Feature | Route | Implementation |
|---|---|---|
| Homepage | `/` | Hero, quick actions, services grid, mayor section, latest 3 news |
| Services directory | `/services` | Grid of 8 service cards |
| Service detail pages | `/services/[service]` | MDX-driven: steps, required documents, fees |
| News index | `/news` | All articles, newest-first, loaded from MDX |
| News detail | `/news/[slug]` | Full article with locale fallback |
| Issue / service request | `/report` | Open311-compatible form, saved to DB |
| Payment hub | `/pay` | Route selection (MonCash, wire transfer) |
| MonCash payment | `/pay/moncash` | MonCash flow |
| Wire transfer | `/pay/wire` | Wire form with memo code |
| Payment history | `/pay/history` | Past payment records |
| Payment receipt | `/pay/quittance/[id]` | Quittance detail |
| Officials directory | `/officials` | Filterable by communal section |
| Facilities directory | `/directory` | Searchable list + map |
| Events | `/events` | City events listing |
| Interactive map | `/map` | MapLibre GL, issues layer |
| Open data | `/data` | Dataset cards with download links |
| Community fundraising | `/donate` | Project fundraising cards |
| Property tax lookup | `/tax/lookup` | Parcel / NIF lookup (stub) |
| Tax bill | `/tax/bill/[id]` | Bill detail |
| Title verification | `/title/request/new` | Multi-step wizard (stub reference) |
| Public finance | `/transparency` | Public ledger of payments |
| City council | `/government/city-council` | Council member listing |
| Contact | `/contact` | Contact form |
| About | `/about` | Static page + sub-pages (impact, roadmap, tech) |
| Contribute | `/contribute` | Open-source contribution info |
| Privacy policy | `/privacy` | MDX content |
| Terms of service | `/terms` | MDX content |
| Sitemap | `/plan-site` | HTML sitemap |
| Login | `/login` | NextAuth credentials |

### Admin Panel (Protected: `/[locale]/(protected)/admin/`)

| Feature | Route |
|---|---|
| Dashboard | `/admin` |
| Service request management | `/admin/requests` |
| Request detail + status update | `/admin/requests/[id]` |
| Finance overview | `/admin/finance` |

### Top-Level Admin (Protected: `/[locale]/admin/`)

| Feature | Route |
|---|---|
| Emergency alerts | `/admin/emergency` |
| Field reports | `/admin/field-reports` |
| Finance audit review | `/admin/finance/audit-review` |
| Governance handbook | `/admin/handbook` |
| Handbook editor | `/admin/handbook/editor` |
| Communal section detail | `/admin/sections/[id]` |

### API Routes

| Route | Method | Description |
|---|---|---|
| `/api/health` | GET | Health check |
| `/api/auth/[...nextauth]` | ALL | NextAuth handler |
| `/api/events/ics` | GET | ICS calendar export |
| `/api/issues.geojson` | GET | GeoJSON service requests for map |
| `/api/tax/lookup` | GET | Tax lookup stub |
| `/api/title/requests` | POST | Title reference generator stub |

---

## 5. Localization

**Languages**: English (`en`), French (`fr`), Haitian Creole (`ht`), Spanish (`es`)

**Default locale**: `ht` — Haitian Creole is the mother tongue of ~95% of Haiti's population. French is the official written government language. English serves the diaspora and NGOs. Spanish provides cross-border accessibility.

**Architecture**:
- `messages/{locale}.json` — UI strings only. Managed by next-intl.
- `src/content/**/*.{locale}.mdx` — Prose content per locale. Falls back to English silently.
- Database JSONB fields — Dynamic multilingual content with shape `{ en, fr, ht, es }`.

---

## 6. Database Schema

Defined in `src/db/schema.ts`. Key tables:

| Table | Purpose |
|---|---|
| `tenants` | Municipality registry; `subdomain` drives routing |
| `users` | Residents and admins, scoped to a tenant |
| `services` | Service catalogue (JSONB multilingual names/descriptions) |
| `service_definitions` | Dynamic form attribute definitions per service |
| `service_requests` | Open311-compatible citizen request submissions |
| `service_attributes` | Attribute values for a given service request |
| `payment_records` | Payment attempts with memo code for manual reconciliation |
| `events` | City events |
| `communal_sections` | Sub-municipal geographic units |
| `officials` | Elected officials with role, section, WhatsApp, Vwa profile |
| `facilities` | Hospitals, schools, police stations — with GPS coordinates |
| `facility_suggestions` | Resident-submitted corrections to facility records |
| `datasets` | Open data downloadable files |
| `projects` | Community fundraising projects |
| `handbook_articles` | Governance handbook articles with role-based visibility |
| `handbook_reads` | Read tracking per user/article |
| `emergency_alerts` | Tenant-scoped emergency broadcasts |
| `audit_snapshots` | Finance audit trail |

**Schema rules (mandatory)**:
1. All PKs: `uuid().defaultRandom()` — no integers.
2. All entity tables: `tenant_id` UUID FK not null.
3. All tables: `created_at` timestamp.
4. Multilingual text: JSONB `{ en, fr, ht, es }`.

---

## 7. Multi-Tenant Routing

```
jacmel.portal.ht  →  subdomain = "jacmel"  →  tenant row where subdomain = "jacmel"
localhost:3000    →  subdomain = "demo"    →  tenant row where subdomain = "demo"
```

The middleware (`src/middleware.ts`) extracts the subdomain and writes it to the `x-tenant-subdomain` response header. Server Components call `getTenantBySubdomain(subdomain)` from `src/lib/tenants.ts` to get the full tenant record.

---

## 8. Security

- Admin routes (`/admin`) are protected by the NextAuth middleware guard.
- `x-tenant-subdomain` is set server-side in middleware and must never be accepted from external request headers.
- All database queries must include a `tenant_id` filter to prevent cross-tenant data leaks.
- All passwords are hashed with bcryptjs.
- See [SECURITY.md](../SECURITY.md) for vulnerability reporting.

---

## 9. Planned / Future Features

These items are not yet implemented but are planned:

| Feature | Notes |
|---|---|
| Offline draft mode | IndexedDB queue + service worker sync for form submissions |
| Blockchain audit trail | SHA-256 hash of finalized records anchored to Polygon/Ethereum |
| WhatsApp integration | Automated status updates via localized WhatsApp bots |
| MonCash webhook | Real-time payment confirmation (currently manual reconciliation) |
| Stripe integration | USD/EUR payments for diaspora |
| PWA manifest + service worker | Installable, cacheable for low-bandwidth use |
| Portuguese (pt-BR) | Fifth language for cross-Caribbean accessibility |
| GIS property lookup | OpenStreetMap parcel layer |
| SMS fallback | For extended offline periods |

---

## 10. Licensing

Business Source License 1.1 (BSL 1.1). Converts to Apache 2.0 on December 31, 2028. See [LICENSE.md](../LICENSE.md) for full terms.

Commercial use (including AI training) requires written permission from the project maintainers. Contact: licensing@haiticity.org.
