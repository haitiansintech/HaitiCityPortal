<!--
Languages: English (this file) | Français (0003-mdx-content-vs-database.fr.md) | Kreyòl (0003-mdx-content-vs-database.ht.md) | Español (0003-mdx-content-vs-database.es.md)
-->

**Languages:** **English** · [Français](0003-mdx-content-vs-database.fr.md) · [Kreyòl Ayisyen](0003-mdx-content-vs-database.ht.md) · [Español](0003-mdx-content-vs-database.es.md)

[← ADR index](README.md) · [Architecture](../ARCHITECTURE.md)

---

# 0003 — Prose content in MDX files, not the database

- **Status:** Accepted
- **Date:** 2025-09-01
- **Deciders:** project maintainers

## Context

The portal needs prose content in four languages: service descriptions, news articles, legal pages. We had three options:

1. Store all content in the database.
2. Use a third-party headless CMS (Sanity, Contentful, Strapi, Decap).
3. Store content as MDX files in the repository.

Constraints:
- Translators should be able to edit content without a developer.
- We want a permanent, auditable history of every text change.
- We must avoid recurring SaaS costs that block low-resource municipalities.
- Content should be reviewable like code (PR + diff).

## Decision

Prose content lives in `src/content/**/*.mdx` files. UI labels (short strings) live in `messages/{locale}.json`. Dynamic, admin-edited multilingual fields use JSONB columns in the database.

Translators edit MDX files via the GitHub web UI; see [Content Guide](../CONTENT_GUIDE.md).

## Consequences

**Positive:**
- Free. No CMS subscription.
- Full audit trail (Git history).
- PRs review content alongside code.
- Locale fallback to English is a one-line filesystem read.
- Content is portable: an exported repo carries its content.

**Negative:**
- Content edits require redeploy in production (in dev, files are read at request time). Mitigated by Vercel's instant deploys.
- Translators must use GitHub. Onboarding a non-technical translator takes ~30 minutes.
- Bulk edits require either many PRs or coordinated CSV-style imports.

**Neutral:**
- A future admin UI to edit MDX in-browser is on the roadmap; the underlying storage stays the same.

## Alternatives considered

- **All-database content**: harder to translate without a CMS; no audit trail.
- **Headless CMS**: recurring cost; vendor lock-in; another login for editors.
- **Decap CMS** (open-source, Git-backed): considered as a future addition that *complements* MDX rather than replaces it.

[↑ Back to top](#0003--prose-content-in-mdx-files-not-the-database) · [← Previous: 0002](0002-uuid-primary-keys.md) · [ADR index](README.md)
