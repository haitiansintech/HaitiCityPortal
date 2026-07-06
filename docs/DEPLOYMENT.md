<!--
Languages: English (this file) | Français (DEPLOYMENT.fr.md) | Kreyòl (DEPLOYMENT.ht.md) | Español (DEPLOYMENT.es.md)
-->

**Languages:** **English** · [Français](DEPLOYMENT.fr.md) · [Kreyòl Ayisyen](DEPLOYMENT.ht.md) · [Español](DEPLOYMENT.es.md)

[← Docs index](README.md) · [Project README](../README.md) · [Glossary](GLOSSARY.md)

---

# Deployment

Step-by-step guide to deploying Haiti City Portal in production. This document is written for the developer or IT lead who will operate the live service.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Architecture overview](#architecture-overview)
- [Step 1 — Domain](#step-1--domain)
- [Step 2 — Wildcard DNS](#step-2--wildcard-dns)
- [Step 3 — Database (Neon)](#step-3--database-neon)
- [Step 4 — Hosting (Vercel)](#step-4--hosting-vercel)
- [Step 5 — Environment variables](#step-5--environment-variables)
- [Step 6 — Initial schema and seed](#step-6--initial-schema-and-seed)
- [Step 7 — Connect domain to Vercel](#step-7--connect-domain-to-vercel)
- [Step 8 — Verify the deployment](#step-8--verify-the-deployment)
- [Step 9 — Add your first tenant](#step-9--add-your-first-tenant)
- [Updating the application](#updating-the-application)
- [Backups and disaster recovery](#backups-and-disaster-recovery)
- [Monitoring and logs](#monitoring-and-logs)
- [Cost summary](#cost-summary)
- [Alternative platforms](#alternative-platforms)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Install on your laptop:

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [GitHub CLI](https://cli.github.com/) (`gh`) — optional but useful
- A code editor (VS Code, Cursor, etc.)

You'll also need accounts at:

- [GitHub](https://github.com) (free) — to fork the repo
- A domain registrar (any: [Namecheap](https://www.namecheap.com/), [Cloudflare](https://www.cloudflare.com/), [Porkbun](https://porkbun.com/), etc.)
- [Vercel](https://vercel.com) (free tier available) — hosting
- [Neon](https://neon.tech) (free tier available) — PostgreSQL database

[↑ Back to top](#table-of-contents)

---

## Architecture overview

In production, the system looks like this:

```
        Internet
           │
           ▼
   ┌───────────────┐       (each commune has its own subdomain)
   │   Cloudflare/ │       e.g.  jacmel.portal.ht
   │   Registrar   │             cap.portal.ht
   │   wildcard DNS│             demo.portal.ht
   │   *.portal.ht │
   └───────┬───────┘
           │
           ▼
   ┌───────────────┐       Next.js app:
   │    Vercel     │       - middleware reads Host → tenant
   │  (Next.js 15) │       - server components query DB
   └───────┬───────┘       - HTTPS handled automatically
           │
           ▼
   ┌───────────────┐       Postgres 16:
   │     Neon      │       - one shared database
   │  (PostgreSQL) │       - rows scoped by tenant_id
   └───────────────┘
```

See [Architecture](ARCHITECTURE.md) for the full diagram.

[↑ Back to top](#table-of-contents)

---

## Step 1 — Domain

You need a single domain that all communes will share as subdomains.

Recommended: a `.ht` domain so it reads as Haitian, but any TLD works (`.org`, `.com`, etc.).

| Registrar | Notes |
|---|---|
| Cloudflare | Cheapest renewals, excellent DNS, free SSL |
| Namecheap | Easy interface, good support |
| Porkbun | Cheap, modern interface |

After purchase, **point your domain's nameservers to Cloudflare** if you bought elsewhere — Cloudflare's DNS is the easiest for wildcard records and is free.

[↑ Back to top](#table-of-contents)

---

## Step 2 — Wildcard DNS

Multi-tenancy depends on a wildcard DNS record. Without it, you cannot serve multiple cities.

In your DNS provider (Cloudflare in this guide), add **two CNAME records**:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `@` (or your apex) | `cname.vercel-dns.com` | DNS only (grey cloud) |
| CNAME | `*` | `cname.vercel-dns.com` | DNS only (grey cloud) |

The `*` record is what makes `jacmel.portal.ht`, `cap.portal.ht`, and any future commune resolve automatically.

> **Important:** if you use Cloudflare, set the records to "DNS only" (grey cloud icon), not "proxied" (orange cloud), at first. Vercel needs to issue SSL certificates for each subdomain, and Cloudflare's proxy can interfere. You can re-enable proxying later for caching.

[↑ Back to top](#table-of-contents)

---

## Step 3 — Database (Neon)

1. Sign in at [neon.tech](https://neon.tech).
2. Create a new **Project** named `haiti-city-portal-prod`.
3. Pick the region closest to your users. For Haiti, **AWS US East 2 (Ohio)** or **US East 1 (N. Virginia)** are good choices.
4. After creation, copy the **connection string** that looks like:
   ```
   postgresql://USER:PASSWORD@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. Save this — it becomes the `DATABASE_URL` environment variable in Step 5.

> **Tip:** Neon's free tier is generous. You can start free and upgrade only when usage grows. The "Launch" plan (around $19/month) gives you autoscaling and a longer storage retention window.

[↑ Back to top](#table-of-contents)

---

## Step 4 — Hosting (Vercel)

### 4.1 Fork the repository

1. Visit [github.com/haitiansintech/HaitiCityPortal](https://github.com/haitiansintech/HaitiCityPortal).
2. Click **Fork** in the upper right.
3. (Optional) Rename your fork to something organisation-specific, e.g. `mairie-jacmel-portal`.

### 4.2 Import into Vercel

1. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
2. Click **Add New… → Project**.
3. Select your fork.
4. **Framework preset**: Next.js (auto-detected).
5. **Root directory**: leave default.
6. **Build & output settings**: leave default.
7. Do **not** click **Deploy** yet — first add the environment variables (Step 5).

[↑ Back to top](#table-of-contents)

---

## Step 5 — Environment variables

In the Vercel project settings (or during the import wizard), add these:

| Variable | Required? | Example value |
|---|---|---|
| `DATABASE_URL` | **Yes** | `postgresql://USER:PASS@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `AUTH_SECRET` | **Yes** | A random 32+ char string. Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Yes** | `https://portal.ht` (your apex domain, with `https://`) |
| `AUTH_TRUST_HOST` | Recommended | `true` (Vercel sits behind a proxy) |
| `NEXT_PUBLIC_BASE_URL` | Optional | `https://portal.ht` |
| `ENABLE_LOCAL_MODE` | Must be **unset or `false`** in production | (do not set) |

A complete annotated template is provided in [`.env.production.example`](../.env.production.example).

> **Warning:** Never commit secrets to GitHub. Vercel encrypts environment variables at rest and they are only exposed to the running app.

Click **Deploy**.

[↑ Back to top](#table-of-contents)

---

## Step 6 — Initial schema and seed

The very first deploy starts the app, but the database is empty. You need to push the schema and seed your first tenant.

### 6.1 Push the schema

From your laptop:

```bash
git clone https://github.com/YOUR-ORG/HaitiCityPortal.git
cd HaitiCityPortal
npm install
echo 'DATABASE_URL="<your Neon connection string>"' > .env.local
npm run db:push
```

This creates every table defined in `src/db/schema.ts` in your Neon database.

### 6.2 Seed your first tenant

The repo ships with a production-safe seed script that requires explicit confirmation. From your laptop, with the production `DATABASE_URL` already in `.env.local`:

```bash
# These four are required by src/db/seed.production.ts
$env:CONFIRM_PRODUCTION_SEED="yes"
$env:SEED_ADMIN_EMAIL="admin@yourdomain.ht"
$env:SEED_ADMIN_PASSWORD="<a strong, unique password>"
$env:SEED_TENANT_NAME="Ville de Jacmel"
$env:SEED_TENANT_SUBDOMAIN="jacmel"

npm run db:seed:prod
```

(On macOS/Linux, use `export VAR=value` instead of `$env:VAR=`.)

This creates:
- One `tenants` row with the subdomain you chose.
- One `users` row with the admin email and a hashed password — your initial superadmin.

You can now sign in at `https://jacmel.portal.ht/login` once DNS resolves (Step 7).

For onboarding additional cities later, see [Tenant Onboarding](TENANT_ONBOARDING.md).

[↑ Back to top](#table-of-contents)

---

## Step 7 — Connect domain to Vercel

In the Vercel project settings:

1. Open **Settings → Domains**.
2. Add `portal.ht` (your apex domain).
3. Add `*.portal.ht` (the wildcard — this is how every commune subdomain works).
4. Vercel will verify the DNS records you set in Step 2 and issue SSL certificates automatically.

Once verified, both:
- `https://portal.ht` → reaches the app (you can configure this to redirect to a default tenant or a public landing page).
- `https://jacmel.portal.ht` → reaches your Jacmel tenant (the one you seeded).

> **Note on apex domains:** If your registrar doesn't support CNAME at the apex (some don't), use Vercel's recommended A records instead. Cloudflare and Porkbun support CNAME-flattening so this is a non-issue there.

[↑ Back to top](#table-of-contents)

---

## Step 8 — Verify the deployment

Run this checklist:

- [ ] `https://portal.ht` returns a page.
- [ ] `https://jacmel.portal.ht` (or your subdomain) returns a page.
- [ ] `https://jacmel.portal.ht/api/health` returns `{"status":"ok"}` or similar.
- [ ] You can switch languages: `/en/`, `/fr/`, `/ht/`, `/es/`.
- [ ] You can sign in at `/login` with the admin credentials you seeded.
- [ ] You can access an admin page (e.g. `/admin`).
- [ ] The browser shows a valid lock/HTTPS icon.

If any item fails, see [Troubleshooting](#troubleshooting).

[↑ Back to top](#table-of-contents)

---

## Step 9 — Add your first tenant

If you seeded one tenant in Step 6, that's your "first tenant". You can stop here and proceed to filling in your commune's data through the admin panel — see [Admin Manual](ADMIN_MANUAL.md).

To add **additional** communes (a second city, a third, etc.), see [Tenant Onboarding](TENANT_ONBOARDING.md).

[↑ Back to top](#table-of-contents)

---

## Updating the application

When new code lands in the upstream repository:

1. Sync your fork: GitHub → your fork → **Sync fork** button.
2. Vercel auto-deploys from your fork's `main` branch on every push.
3. If a database schema change is included, run `npm run db:push` against your production database (or set up an automated migration step in CI).

Recommended: set up a `staging` environment in Vercel that mirrors production but uses a separate Neon database. Test schema changes there first.

[↑ Back to top](#table-of-contents)

---

## Backups and disaster recovery

| Concern | Mitigation |
|---|---|
| Database loss | Neon takes automatic point-in-time snapshots. Paid plans extend retention to 30 days. |
| Application bug | Vercel keeps every previous deployment. **Settings → Deployments → Promote to Production** rolls back instantly. |
| DNS hijack | Enable two-factor authentication on your registrar and DNS provider. |
| Lost admin password | Run a Drizzle Studio query to reset the hashed password, or re-run the seed with new credentials. |
| Lost `AUTH_SECRET` | Rotating this signs out every active session — not catastrophic. Keep it in a password manager nonetheless. |

[↑ Back to top](#table-of-contents)

---

## Monitoring and logs

- **Vercel logs**: Settings → Logs → Runtime Logs. See request-level errors.
- **Neon dashboard**: Monitor query performance and storage.
- **Optional: Sentry** for application error tracking.
- **Optional: Better Stack / Pingdom** for uptime monitoring (the `/api/health` endpoint is built for this).

[↑ Back to top](#table-of-contents)

---

## Cost summary

| Component | Free tier | Standard paid tier |
|---|---|---|
| Vercel | $0 | $20/user/month (Pro) |
| Neon | $0 | $19/month (Launch) |
| Cloudflare DNS | $0 | $0 (DNS is free) |
| Domain (`.ht`) | n/a | ~$30/year |
| Total | **~$0/month + $30/year** | **~$40/month + $30/year** |

You can launch on the free tier and upgrade as usage grows.

[↑ Back to top](#table-of-contents)

---

## Alternative platforms

The project is standard Next.js 15 — it runs anywhere Node.js runs.

| Alternative | Notes |
|---|---|
| Self-hosted on a VPS (Hetzner, Linode, OVH) | Use Docker; ~$5–20/month; you handle SSL, scaling, backups |
| Cloudflare Pages + Workers | Possible with adapters; some Next.js features may not work |
| Fly.io | Good for self-hosted Postgres + Next.js together |
| Railway | Similar developer experience to Vercel |
| Render | Similar developer experience to Vercel |
| AWS, GCP, Azure | Possible but significant setup; not recommended for first deploy |

If you choose self-hosting, you must also handle:
- HTTPS (Let's Encrypt + a reverse proxy like Caddy or Traefik)
- Wildcard certificate issuance for `*.portal.ht`
- Process management (systemd or Docker)
- Backups for Postgres

For most communes, Vercel + Neon is dramatically cheaper in staff time.

[↑ Back to top](#table-of-contents)

---

## Troubleshooting

### Subdomain returns "404 Not Found"
- Check the wildcard CNAME exists.
- Check the wildcard domain is added in Vercel **Settings → Domains** (the `*.portal.ht` entry).
- Vercel's SSL provisioning can take 1–10 minutes the first time.

### "DB unavailable, using fallback tenant"
- `DATABASE_URL` is missing or wrong in Vercel env vars.
- The Neon database has been suspended (free tier auto-suspends after 5 minutes of inactivity — first request may be slow).
- The Neon connection string is missing `?sslmode=require`.

### "MISSING_MESSAGE" or "FORMATTING_ERROR" in the UI
- A `messages/{locale}.json` key is missing. Check that all four locale files have parallel keys.

### Login redirects in a loop
- `NEXTAUTH_URL` does not match the actual deployment URL.
- `AUTH_SECRET` is not set or is shorter than 32 characters.
- `AUTH_TRUST_HOST` is not `true`.

### `npm run db:push` fails
- Confirm `DATABASE_URL` in `.env.local` is reachable. Try connecting with `psql` first.
- Check that your Neon project is in the same region you specified.

### Vercel build fails on first deploy
- Check the build log for missing env vars.
- React 19 RC + Tailwind v4 alpha require `--legacy-peer-deps` on `npm install` in older npm versions; Vercel's modern builds usually handle this fine.

[↑ Back to top](#table-of-contents)

---

[← Docs index](README.md) · [For Municipalities](FOR_MUNICIPALITIES.md) · [Tenant Onboarding →](TENANT_ONBOARDING.md)
