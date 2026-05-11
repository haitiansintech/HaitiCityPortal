<!--
Languages: English (this file) | Français (0002-uuid-primary-keys.fr.md) | Kreyòl (0002-uuid-primary-keys.ht.md) | Español (0002-uuid-primary-keys.es.md)
-->

**Languages:** **English** · [Français](0002-uuid-primary-keys.fr.md) · [Kreyòl Ayisyen](0002-uuid-primary-keys.ht.md) · [Español](0002-uuid-primary-keys.es.md)

[← ADR index](README.md) · [Architecture](../ARCHITECTURE.md)

---

# 0002 — UUID primary keys for every table

- **Status:** Accepted
- **Date:** 2025-09-01
- **Deciders:** project maintainers

## Context

Every table needs a primary key. The two common choices are sequential integers (`SERIAL` / `BIGSERIAL`) and UUIDs.

Project constraints:
- Offline support is on the roadmap. Forms submitted offline must generate IDs that won't collide when synced.
- Multi-tenant: leaking sequential IDs across tenants exposes business volume (e.g. "they only have 12 users").
- We want IDs that look the same in URLs across all tenants — no `/requests/1` vs `/requests/14882`.

## Decision

Every primary key is `uuid("id").defaultRandom().primaryKey()`. No exceptions.

Foreign keys reference these UUIDs.

## Consequences

**Positive:**
- Offline ID generation is safe.
- Tenant isolation is preserved: looking at a UUID tells you nothing about volume.
- URLs are uniform across tenants.

**Negative:**
- UUIDs are larger (16 bytes vs 4 or 8) — minor storage and index overhead.
- UUIDs are not human-readable. Mitigated by adding human-readable codes (e.g. `JAC-TAX-8821` memo codes) where users see IDs.
- B-tree fragmentation with random UUIDs can be a concern at scale; we accept the tradeoff and may revisit with UUIDv7 later.

**Neutral:**
- All migrations and ORM generators now produce UUIDs by default; new contributors must remember the rule.

## Alternatives considered

- **Sequential integers**: violates offline-ID and tenant-isolation requirements.
- **UUIDv7 / ULID**: time-ordered alternatives that improve B-tree locality. Acceptable upgrade path; not blocking now.

[↑ Back to top](#0002--uuid-primary-keys-for-every-table) · [← Previous: 0001](0001-multi-tenant-via-subdomain.md) · [ADR index](README.md) · [Next: 0003 →](0003-mdx-content-vs-database.md)
