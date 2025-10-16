# Haiti City Portal

Next.js 15 + TypeScript civic portal for reporting issues, exploring municipal data, and launching key resident services.

## Getting started

1. Copy the environment template and fill in your Supabase credentials:

   ```bash
   cp .env.local.example .env.local
   ```

2. Install dependencies and run the development server:

   ```bash
   npm install
   npm run dev
   ```

3. Visit [http://localhost:3000](http://localhost:3000) to explore the portal.

### Supabase setup

Create the following tables in Supabase (simplified schema):

- `issues`: `id uuid`, `title text`, `description text`, `status text`, `latitude float8`, `longitude float8`, `contact_email text`, `created_at timestamptz default now()`
- `events`: `id uuid`, `title text`, `description text`, `start_time timestamptz`, `end_time timestamptz`, `location text`
- `datasets`: `id uuid`, `title text`, `description text`, `category text`, `download_url text`

Row Level Security (RLS) can allow public read access for the civic pages while protecting inserts/updates with policies as needed.

### Public routes

- `/` — Landing page with hero, quick actions, announcements, and partner CTA
- `/issues` — Public issues list with status badges and Supabase-backed data
- `/issues/new` — Issue submission form (client) with Supabase insert
- `/events` — Upcoming events grouped by month with ICS feed (`/api/events/ics`)
- `/map` — MapLibre map consuming `/api/issues.geojson`
- `/data` — Open data gallery (Supabase or local sample datasets)
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
- Supabase server & browser clients in `src/lib/supabase`
- MapLibre loaded from CDN for the public map

The project ships with responsive navigation, footer, error boundaries, accessibility enhancements, and manifest metadata for PWA support.
