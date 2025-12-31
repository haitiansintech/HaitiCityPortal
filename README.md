# Haiti City Portal

Next.js 15 + TypeScript civic portal for reporting issues, exploring municipal data, and launching key resident services.

## Architecture: Headless Multi-Tenant SaaS
This project is a single codebase that serves multiple municipalities. Cities are resolved via subdomain (e.g. `jacmel.portal.ht`). content is isolated by `tenant_id`.

## Getting started

1. Copy the environment template and configure your database and auth credentials:

   ```bash
   cp .env.local.example .env.local
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. **Seed the Test Tenant**:
   You must seed a tenant (e.g., localhost -> "Demo City") to run the app locally.
   ```bash
   npm run db:seed
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

3. Visit [http://localhost:3000](http://localhost:3000) to explore the portal.

### Database Setup

The database schema is managed via Drizzle ORM in `src/db/schema.ts`.

Run the following command to push the schema to your database:

```bash
npm run db:push
```

### Public routes

- `/` — Landing page with hero, quick actions, announcements, and partner CTA
- `/issues` — Public issues list with status badges and database-backed data
- `/issues/new` — Issue submission form (client)
- `/events` — Upcoming events grouped by month with ICS feed (`/api/events/ics`)
- `/map` — MapLibre map consuming `/api/issues.geojson`
- `/data` — Open data gallery (Database or local sample datasets)
- `/tax/lookup` — Parcel/NIF lookup with stub API and bill links (`/tax/bill/[id]`)
- `/title/request/new` — Four-step title verification wizard with confirmation reference
- `/about`, `/privacy`, `/terms` — Static MDX content rendered via lightweight markdown renderer

### API routes

- `/api/events/ics` — ICS calendar export
- `/api/issues.geojson` — GeoJSON feed of recent issues
- `/api/tax/lookup` — Stub lookup endpoint for property tax bills
- `/api/title/requests` — Stub reference generator for title verification

### Tooling

- Tailwind CSS v4 with shadcn/ui components (Button, Card, Input, Label, Textarea)
- Drizzle ORM for database access
- NextAuth for authentication
- MapLibre loaded from CDN for the public map

### Product Spec

See [docs/haiti-city-portal-prd.md](docs/haiti-city-portal-prd.md) for the full PRD and technical specification, including i18n, architecture, and roadmap.


The project ships with responsive navigation, footer, error boundaries, accessibility enhancements, and manifest metadata for PWA support.
