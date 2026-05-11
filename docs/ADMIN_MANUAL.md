<!--
Languages: English (this file) | Français (ADMIN_MANUAL.fr.md) | Kreyòl (ADMIN_MANUAL.ht.md) | Español (ADMIN_MANUAL.es.md)
-->

**Languages:** **English** · [Français](ADMIN_MANUAL.fr.md) · [Kreyòl Ayisyen](ADMIN_MANUAL.ht.md) · [Español](ADMIN_MANUAL.es.md)

[← Docs index](README.md) · [Project README](../README.md) · [Glossary](GLOSSARY.md)

---

# Admin Manual

A practical day-to-day guide for municipal staff using the admin panel. No technical background required.

## Table of Contents

- [Before you start](#before-you-start)
- [Logging in](#logging-in)
- [The dashboard](#the-dashboard)
- [Service requests](#service-requests)
- [Verifying payments](#verifying-payments)
- [Publishing news](#publishing-news)
- [Posting an emergency alert](#posting-an-emergency-alert)
- [Managing officials](#managing-officials)
- [Managing facilities](#managing-facilities)
- [Reviewing facility suggestions](#reviewing-facility-suggestions)
- [Field reports](#field-reports)
- [Governance handbook](#governance-handbook)
- [Finance audit review](#finance-audit-review)
- [User roles and access](#user-roles-and-access)
- [Logging out and shift handover](#logging-out-and-shift-handover)
- [Troubleshooting](#troubleshooting)

---

## Before you start

You need:

- A web browser (Chrome, Edge, Safari, Firefox).
- Your admin email and password (given to you by your IT lead).
- Internet access.

Recommended:
- A second screen or tab for taking notes.
- Read the [Glossary](GLOSSARY.md) once.

[↑ Back to top](#table-of-contents)

---

## Logging in

1. Go to your commune's portal: `https://{your-subdomain}.portal.ht` (e.g. `https://jacmel.portal.ht`).
2. Click **Login** (top right) or go directly to `/login`.
3. Enter your email and password.
4. You will land on the admin dashboard at `/admin`.

If your password doesn't work, ask your IT lead to reset it. Never share your password.

[↑ Back to top](#table-of-contents)

---

## The dashboard

The dashboard at `/admin` is your starting point each day. It shows:

- **Open service requests** — issues residents have reported that need attention.
- **Pending payments** — payments awaiting verification.
- **Recent activity** — what other admins have done.
- **Quick links** to every section of the panel.

Get into the habit of opening the dashboard first thing in the morning.

[↑ Back to top](#table-of-contents)

---

## Service requests

Residents submit issues and service applications through the public `/report` form. They appear here.

### Reading a request

1. From the dashboard, click **Requests** or go to `/admin/requests`.
2. The list shows: date, type (issue, certificate, permit…), status, and a one-line summary.
3. Click a row to see the full detail at `/admin/requests/[id]`:
   - Resident name and contact (if provided)
   - Description, photo, GPS location
   - Status history

### Updating the status

| Status | Meaning |
|---|---|
| **Open** | Just submitted, not yet looked at |
| **In progress** | A staff member is working on it |
| **Resolved** | The issue is fixed or the request fulfilled |
| **Closed** | Resolved and acknowledged by the resident |
| **Rejected** | Not actionable (out of scope, duplicate, malicious) — include a reason |

Click **Update Status**, choose the new status, and add a short note describing what was done. The note is internal — residents do not see it (yet).

### Best practices

- Always update within **48 hours** of submission, even if just to acknowledge.
- For complex issues, set **In progress** and update again when done.
- For rejections, write a clear reason — this protects the commune later.

[↑ Back to top](#table-of-contents)

---

## Verifying payments

Today's payment flow is *manual reconciliation*: the resident is given a memo code, they pay via MonCash or wire transfer with that code as the reference, and you confirm receipt.

### Workflow

1. Go to `/admin/finance`.
2. Filter by status **Pending Upload**.
3. Open a payment to see:
   - Memo code (e.g. `JAC-TAX-8821`)
   - Amount
   - Payment method (MonCash or wire)
   - Resident contact info
4. Cross-check with your commune's bank statement or MonCash statement.
5. If you find a matching payment:
   - Click **Mark Verified**.
   - Enter the date the payment was actually received.
   - (Optional) Upload a screenshot of the bank/MonCash entry.
6. If you cannot find the payment after 5 business days:
   - Mark **Failed** with reason "not received".

### Why memo codes matter

The memo code is the *only* way to know which resident a payment belongs to. If a resident forgot the code, ask for the date and amount and search the system manually.

> **Critical:** never mark a payment as verified without independent proof in your bank or MonCash statement. This is your audit trail.

[↑ Back to top](#table-of-contents)

---

## Publishing news

News articles are published from MDX files in the repository. There are two paths:

### Path A — GitHub web UI (no coding)

This is the recommended way for content editors. See [Content Guide](CONTENT_GUIDE.md) for the full step-by-step.

### Path B — Future admin UI

A web-based editor is on the roadmap. Until then, content lives in version control to give you a permanent edit history.

When the article is merged, it appears within minutes on the homepage and `/news` page. No deployment action required from you.

[↑ Back to top](#table-of-contents)

---

## Posting an emergency alert

Emergency alerts (hurricane, curfew, water cut, contaminated well) are stored in the database and shown prominently to all visitors of your tenant.

1. Go to `/admin/emergency`.
2. Click **New Alert**.
3. Fill in:
   - Title in all four languages (`{ en, fr, ht, es }`)
   - Body text — keep it short and actionable
   - Severity (`info` / `warning` / `critical`)
   - Start time (defaults to now)
   - End time (when the alert auto-disappears)
4. Save.

The alert appears immediately on every public page.

> **Best practice:** for the most urgent alerts, also push the message via WhatsApp, radio, and city loudspeakers. The portal complements traditional channels — it does not replace them.

To end an alert early, edit it and set the end time to the current moment, or click **Deactivate**.

[↑ Back to top](#table-of-contents)

---

## Managing officials

The officials directory at `/officials` shows your commune's elected officials publicly. Keep it accurate.

1. Go to `/admin/officials` (or wherever your version of the panel exposes it).
2. To add a new official: click **New**, fill in name, role (CASEC / ASEC / Mayor / Town Delegate), communal section (if applicable), photo URL, optional WhatsApp and Vwa profile.
3. To update a term ending or stepping down, edit the record and update the dates.
4. To remove someone (e.g. resigned), set them inactive rather than deleting — this preserves history.

> **Tip:** at every election, schedule a 2-hour update session within 7 days of inauguration to refresh photos and contact info.

[↑ Back to top](#table-of-contents)

---

## Managing facilities

The facilities directory at `/directory` lists hospitals, schools, police stations, churches, markets, etc. on a map.

1. Go to `/admin/facilities` (or your panel's equivalent).
2. **New facility**: name, category, GPS latitude/longitude, address, phone.
3. **Edit**: update phone numbers, hours, GPS as needed.
4. **Categories**: hospital, school, police, fire, church, market, government, other.

Tip: use a phone with GPS to capture coordinates on site, or use [Google Maps](https://maps.google.com) (right-click any point → "What's here?" → copy coordinates).

[↑ Back to top](#table-of-contents)

---

## Reviewing facility suggestions

Residents can suggest corrections or new facilities through the directory. These flow into `facility_suggestions`.

1. Go to `/admin/facility-suggestions` (or via the dashboard).
2. Each suggestion shows: which facility, what was changed, who suggested (if signed in), when.
3. Review and either:
   - **Accept** — the change is applied to the live record.
   - **Reject** — note a reason; the suggestion is archived.
4. Try to clear new suggestions weekly.

[↑ Back to top](#table-of-contents)

---

## Field reports

Field reports are *staff-submitted* observations from the field (e.g. flooded street, market damage after a storm). Different from resident-submitted service requests.

1. Go to `/admin/field-reports`.
2. **New Report**: type, location, description, photo, severity.
3. Reports feed into the issues map (`/map`) for residents and into your finance/works planning.

[↑ Back to top](#table-of-contents)

---

## Governance handbook

The handbook at `/admin/handbook` is your internal knowledge base — articles on procedures, finance, ethics, communications.

- **Reading**: every admin can read articles permitted by their role.
- **Editing**: only `superadmin` users can edit articles via `/admin/handbook/editor`.
- **Read tracking**: the system records who has read each article — useful for new-staff onboarding.

When you join the team, read the handbook front-to-back during your first week.

[↑ Back to top](#table-of-contents)

---

## Finance audit review

`/admin/finance/audit-review` shows audit snapshots: point-in-time captures of finance figures used to detect after-the-fact tampering.

- Snapshots are taken automatically on a schedule (configurable).
- Compare today's snapshot against last month's to spot anomalies.
- If the totals do not match what you expect, escalate to your treasurer immediately.

This page is read-only. You cannot delete or modify snapshots — that's the point.

[↑ Back to top](#table-of-contents)

---

## User roles and access

| Role | Can do |
|---|---|
| `user` | Submit service requests, make payments — same as a resident |
| `admin` | Read/update service requests, verify payments, manage officials/facilities, post news/alerts |
| `superadmin` | Everything `admin` does, plus edit the handbook, create/disable other admin accounts |

You should normally have **at least two `superadmin`s** so that one can recover access if the other is unavailable.

To add a new admin user:
1. Go to `/admin/users` (or via Drizzle Studio if not yet in the UI).
2. **New User**: email, name, role.
3. The new user receives an email with a temporary password (when email is configured).

Never share an account between people. Every admin needs their own login.

[↑ Back to top](#table-of-contents)

---

## Logging out and shift handover

At the end of every shift:

1. Note any unfinished work in the dashboard's **Open requests** view.
2. Send a short Slack/WhatsApp note to the next shift summarising:
   - High-priority requests still open
   - Payments that need attention
   - Any active emergency alerts
3. Click your avatar (top right) → **Logout**.
4. Close the browser tab — especially on shared devices.

[↑ Back to top](#table-of-contents)

---

## Troubleshooting

| Problem | What to do |
|---|---|
| "Forgot my password" | Ask your IT lead to reset it (they run a small command on the server) |
| "I don't see the admin panel" | Your account is not an admin yet — ask a superadmin to upgrade your role |
| "I marked a payment verified by mistake" | Open the payment, click **Reverse Verification**, leave a reason |
| "I posted news/alert with a typo" | Edit the source MDX file (or alert record) and save again — changes are live within minutes |
| "Site is down" | Check `https://{subdomain}.portal.ht/api/health`. If it returns an error, contact your IT lead. |
| "I can see another commune's data" | This is a **critical security incident**. Email `security@haiticity.org` immediately and do not refresh. |

[↑ Back to top](#table-of-contents)

---

[← Docs index](README.md) · [Tenant Onboarding](TENANT_ONBOARDING.md) · [Content Guide →](CONTENT_GUIDE.md)
