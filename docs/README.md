<!--
Languages: English (this file) | Français (README.fr.md) | Kreyòl (README.ht.md) | Español (README.es.md)
-->

**Languages:** **English** · [Français](README.fr.md) · [Kreyòl Ayisyen](README.ht.md) · [Español](README.es.md)

[← Back to project README](../README.md)

---

# Haiti City Portal — Documentation

Welcome. This index is the front door to every document in the project. Pick the doc that matches your role — you don't have to read everything.

## Table of Contents

- [Start here by audience](#start-here-by-audience)
- [All documents](#all-documents)
- [Reading order for a new contributor](#reading-order-for-a-new-contributor)
- [Reading order for a municipality](#reading-order-for-a-municipality)
- [How to suggest a doc change](#how-to-suggest-a-doc-change)
- [About translations](#about-translations)

---

## Start here by audience

| You are… | Start with |
|---|---|
| A **mayor, councillor, or city staff member** evaluating this for your municipality | [For Municipalities](FOR_MUNICIPALITIES.md) |
| A **developer** who wants to contribute code | [Architecture](ARCHITECTURE.md) → [Technical Notes](technical-notes.md) → [Contributing](../CONTRIBUTING.md) |
| A **system administrator / IT person** who has to deploy this | [Deployment](DEPLOYMENT.md) → [Tenant Onboarding](TENANT_ONBOARDING.md) |
| A **municipal staff member** who will use the admin panel | [Admin Manual](ADMIN_MANUAL.md) |
| A **translator or content editor** (no coding) | [Content Guide](CONTENT_GUIDE.md) |
| A **citizen** curious about what the project is | [For Municipalities](FOR_MUNICIPALITIES.md) (the "What it is" section) |
| **Confused by a word** in any document | [Glossary](GLOSSARY.md) |

---

## All documents

### Plain-language overviews

| Document | Purpose |
|---|---|
| [For Municipalities](FOR_MUNICIPALITIES.md) | Non-technical: what this is, what you need, what it costs, who to contact |
| [Glossary](GLOSSARY.md) | Plain definitions of every technical and Haitian-civic term used in the docs |
| [Code of Conduct](../CODE_OF_CONDUCT.md) | Expected behaviour for contributors and community members |

### Operations (deploy and run the portal)

| Document | Purpose |
|---|---|
| [Deployment](DEPLOYMENT.md) | Step-by-step: domain, DNS, hosting, database, environment variables, first deploy |
| [Tenant Onboarding](TENANT_ONBOARDING.md) | How to add a new city: create the tenant, configure subdomain, brand, seed officials, create the first admin |
| [Admin Manual](ADMIN_MANUAL.md) | How municipal staff use the admin panel day-to-day |
| [Content Guide](CONTENT_GUIDE.md) | How to translate or edit content via the GitHub website (no Git or coding required) |
| [Branch Protection](BRANCH_PROTECTION.md) | GitHub branch protection setup for repository administrators |

### Engineering

| Document | Purpose |
|---|---|
| [Architecture](ARCHITECTURE.md) | One-page architecture overview with diagram |
| [Technical Notes](technical-notes.md) | Deep-dive on tenants, content, auth, payments, maps |
| [Product Requirements (PRD)](haiti-city-portal-prd.md) | Complete feature list and target users |
| [Implementation Status](v0.1-implementation-plan.md) | Checkbox audit of what's built and what remains |
| [Architecture Decision Records (ADRs)](adr/README.md) | The "why" behind major technical choices |
| [Copilot Instructions](../copilot-instructions.md) | Hard rules for AI coding assistants and contributors |

### Policy

| Document | Purpose |
|---|---|
| [Security Policy](../SECURITY.md) | How to report a vulnerability and the project's security model |
| [Contributing](../CONTRIBUTING.md) | How to fork, contribute code, and translate |
| [License](../LICENSE.md) | Business Source License 1.1 (converts to Apache 2.0 on Dec 31, 2028) |

---

## Reading order for a new contributor

If you want to write code for this project, read in this order:

1. [Project README](../README.md) — what the product is, how to run it locally
2. [Architecture](ARCHITECTURE.md) — the diagram and the 6 hard rules
3. [Glossary](GLOSSARY.md) — keep this open in another tab
4. [Technical Notes](technical-notes.md) — go deep
5. [Copilot Instructions](../copilot-instructions.md) — coding rules
6. [Contributing](../CONTRIBUTING.md) — fork, branch, PR, CLA

---

## Reading order for a municipality

If you are a city official or IT lead evaluating this for your municipality:

1. [For Municipalities](FOR_MUNICIPALITIES.md) — **start here**
2. [Glossary](GLOSSARY.md) — bookmark for any unfamiliar word
3. [Deployment](DEPLOYMENT.md) — share with your IT person
4. [Tenant Onboarding](TENANT_ONBOARDING.md) — share with your IT person
5. [Admin Manual](ADMIN_MANUAL.md) — distribute to staff who will use the portal
6. [Content Guide](CONTENT_GUIDE.md) — distribute to your translators and communications team

---

## How to suggest a doc change

You don't need to install anything. From any document on GitHub:

1. Click the **pencil icon** in the upper right of the file view.
2. Edit the text in your browser.
3. Scroll down, write a short message describing your change, click **Propose changes**.
4. Click **Create pull request**.

That's it. A maintainer will review and merge.

If a phrase is unclear, a translation is wrong, a link is broken, or a section is missing — please open a Pull Request or [file an issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose).

---

## About translations

Every document in this folder is provided in four languages: English (`.md`), French (`.fr.md`), Haitian Creole (`.ht.md`), and Spanish (`.es.md`). The English version is the source of truth — when you change a fact in English, please update the other three versions as well, or open an issue noting which translations need updating.

Translations of this initial documentation set were produced by contributors and may benefit from native-speaker review. If you spot an awkward phrase or a mistranslation, please open a PR or an issue — corrections are very welcome.

---

[↑ Back to top](#haiti-city-portal--documentation) · [Project README](../README.md)
