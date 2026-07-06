<!--
Languages: English (this file) | Français (TENANT_ONBOARDING.fr.md) | Kreyòl (TENANT_ONBOARDING.ht.md) | Español (TENANT_ONBOARDING.es.md)
-->

**Languages:** **English** · [Français](TENANT_ONBOARDING.fr.md) · [Kreyòl Ayisyen](TENANT_ONBOARDING.ht.md) · [Español](TENANT_ONBOARDING.es.md)

[← Docs index](README.md) · [Project README](../README.md) · [Glossary](GLOSSARY.md)

---

# Tenant Onboarding

How to add a new commune (a "tenant") to a running Haiti City Portal deployment. This document picks up where [Deployment](DEPLOYMENT.md) left off.

## Table of Contents

- [What is a tenant?](#what-is-a-tenant)
- [Prerequisites](#prerequisites)
- [Onboarding checklist](#onboarding-checklist)
- [Step 1 — Pick a subdomain](#step-1--pick-a-subdomain)
- [Step 2 — Create the tenant row](#step-2--create-the-tenant-row)
- [Step 3 — Verify the subdomain resolves](#step-3--verify-the-subdomain-resolves)
- [Step 4 — Create the first admin user](#step-4--create-the-first-admin-user)
- [Step 5 — Add officials and communal sections](#step-5--add-officials-and-communal-sections)
- [Step 6 — Add facilities](#step-6--add-facilities)
- [Step 7 — Add services and news](#step-7--add-services-and-news)
- [Step 8 — Brand the tenant](#step-8--brand-the-tenant)
- [Step 9 — Train staff and launch](#step-9--train-staff-and-launch)
- [Removing or renaming a tenant](#removing-or-renaming-a-tenant)
- [Common mistakes](#common-mistakes)

---

## What is a tenant?

A **tenant** is one commune. Every record in the database (officials, requests, payments, news) belongs to exactly one tenant. The portal serves any number of tenants from a single running application — each is reached by its own subdomain.

A row in the `tenants` table is the source of truth. Its `subdomain` column drives routing. If `tenants.subdomain = "jacmel"`, then `https://jacmel.portal.ht` is that commune's portal.

For more on the architecture, see [Architecture](ARCHITECTURE.md).

[↑ Back to top](#table-of-contents)

---

## Prerequisites

Before adding a new tenant you must already have:

- A working production deployment ([Deployment](DEPLOYMENT.md)).
- Wildcard DNS configured (`*.portal.ht`).
- A wildcard domain registered with Vercel (`*.portal.ht` in **Settings → Domains**).
- Database access (your `DATABASE_URL`).

Decide who will be the **tenant sponsor** at the commune (typically the mayor or chief of staff) and the **tenant lead** (the staff member responsible for content and admin work).

[↑ Back to top](#table-of-contents)

---

## Onboarding checklist

Print or copy this checklist and complete it for every new commune.

- [ ] Subdomain decided
- [ ] Tenant row created
- [ ] Subdomain resolves with HTTPS
- [ ] First admin user created
- [ ] Communal sections added
- [ ] Officials added
- [ ] Facilities added (or imported)
- [ ] Services described in MDX (or English fallback only at first)
- [ ] At least one news article published
- [ ] Logo, colours, mayor photo configured
- [ ] Two staff members trained
- [ ] Soft launch
- [ ] Public launch

[↑ Back to top](#table-of-contents)

---

## Step 1 — Pick a subdomain

Pick a short, memorable, lowercase identifier without spaces or special characters.

| Commune | Suggested subdomain |
|---|---|
| Jacmel | `jacmel` |
| Cap-Haïtien | `cap` or `capha` |
| Port-au-Prince | `pap` |
| Pétion-Ville | `petionville` |
| Les Cayes | `cayes` |
| Croix-des-Bouquets | `croix` |

The full URL becomes `https://{subdomain}.portal.ht` (or whatever apex domain you use).

**Reserved words you cannot use as subdomains:** `www`, `admin`, `api`, `static`, `assets`, `cdn`, `mail`, `email`, `app`, `staging`, `dev`, `test`, `localhost`, `demo`.

[↑ Back to top](#table-of-contents)

---

## Step 2 — Create the tenant row

Two ways to create the tenant row.

### Option A — Production seed script (recommended for the first tenant)

If this is the deployment's *first* tenant and you want both a tenant row and a superadmin user in one shot, use the seed script — see [Deployment, Step 6.2](DEPLOYMENT.md#step-6--initial-schema-and-seed). It's safe to run multiple times because it checks for existing rows.

### Option B — Drizzle Studio (recommended for additional tenants)

For the second, third, or hundredth commune, use the visual database editor:

1. From your laptop, with `DATABASE_URL` pointing to production:

   ```bash
   npm run db:studio
   ```

2. Drizzle Studio opens at <https://local.drizzle.studio>.
3. Open the `tenants` table.
4. Click **+ Add Record**.
5. Fill in:
   - `name`: `Ville de Cap-Haïtien` (display name, can include accents)
   - `subdomain`: `cap` (the URL-safe one from Step 1)
   - `created_at`: leave default
6. Save.
7. Note the generated `id` (UUID) — you'll need it for Step 4 if creating an admin manually.

### Option C — SQL directly

If you prefer raw SQL via `psql` or any database client:

```sql
INSERT INTO tenants (name, subdomain)
VALUES ('Ville de Cap-Haïtien', 'cap')
RETURNING id;
```

The `RETURNING id;` clause gives you the generated UUID.

[↑ Back to top](#table-of-contents)

---

## Step 3 — Verify the subdomain resolves

Open `https://cap.portal.ht` in a browser. You should see the homepage with the commune's name.

If you see "DB unavailable, using fallback tenant", check:

- The wildcard CNAME in DNS.
- The wildcard `*.portal.ht` is added in Vercel **Settings → Domains**.
- The tenant row's `subdomain` column matches the URL (case-sensitive, lowercase).
- SSL has finished provisioning (can take up to 10 minutes the first time).

[↑ Back to top](#table-of-contents)

---

## Step 4 — Create the first admin user

The new tenant has no users yet. Pick one of:

### Option A — Drizzle Studio

1. In Drizzle Studio, open the `users` table.
2. Click **+ Add Record**.
3. Fill in:
   - `tenant_id`: paste the UUID from Step 2.
   - `email`: e.g. `admin@cap.portal.ht`
   - `password_hash`: this must be a bcrypt hash, **not the plaintext password**. Generate one:
     ```bash
     node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 10))"
     ```
     Paste the resulting `$2a$10$...` string into the `password_hash` column.
   - `role`: `superadmin`
   - `name`: `Admin Cap-Haïtien` (or the actual person's name)
4. Save.

### Option B — SQL

```sql
INSERT INTO users (tenant_id, email, password_hash, role, name)
VALUES (
  '<TENANT_UUID>',
  'admin@cap.portal.ht',
  '$2a$10$...',  -- bcrypt hash, see above
  'superadmin',
  'Admin Cap-Haïtien'
);
```

Test by visiting `https://cap.portal.ht/login` and signing in.

> **Tip:** Once one admin can sign in, they can create additional admin users from inside the admin panel — no more SQL required for the next staff members.

[↑ Back to top](#table-of-contents)

---

## Step 5 — Add officials and communal sections

A commune is composed of one or more **communal sections** (sub-municipal units). Each section has elected officials (CASEC, ASEC). The mayor sits at the commune level.

### 5.1 Add communal sections

For each section of the commune, create a row in `communal_sections`:

| Column | Example |
|---|---|
| `tenant_id` | UUID of the commune |
| `name` | `1ère Section Bas Limbé` |
| `code` | `cap-1` (a short, stable code) |

### 5.2 Add officials

For each elected official, create a row in `officials`:

| Column | Example |
|---|---|
| `tenant_id` | UUID of the commune |
| `name` | `Marie Joseph` |
| `role` | `casec` / `asec` / `mayor` / `town_delegate` |
| `communal_section_id` | UUID of the section (NULL for mayor / town delegate) |
| `whatsapp` | `+509xxxxxxxx` (optional) |
| `vwa_profile_url` | `https://haitiansintech.com/profile/...` (optional) |
| `photo_url` | URL to a photo (optional) |

You can do this in Drizzle Studio, or build a small CSV importer if you have many officials.

[↑ Back to top](#table-of-contents)

---

## Step 6 — Add facilities

The facilities directory holds hospitals, schools, police stations, churches, and other public points of interest with GPS coordinates.

For each facility, create a row in `facilities`:

| Column | Example |
|---|---|
| `tenant_id` | UUID of the commune |
| `name` | `Hôpital Saint Michel` |
| `category` | `hospital` / `school` / `police` / `church` / `market` / `other` |
| `latitude` | `18.0067` |
| `longitude` | `-72.5364` |
| `address` | `Rue Comédie, Jacmel` |
| `phone` | `+509xxxxxxxx` (optional) |

Tip: residents can submit corrections through the directory page; these go into `facility_suggestions` for an admin to review.

[↑ Back to top](#table-of-contents)

---

## Step 7 — Add services and news

Services and news articles are **content files**, not database rows. They live in `src/content/services/` and `src/content/news/`. Editors can use the GitHub web UI — no Git or coding required. See [Content Guide](CONTENT_GUIDE.md).

For multi-tenant deployments, services and news in `src/content/` are *shared across all tenants by default*. If a commune needs a service that's specific to it, add a tenant-scoped row in the `services` table (or in `service_definitions` for richer schemas) and customise the route.

For most communes, the eight default services (birth certificates, cleanup, culture, governance, national-id, permits, towing, trash) are sufficient at launch.

[↑ Back to top](#table-of-contents)

---

## Step 8 — Brand the tenant

Today the portal supports per-tenant:

- `name` (display name shown in the navbar)
- `subdomain` (URL key)
- Mayor and officials photos (uploaded to your file storage; URLs stored in `officials.photo_url`)

Future per-tenant branding (logo upload, custom colours) is on the roadmap. Until then, communes can:
- Place their official photos and seal in `public/tenants/{subdomain}/` and reference them.
- Update the homepage hero text in `messages/{locale}.json` for shared text, or in tenant-specific MDX content for tenant-specific text.

[↑ Back to top](#table-of-contents)

---

## Step 9 — Train staff and launch

Distribute [Admin Manual](ADMIN_MANUAL.md) to staff who will use the portal day-to-day. Run a 1–2 hour training session covering:

1. Logging in.
2. Reading and updating service requests.
3. Verifying a payment.
4. Publishing a news article.
5. Posting an emergency alert.
6. Handing over to the next shift.

Then:

- **Soft launch:** announce internally and to a small group of residents (e.g. a single neighbourhood). Collect feedback for 1–2 weeks.
- **Public launch:** mayor's office press release, social media, banners at city hall.

[↑ Back to top](#table-of-contents)

---

## Removing or renaming a tenant

### Renaming

Update the `name` column in the `tenants` row. The `subdomain` should remain stable — changing it breaks every existing URL and bookmarks.

If you must change the subdomain:
1. Add the new subdomain (`cap` → `cap-haitien`).
2. Set up a redirect at the DNS or middleware level from the old subdomain to the new.
3. Communicate the change for at least 90 days.

### Removing

Removing a tenant means removing rows in dependent tables first (because of foreign keys):

```sql
DELETE FROM payment_records WHERE tenant_id = '<UUID>';
DELETE FROM service_requests WHERE tenant_id = '<UUID>';
DELETE FROM facilities WHERE tenant_id = '<UUID>';
DELETE FROM officials WHERE tenant_id = '<UUID>';
DELETE FROM communal_sections WHERE tenant_id = '<UUID>';
DELETE FROM users WHERE tenant_id = '<UUID>';
-- (continue for every entity table)
DELETE FROM tenants WHERE id = '<UUID>';
```

Strongly recommended: **backup first**, and consider archiving instead of deleting. A well-formed `archived_at` column on `tenants` is a future improvement worth contributing.

[↑ Back to top](#table-of-contents)

---

## Common mistakes

| Mistake | Symptom | Fix |
|---|---|---|
| Forgot to add `*.portal.ht` to Vercel domains | Subdomain returns 404 | Add it in Settings → Domains |
| Subdomain has uppercase letters | Tenant lookup fails | Subdomains are case-sensitive in routing — use lowercase only |
| Stored plaintext password in `password_hash` | Login always fails | Generate a bcrypt hash and update the row |
| Forgot `tenant_id` on a row | Row is invisible to all tenants | Update the row to include the correct `tenant_id` |
| Two tenants share a subdomain | Routing is undefined | Database should enforce a unique constraint; check `subdomain` uniqueness |
| Used a reserved word as subdomain (`api`, `admin`, `www`…) | Conflicts with system routes | Pick a different subdomain |

[↑ Back to top](#table-of-contents)

---

[← Docs index](README.md) · [Deployment](DEPLOYMENT.md) · [Admin Manual →](ADMIN_MANUAL.md)
