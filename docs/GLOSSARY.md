<!--
Languages: English (this file) | Français (GLOSSARY.fr.md) | Kreyòl (GLOSSARY.ht.md) | Español (GLOSSARY.es.md)
-->

**Languages:** **English** · [Français](GLOSSARY.fr.md) · [Kreyòl Ayisyen](GLOSSARY.ht.md) · [Español](GLOSSARY.es.md)

[← Docs index](README.md) · [Project README](../README.md)

---

# Glossary

Plain-language definitions of every technical, civic, and Haitian-specific term used in this project's documentation. If a word in any document confuses you, look it up here. If a term is missing, please [open a Pull Request](https://github.com/haitiansintech/HaitiCityPortal/edit/main/docs/GLOSSARY.md) or [file an issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose).

## Table of Contents

- [Civic and Haitian terms](#civic-and-haitian-terms)
- [Technology terms](#technology-terms)
- [Operations terms](#operations-terms)
- [Project-specific terms](#project-specific-terms)
- [Acronyms](#acronyms)

---

## Civic and Haitian terms

| Term | Meaning |
|---|---|
| **CASEC** | *Conseil d'Administration de la Section Communale*. The elected three-person council that governs a *communal section* (the smallest administrative unit in Haiti, smaller than a commune). |
| **ASEC** | *Assemblée de la Section Communale*. The elected legislative assembly of a communal section, alongside CASEC. |
| **Commune** | A municipality in Haiti — equivalent to a city or town. Each commune has a mayor and is the level of government this portal serves. |
| **Communal section** (*Section Communale*) | A sub-municipal geographic unit. A commune is divided into communal sections; each section is governed by a CASEC + ASEC. |
| **Mayor** (*Majistra*) | The elected head of a commune. |
| **Town Delegate** (*Délégué de ville*) | An appointed central-government representative in a commune. |
| **MonCash** | Haiti's most-used mobile money service, operated by Digicel. Many residents pay bills through MonCash. |
| **NIF** | *Numéro d'Identification Fiscale*. The Haitian taxpayer identification number — required for most official transactions. |
| **CIN** | *Carte d'Identification Nationale*. The Haitian national identity card. |
| **Quittance** (Fr/Kreyòl) | A receipt or proof of payment. The portal issues a *quittance* when a payment is verified. |
| **Open311** | An open international standard for citizens to report non-emergency issues (potholes, garbage, lighting) to a municipality. The portal's `/report` form follows this standard. |

---

## Technology terms

| Term | Meaning |
|---|---|
| **Frontend** | The part of an application that runs in the user's browser and displays pages, forms, and buttons. |
| **Backend** | The part of an application that runs on a server: handles login, queries the database, processes payments. The user never sees backend code directly. |
| **Full-stack** | An application or codebase that contains both frontend and backend in the same project. Haiti City Portal is full-stack. |
| **Next.js** | The web framework this project is built on. It produces both the frontend pages and the backend logic from one codebase. |
| **App Router** | The modern routing system in Next.js 13+ where each folder under `src/app/` becomes a URL. |
| **React** | The JavaScript library Next.js uses to build user interfaces (pages and components). |
| **Server Component** | A page or component that runs on the server and sends finished HTML to the browser. Faster, better for SEO, can read the database directly. |
| **Client Component** | A component that runs in the browser. Needed for interactive things (maps, form state, animations). Marked with `"use client"` at the top of the file. |
| **Server Action** | A backend function you can call directly from a form. Defined in `src/app/actions/`. |
| **API route** | A backend endpoint at a URL like `/api/health`. Used by external systems or browser scripts to send/receive data. |
| **Middleware** | Code that runs on the server *before* a page renders. This project uses middleware to detect the language, identify the city (tenant), and protect admin pages. |
| **Database** | Where dynamic data is stored: cities, users, service requests, payments, events. |
| **PostgreSQL (Postgres)** | The specific database engine used. Free, open source, very widely deployed. |
| **Drizzle ORM** | The tool that lets developers write database queries in TypeScript instead of raw SQL. The schema is in `src/db/schema.ts`. |
| **Schema** | The blueprint of the database — what tables exist, what columns each has, what types they hold. |
| **Migration** | A file that updates the schema (adds a column, renames a table). Drizzle generates these. |
| **Seeding** | Inserting starter data into a fresh database (e.g. one demo city). Run with `npm run db:seed`. |
| **TypeScript** | A version of JavaScript with type checking — catches many bugs before the code runs. |
| **Tailwind CSS** | A styling system where you write small classes (like `bg-blue-500 p-4`) directly in HTML. The project uses Tailwind v4. |
| **shadcn/ui** | A library of accessible, customisable UI components (buttons, dialogs, inputs) built on Tailwind. |
| **MDX** | Markdown with embedded React components. Service descriptions and news articles are written in MDX files. |
| **Frontmatter** | The YAML block at the top of an MDX file (between `---` markers) that holds structured metadata (title, date, fees). |
| **MapLibre GL** | The open-source JavaScript map library used at `/map`. |
| **Leaflet** | A simpler open-source map library used in the facilities directory. |
| **NextAuth (Auth.js)** | The library that handles login, sessions, and user roles. |
| **bcryptjs** | A library for securely hashing passwords. The original password is never stored. |
| **Zod** | A library for validating user input on forms (so a phone field actually contains a phone number). |
| **next-intl** | The library that handles the four languages and locale-prefixed URLs (`/ht/`, `/fr/`, `/en/`, `/es/`). |

---

## Operations terms

| Term | Meaning |
|---|---|
| **Domain** | The web address of a site, e.g. `portal.ht`. You buy a domain from a registrar (Namecheap, Cloudflare, GoDaddy, etc.). |
| **Subdomain** | A name in front of the domain, e.g. `jacmel.portal.ht`. Subdomains are how this portal identifies which city is being served. |
| **Wildcard DNS** | A DNS record like `*.portal.ht` that matches *any* subdomain. Required so that adding a new city doesn't require IT changes. |
| **DNS** | The internet's address book. Maps `jacmel.portal.ht` to the server's IP address. |
| **SSL / TLS / HTTPS** | The padlock in your browser. Encrypts traffic. Hosting providers like Vercel give you HTTPS for free. |
| **Hosting** | The server that runs the live site. This project is designed to run on Vercel (recommended), but works anywhere Node.js runs. |
| **Vercel** | A hosting platform built by the company that makes Next.js. Free tier available; paid plans start around $20/month. |
| **Neon** | A managed PostgreSQL database service often paired with Vercel. Free tier available. |
| **Environment variable** | A configuration value (like the database password) provided to the running app — never written into the code. Stored in `.env.local` for local dev, in the hosting dashboard for production. |
| **CI / CD** | Continuous Integration / Continuous Deployment. Automated checks (lint, typecheck, build, tests) that run on every Pull Request. Defined in `.github/workflows/ci.yml`. |
| **Pull Request (PR)** | A proposed change to the code, opened on GitHub for review before merging. |
| **Branch protection** | GitHub rules preventing direct pushes to `main` and requiring reviews on PRs. |
| **GPG signing** | Cryptographically signing your commits to prove they are really from you. Required by this project's branch protection. |

---

## Project-specific terms

| Term | Meaning |
|---|---|
| **Tenant** | A single municipality / city served by the portal. The whole project is built so one running app can serve many tenants. |
| **Multi-tenant SaaS** | A pattern where one running application serves many separate organisations, with their data isolated. Haiti City Portal is multi-tenant: one server can run Jacmel, Cap-Haïtien, and Pétion-Ville at once. |
| **`tenant_id`** | The UUID column on every database row that says which city the row belongs to. Every database query must filter by `tenant_id`. |
| **`x-tenant-subdomain` header** | An internal HTTP header set by the middleware that tells the rest of the app which city's subdomain the current request came from. |
| **UUID** | A 128-bit random identifier like `550e8400-e29b-41d4-a716-446655440000`. Used as the primary key on every table — never sequential integers. |
| **Locale** | A language code: `en` (English), `fr` (French), `ht` (Haitian Creole), `es` (Spanish). The default locale is `ht`. |
| **Locale prefix** | The `/ht/` or `/en/` part of a URL. Every public page lives under a locale prefix. |
| **Locale fallback** | If a French file is missing, the portal silently uses the English file. Lets translators ship one language at a time. |
| **Memo code** | A short human-readable code (e.g. `JAC-TAX-8821`) shown to a resident after they submit a payment. They include this code with their MonCash or wire transfer so an admin can match the money to the request. |
| **Pending upload** | The status of a payment whose memo code has been issued but whose actual payment has not yet been confirmed by an admin. |
| **Manual reconciliation** | The current process where an admin compares bank/MonCash statements against the portal's pending payments and marks each one verified. Will be replaced by webhooks later. |
| **Service request** | A citizen's report or service application — Open311-compatible. Stored in the `service_requests` table. |
| **Field report** | A staff-submitted observation from the field (e.g. flooded street, damaged building). Different from a service request. |
| **Communal section** (DB term) | A row in the `communal_sections` table representing a sub-municipal geographic unit; CASEC/ASEC officials are linked to one. |
| **Handbook** | The internal governance handbook articles (`handbook_articles` table) visible only to admin users with the right role. |
| **Audit snapshot** | A point-in-time copy of finance figures used to detect after-the-fact tampering. |
| **Emergency alert** | A tenant-scoped broadcast message (hurricane, curfew, water cut). |

---

## Acronyms

| Acronym | Stands for |
|---|---|
| **API** | Application Programming Interface |
| **ADR** | Architecture Decision Record |
| **BSL** | Business Source License |
| **CI** | Continuous Integration |
| **CD** | Continuous Deployment |
| **CLA** | Contributor License Agreement |
| **CMS** | Content Management System |
| **DNS** | Domain Name System |
| **GIS** | Geographic Information System |
| **HCP** | Haiti City Portal |
| **HTML** | HyperText Markup Language |
| **HTTPS** | HyperText Transfer Protocol Secure |
| **JSON** | JavaScript Object Notation |
| **JSONB** | JSON, Binary (PostgreSQL's efficient JSON storage) |
| **MDX** | Markdown + JSX |
| **ORM** | Object-Relational Mapper |
| **PR** | Pull Request |
| **PRD** | Product Requirements Document |
| **PWA** | Progressive Web App |
| **RC** | Release Candidate |
| **SaaS** | Software as a Service |
| **SDK** | Software Development Kit |
| **SQL** | Structured Query Language |
| **SSL** | Secure Sockets Layer |
| **TLS** | Transport Layer Security |
| **UI** | User Interface |
| **URL** | Uniform Resource Locator |
| **UUID** | Universally Unique Identifier |
| **YAML** | YAML Ain't Markup Language (used for frontmatter) |

---

[↑ Back to top](#glossary) · [← Docs index](README.md) · [Project README →](../README.md)
