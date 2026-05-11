<!--
Languages: English (this file) | Français (0001-multi-tenant-via-subdomain.fr.md) | Kreyòl (0001-multi-tenant-via-subdomain.ht.md) | Español (0001-multi-tenant-via-subdomain.es.md)
-->

**Languages:** **English** · [Français](0001-multi-tenant-via-subdomain.fr.md) · [Kreyòl Ayisyen](0001-multi-tenant-via-subdomain.ht.md) · [Español](0001-multi-tenant-via-subdomain.es.md)

[← ADR index](README.md) · [Architecture](../ARCHITECTURE.md)

---

# 0001 — Multi-tenancy via subdomain + middleware

- **Status:** Accepted
- **Date:** 2025-09-01
- **Deciders:** project maintainers

## Context

Haiti City Portal must serve many communes from one running application, while keeping each commune's data strictly isolated. We considered three patterns:

1. **Database-per-tenant** — one Postgres database per commune.
2. **Schema-per-tenant** — one schema per commune in a shared database.
3. **Row-level scoping with `tenant_id`** — one shared schema, each row tagged with its tenant.

Constraints:
- Adding a new commune must require zero deploys and minimal IT work.
- Cross-tenant queries (e.g. "all officials") must remain rare or forbidden.
- Hosting on Vercel + Neon — both make multiple databases expensive.
- Most queries are tenant-scoped reads.

## Decision

We use **row-level scoping with `tenant_id`**. Tenant resolution happens in middleware: subdomain is extracted from the `Host` header and written to a server-side `x-tenant-subdomain` header that downstream Server Components read.

Every table (except `tenants` itself) has a `tenant_id uuid NOT NULL` column with a foreign key to `tenants.id`. Every query filters by it.

## Consequences

**Positive:**
- Adding a commune is one row insert plus a DNS wildcard already in place — no deploy.
- Single-database hosting cost.
- Trivial cross-tenant aggregations are possible (e.g. national statistics) without rejoining databases.

**Negative:**
- A bug that omits a `tenant_id` filter is a critical security issue. Mitigated by lint rules and code review.
- Backups are global; restoring a single commune requires extracting rows.
- Performance can degrade when one commune dominates the database.

**Neutral:**
- The `x-tenant-subdomain` header must never be trusted from external requests — middleware writes it.

## Alternatives considered

- **Database-per-tenant**: too expensive on Neon and operationally heavy.
- **Schema-per-tenant**: per-schema migrations are painful with Drizzle; benefits are marginal versus row scoping.
- **Path-based tenancy** (e.g. `/jacmel/services`): conflicts with locale prefixes (`/ht/services`) and gives a less professional URL.

[↑ Back to top](#0001--multi-tenancy-via-subdomain--middleware) · [← ADR index](README.md) · [Next: 0002 →](0002-uuid-primary-keys.md)
