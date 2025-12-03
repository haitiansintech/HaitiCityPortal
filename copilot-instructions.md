# Copilot Instructions — Haiti City Portal

Build a Next.js 15 + TypeScript civic MVP with:
- Pages: `/` (landing), `/issues`, `/issues/new`, `/events`, `/map`, `/data`
- Postgres (Drizzle ORM), NextAuth, Object Storage
- MapLibre (client map), next-intl (en/ht/fr/es), Tailwind v4 + shadcn/ui

## First tasks (in order)

1. **Scaffold** `src/` App Router folders and pages above.
2. **Install UI**: Tailwind v4 + shadcn; generate **Button, Card, Input, Label** components.
3. **Database & Auth**: Drizzle setup + NextAuth configuration.
4. **Issues vertical slice**: create/list issues; (phase 2) photo upload + map picker.

---

## Public MVP UI — Codex Tasks (Next 15 · Tailwind v4 · `src/`)

**Assumptions**
- Tailwind v4 is active via `@import "tailwindcss";` in `src/app/globals.css`
- Project uses `src/` layout (paths below reflect that)
- Postgres is connected; Drizzle schema pushed
- `ENABLE_LOCAL_MODE` may be `"true"` locally

---

### P0 — Global Shell (Navbar, Footer, SEO)

**Create**
- `src/components/nav/Navbar.tsx`
- `src/components/nav/LocaleSwitcher.tsx` (stub EN/HT/FR/ES; no i18n wiring yet)
- `src/components/layout/Footer.tsx`
- Update `src/app/layout.tsx` to include `<Navbar/>` (sticky) and `<Footer/>`
- Export `metadata` (title, description, openGraph basic) in `src/app/layout.tsx`

**Navbar**
- Left: brand **Haiti City Portal** → `/`
- Center (md+): links → `/issues`, `/events`, `/map`, `/data`, `/tax/lookup`, `/title/request/new`
- Right: **Login** → `/login`
- Mobile: hamburger → slide-over with the same links

**Footer**
- Columns: About, Contact, Open Data, Terms/Privacy (link to pages below)
- Language switcher (nonfunctional), copyright

**Acceptance**
- Shell renders on all pages, responsive, no layout shift (CLS)

**Seed** — `src/components/nav/Navbar.tsx`
```tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/issues", label: "Issues" },
    { href: "/events", label: "Events" },
    { href: "/map", label: "Map" },
    { href: "/data", label: "Data" },
    { href: "/tax/lookup", label: "Taxes" },
    { href: "/title/request/new", label: "Title" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-black/80 text-white backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-semibold">Haiti City Portal</Link>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>☰</button>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map(l => (
            <li key={l.href}><Link className="hover:underline" href={l.href}>{l.label}</Link></li>
          ))}
          <li><Link href="/login" className="rounded bg-white px-3 py-1 text-black">Login</Link></li>
        </ul>
      </nav>
      {open && (
        <div className="px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map(l => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
            <li><Link href="/login" className="inline-block rounded bg-white px-3 py-1 text-black">Login</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
```
P1 — Landing Page (Public)

Create

src/app/(public)/page.tsx

Sections

Hero: headline, subcopy, buttons

Primary → /issues/new

Secondary → /services (stub)

Quick Actions grid (6 cards): Report Issue · Check Events · Open Map · Open Data · Pay Property Tax · Title Verification

Announcements (0–3 items, static)

Stats strip (static numbers)

Municipality CTA → /contact (stub)

Acceptance

Buttons navigate; responsive (1-col mobile / 2–3 cols desktop)

Lighthouse Performance ≥ 90 locally

Seed — src/app/(public)/page.tsx

```tsx
export default function HomePage() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold">Local services, all in one place.</h1>
        <p className="mt-4 text-lg text-gray-300">Report issues, see events, explore maps, pay taxes, request title verification.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/issues/new" className="rounded bg-white px-4 py-2 text-black">Report an issue</a>
          <a href="/services" className="rounded border px-4 py-2">View services</a>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/issues/new", label: "Report Issue" },
          { href: "/events", label: "Check Events" },
          { href: "/map", label: "Open Map" },
          { href: "/data", label: "Open Data" },
          { href: "/tax/lookup", label: "Pay Property Tax" },
          { href: "/title/request/new", label: "Title Verification" },
        ].map(a => (
          <a key={a.href} href={a.href} className="rounded border p-4 hover:bg-white/5">
            <div className="text-lg font-medium">{a.label}</div>
            <div className="text-sm text-gray-400">Learn more →</div>
          </a>
        ))}
      </section>
    </main>
  );
}
```
P2 — Issues List (Public)

Create

src/app/(public)/issues/page.tsx

Behavior

Server component: fetch last 20 issues from Supabase

Cards: title, 2-line description, status badge, created_at

“Report an issue” → /issues/new

Acceptance

Renders without login; empty state handled

Seed

```tsx
import Link from "next/link";
import { db } from "@/db";
import { issues } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function IssuesListPage() {
  const allIssues = await db.query.issues.findMany({
    orderBy: [desc(issues.createdAt)],
    limit: 20,
  });

  // if (error) return <div className="p-6">Error: {error.message}</div>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Issues</h1>
        <Link className="underline" href="/issues/new">Report an issue →</Link>
      </div>
      <ul className="space-y-3">
        {(allIssues ?? []).map((i: any) => (
          <li key={i.id} className="rounded border p-4">
            <div className="font-medium">{i.title}</div>
            {i.description && <div className="mt-1 line-clamp-2 text-sm text-gray-400">{i.description}</div>}
            <div className="mt-2 text-xs opacity-70">{new Date(i.createdAt).toLocaleString()} • {i.status}</div>
          </li>
        ))}
        {(!allIssues || allIssues.length === 0) && <li className="text-sm text-gray-400">No issues yet.</li>}
      </ul>
    </div>
  );
}
```
P3 — Events List + ICS (Public)

Create

src/app/(public)/events/page.tsx

src/app/api/events/ics/route.ts (serve minimal .ics from DB or sample if ENABLE_LOCAL_MODE="true")

Acceptance

Events render grouped by month; /api/events/ics downloads an ICS file

Seed — src/app/api/events/ics/route.ts
```tsx
export const dynamic = "force-static";
export async function GET() {
  const now = new Date();
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Haiti City Portal//Events//EN",
    "BEGIN:VEVENT",
    "UID:sample-1@haiticityportal",
    `DTSTAMP:${now.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    "SUMMARY:Town Hall Meeting",
    "DTSTART:20251101T230000Z",
    "DTEND:20251102T000000Z",
    "LOCATION:City Hall",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "attachment; filename=haiti-city-events.ics",
    },
  });
}
```

P4 — Public Map (Issues Layer)

Create

src/components/map/MapView.tsx (client)

src/app/(public)/map/page.tsx

src/app/api/issues.geojson/route.ts (GeoJSON wrapper for recent issues)

Behavior

MapLibre GL map centered near Port-au-Prince (~18.54, -72.34)

Fetch /api/issues.geojson and render points; cluster optional

Acceptance

Map loads; clicking a point shows title

Seed — src/app/api/issues.geojson/route.ts
```tsx
import { db } from "@/db";

export async function GET() {
  const data = await db.query.issues.findMany({
    columns: {
      id: true,
      title: true,
      latitude: true,
      longitude: true,
      createdAt: true,
    },
    limit: 200,
  });

  const fc = {
    type: "FeatureCollection",
    features: (data ?? [])
      .filter((i: any) => typeof i.latitude === "number" && typeof i.longitude === "number")
      .map((i: any) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [i.longitude, i.latitude] },
        properties: { id: i.id, title: i.title, created_at: i.createdAt },
      })),
  };

  return Response.json(fc);
}
```

P5 — Open Data Gallery (Public)

Create

src/app/(public)/data/page.tsx

src/components/data/DatasetCard.tsx

Behavior

Grid of datasets (title, category, download button). If DB empty and ENABLE_LOCAL_MODE="true", render 6 placeholders.

Acceptance

Responsive grid; downloads work for real URLs

P6 — Tax Lookup (Public Start)

Create

src/app/(public)/tax/lookup/page.tsx

src/app/api/tax/lookup/route.ts (stub: returns sample bills unless production mode)

UI

Radio to select search by Parcel ID or NIF; single input; Submit

Results link to /tax/bill/[id] (create route that says “Coming soon”)

Acceptance

Validates empty input; renders sample list without login

P7 — Title Verification Wizard (Public Start)

Create

src/app/(public)/title/request/new/page.tsx

src/app/api/title/requests/route.ts (stub returns { reference: "HT-REQ-2025-0001" })

UI

4 steps: requester info → property info → purpose → review/submit

After submit, show confirmation with reference; “Track status” (not implemented)

Acceptance

Stepper works forward/back; confirmation shows reference

P8 — Content Pages (Public)

Create

MDX content: src/content/about.mdx, src/content/privacy.mdx, src/content/terms.mdx

Routes: src/app/(public)/about/page.tsx, src/app/(public)/privacy/page.tsx, src/app/(public)/terms/page.tsx (render MDX via next-mdx-remote/rsc or simple renderer)

Acceptance

Footer links open these pages; content renders

P9 — 404 & Error Boundaries

Create

src/app/not-found.tsx

src/app/error.tsx (client with reset button)

Acceptance

Unknown route → 404 page

Throw in a page → error boundary shows with reset

P10 — Visual Polish & A11y

Do

Focus outlines for links/buttons

Ensure color contrast AA

aria-labels for nav/menu/map controls

Add public/favicon.ico and public/manifest.json

Acceptance

Keyboard tabbing is sensible on landing and issues/events pages

No missing alt attributes on images/icons

Commit Checklist

 Scaffolded src/ folders and pages for /, /issues, /issues/new, /events, /map, /data

 Installed Tailwind v4 + shadcn/ui; generated Button, Card, Input, Label

 Added Drizzle setup + NextAuth configuration

 Implemented Issues create/list; (phase 2) photo + map picker

 Global shell with Navbar + Footer; responsive, no CLS

 Landing page (hero, quick actions, announcements, stats, CTA)

 Public issues list with “Report an issue” link

 Events list + ICS download

 Public map (MapLibre) pulling /api/issues.geojson

 Open Data gallery

 Tax lookup (parcel/NIF) stub + links to bill route

 Title verification wizard stub + reference confirmation

 Content pages (About/Privacy/Terms) via MDX

 404 and error boundaries

 Visual polish & a11y (focus, contrast, aria), favicon, manifest

README — Public Routes (quick start)

/ — Landing: hero, quick actions, announcements, stats

/issues — Public list of reported issues; “Report an issue”

/issues/new — Issue form (later: photo + map picker)

/events — Upcoming events; ICS feed at /api/events/ics

/map — Interactive map (MapLibre) with issues layer

/data — Open data gallery (datasets)

/tax/lookup — Start property tax lookup (parcel or NIF) → bills

/title/request/new — Start title verification request (multi-step)


---
