<!--
Languages: English (this file) | Français (FOR_MUNICIPALITIES.fr.md) | Kreyòl (FOR_MUNICIPALITIES.ht.md) | Español (FOR_MUNICIPALITIES.es.md)
-->

**Languages:** **English** · [Français](FOR_MUNICIPALITIES.fr.md) · [Kreyòl Ayisyen](FOR_MUNICIPALITIES.ht.md) · [Español](FOR_MUNICIPALITIES.es.md)

[← Docs index](README.md) · [Project README](../README.md) · [Glossary](GLOSSARY.md)

---

# For Municipalities

A non-technical guide for mayors, councillors, and city staff considering Haiti City Portal for their commune.

## Table of Contents

- [What is Haiti City Portal?](#what-is-haiti-city-portal)
- [What can your residents do with it?](#what-can-your-residents-do-with-it)
- [What can your staff do with it?](#what-can-your-staff-do-with-it)
- [What you need to run it](#what-you-need-to-run-it)
- [Estimated costs](#estimated-costs)
- [Time to launch](#time-to-launch)
- [Roles required on your side](#roles-required-on-your-side)
- [Languages and accessibility](#languages-and-accessibility)
- [Data, ownership, and privacy](#data-ownership-and-privacy)
- [Frequently asked questions](#frequently-asked-questions)
- [How to get started](#how-to-get-started)
- [Who to contact](#who-to-contact)

---

## What is Haiti City Portal?

Haiti City Portal is **free, open-source software** for Haitian communes. It gives your residents a single website where they can:

- See information about city services
- Submit requests and report problems (potholes, garbage, lighting)
- Pay city fees through MonCash or bank transfer
- Read official news and emergency alerts
- Find hospitals, schools, and police stations
- View elected officials and contact them

It also gives your staff an admin panel to manage requests, verify payments, publish news, and post emergency alerts.

It is built so that **one shared system can serve any number of communes**. Each commune has its own subdomain (e.g. `jacmel.portal.ht`, `cap.portal.ht`) and its own data — completely separated from every other commune.

> **In one sentence:** It is the same kind of system a city like Boston or Lyon uses, but designed specifically for Haiti — multilingual by default, low-bandwidth ready, and adapted to local realities like CASEC, ASEC, MonCash, and NIF.

[↑ Back to top](#table-of-contents)

---

## What can your residents do with it?

| Citizen feature | Why it matters |
|---|---|
| Find a service and see what documents are required | Reduces wasted trips to city hall |
| Report a problem with photo and GPS location | Issues stop falling through the cracks |
| Pay fees online via MonCash or wire transfer | Less cash handling, less queueing |
| Get a digital receipt (quittance) | Reduces paper, reduces fraud |
| See the location of every public facility on a map | Faster help in emergencies |
| Read official news and emergency alerts | Authoritative information replaces rumour |
| Use the site in Creole, French, English, or Spanish | Equal access for residents and the diaspora |
| See elected officials by communal section | Stronger democratic accountability |

[↑ Back to top](#table-of-contents)

---

## What can your staff do with it?

| Admin feature | Who uses it |
|---|---|
| See incoming service requests and update their status | Service desk staff |
| Verify pending payments against bank/MonCash statements | Finance officer |
| Publish news articles and emergency alerts | Communications officer |
| Manage the list of officials and their contact info | Mayor's chief of staff |
| Maintain the directory of facilities and their GPS coordinates | GIS lead / civic engagement officer |
| View finance dashboards and audit snapshots | Mayor / treasurer |
| Read and acknowledge governance handbook articles | All admins |
| Restrict who can do what (user / admin / superadmin roles) | IT / chief of staff |

[↑ Back to top](#table-of-contents)

---

## What you need to run it

Three things only:

1. **A domain name** — for example `portal.ht`, or your own (`jacmel-mairie.ht`). About $15–$30 per year.
2. **A hosting account** — recommended: [Vercel](https://vercel.com) (free for small communes, $20–40/month for larger). The hosting runs the website itself.
3. **A managed PostgreSQL database** — recommended: [Neon](https://neon.tech) (free for small communes, $19/month for the standard paid tier). The database stores your residents' submissions, payments, news, etc.

You do **not** need a physical server, a server room, or special hardware. Everything runs in the cloud.

If you have access to all three, an experienced developer can deploy your commune's portal in **under a day**.

See the full step-by-step in [Deployment](DEPLOYMENT.md) and [Tenant Onboarding](TENANT_ONBOARDING.md).

[↑ Back to top](#table-of-contents)

---

## Estimated costs

For a single commune of typical size (say, 50,000–200,000 residents):

| Item | Indicative monthly cost |
|---|---|
| Domain name | ~$2/month (paid yearly) |
| Hosting (Vercel) | $0–$40 |
| Database (Neon) | $0–$19 |
| Email service for notifications (optional, e.g. Resend) | $0–$20 |
| Map tile provider (free with MapLibre defaults) | $0 |
| **Total** | **~$20–$80 / month** |

These are pure infrastructure costs. They **do not include** people: a developer to deploy, a content editor to translate, an admin to verify payments. Many communes can fill these roles with existing staff.

A second, third, or hundredth commune can join the same shared deployment at **near-zero added cost**, because the multi-tenant architecture serves them all from one running system.

[↑ Back to top](#table-of-contents)

---

## Time to launch

A realistic timeline for a single commune:

| Stage | Time | Who |
|---|---|---|
| Buy domain, set up hosting accounts | 1 day | IT staff or a developer |
| Deploy the application | Half a day | Developer |
| Configure your subdomain and create the tenant record | 1 hour | Developer |
| Add your officials, communal sections, facilities | 1–3 days | Communications + records office |
| Translate or write your service descriptions | 1–2 weeks | Communications team |
| Train staff on the admin panel | Half a day | Chief of staff |
| Soft launch (announce to a small group) | 1 day | Communications |
| Public launch (announce to all residents) | 1 day | Mayor's office |

**Total: 2–4 weeks from decision to public launch**, assuming staff availability.

[↑ Back to top](#table-of-contents)

---

## Roles required on your side

| Role | Time needed | Skills |
|---|---|---|
| **Sponsor** (mayor or chief of staff) | A few hours total | Decision authority, prioritisation |
| **Developer / IT lead** | 2–5 days for setup, then occasional | Comfortable with Node.js, web hosting, DNS. Can be in-house, a volunteer, or contracted. |
| **Communications officer** | Ongoing | Writes news, translates services, posts alerts. No coding. |
| **Finance officer** | Ongoing | Verifies payments against bank/MonCash statements |
| **Service desk staff** | Ongoing | Reads incoming requests and updates their status |

You don't need a large team. A single tech-savvy staff member plus the mayor's communications team is enough for most communes.

[↑ Back to top](#table-of-contents)

---

## Languages and accessibility

The portal ships in four languages:

- **Haitian Creole (Kreyòl Ayisyen)** — the default, because it is the mother tongue of the great majority of Haitians.
- **French** — the official written language of government.
- **English** — for the diaspora, NGOs, and partner organisations.
- **Spanish** — for cross-border accessibility (Dominican Republic, regional partners).

Residents can switch languages at the top of every page. If a piece of content has not yet been translated to Creole or Spanish, the portal automatically shows the English version — no broken pages.

The site is built mobile-first, optimised for low-bandwidth (2G/3G) connections, and meets common web accessibility standards.

[↑ Back to top](#table-of-contents)

---

## Data, ownership, and privacy

- **You own your data.** Your commune's residents, requests, payments, news, and officials are stored in *your* database. Other communes on the same shared deployment cannot see your data.
- **The software is open source** under the Business Source License 1.1. Any commune can use it freely for non-commercial purposes. It converts to Apache 2.0 (fully open) on December 31, 2028. See [LICENSE.md](../LICENSE.md).
- **Cross-tenant isolation is enforced at the code level.** Every database query is scoped by `tenant_id` (your commune's unique identifier). A bug that allows one commune's data to leak into another is treated as a critical security incident.
- **Passwords are hashed.** Even the project maintainers cannot read them.
- **No analytics tracking by default.** You decide what you add.

For full details see [Security Policy](../SECURITY.md).

[↑ Back to top](#table-of-contents)

---

## Frequently asked questions

**Q. Do we have to pay anything to use this software?**
A. No. The code is free. You only pay for the infrastructure that runs it (domain, hosting, database) and your own staff time.

**Q. We don't have a developer. What do we do?**
A. Three options: (1) Ask a local university — many computer science students would jump at this kind of project for credit or a thesis. (2) Reach out to the Haitians in Tech network for a volunteer or low-cost contractor. (3) Email `info@haiticity.org` and we will help connect you.

**Q. Can we customise the site for our commune?**
A. Yes — your name, logo, colours, official photos, communal sections, services, and news are all configurable per commune. The base design is shared so all communes feel like part of one national civic infrastructure.

**Q. Can we add a service that's specific to our commune?**
A. Yes. Services are defined in content files anyone can edit. See [Content Guide](CONTENT_GUIDE.md).

**Q. What if our internet is unreliable?**
A. The site is optimised for low bandwidth. Offline form submission is on the roadmap (see [Implementation Status](v0.1-implementation-plan.md)).

**Q. What if MonCash is down?**
A. Wire transfer is supported as a fallback. The system issues a memo code that residents include with their payment, and an admin verifies receipt manually. Live MonCash webhook integration is on the roadmap.

**Q. We already have a website. Why switch?**
A. You don't have to. You can run the portal at a subdomain (like `services.your-mairie.ht`) and link to it from your existing site. Or use the portal as your main site. Your choice.

**Q. Can residents create accounts?**
A. Today, residents can submit requests anonymously. Account creation for residents (to track their own requests) is on the roadmap.

**Q. What about the diaspora?**
A. The portal is multilingual (English/French/Spanish) and supports international wire transfers for fundraising and community projects. Stripe support for diaspora-friendly USD/EUR payments is on the roadmap.

**Q. Can we integrate with our existing systems (e.g. tax records)?**
A. Yes. The portal exposes API endpoints and can be extended with custom integrations. Talk to your developer.

[↑ Back to top](#table-of-contents)

---

## How to get started

1. Read this document and the [Glossary](GLOSSARY.md) — share both with your decision-makers.
2. Identify your developer or IT lead and share [Deployment](DEPLOYMENT.md) and [Tenant Onboarding](TENANT_ONBOARDING.md) with them.
3. Identify your content lead (communications officer) and share [Content Guide](CONTENT_GUIDE.md).
4. Decide on a domain (or subdomain).
5. Set up the hosting and database accounts.
6. Deploy.
7. Onboard your tenant (add your commune to the system).
8. Add officials, sections, facilities, services, news.
9. Train staff with [Admin Manual](ADMIN_MANUAL.md).
10. Launch.

[↑ Back to top](#table-of-contents)

---

## Who to contact

| Reason | Contact |
|---|---|
| General questions about the project | `info@haiticity.org` |
| Help finding a developer | `info@haiticity.org` |
| Security concern or vulnerability | `security@haiticity.org` |
| Licensing for commercial use | `licensing@haiticity.org` |
| Bug report or feature request | [Open an issue on GitHub](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose) |

You can also visit the project on [GitHub](https://github.com/haitiansintech/HaitiCityPortal) to see all activity, read the code, and contribute.

[↑ Back to top](#table-of-contents)

---

[← Docs index](README.md) · [Glossary](GLOSSARY.md) · [Deployment →](DEPLOYMENT.md)
