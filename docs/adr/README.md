<!--
Languages: English (this file) | Français (README.fr.md) | Kreyòl (README.ht.md) | Español (README.es.md)
-->

**Languages:** **English** · [Français](README.fr.md) · [Kreyòl Ayisyen](README.ht.md) · [Español](README.es.md)

[← Docs index](../README.md) · [Project README](../../README.md) · [Glossary](../GLOSSARY.md)

---

# Architecture Decision Records (ADRs)

This folder records the *why* behind major technical decisions in Haiti City Portal. ADRs are short, immutable documents — once accepted, they describe history. If a decision is reversed, write a new ADR that supersedes the old one.

## Index

| # | Title | Status |
|---|---|---|
| [0001](0001-multi-tenant-via-subdomain.md) | Multi-tenancy via subdomain + middleware | Accepted |
| [0002](0002-uuid-primary-keys.md) | UUID primary keys for every table | Accepted |
| [0003](0003-mdx-content-vs-database.md) | Prose content in MDX files, not the database | Accepted |

## How to add a new ADR

1. Number the file sequentially (`NNNN-short-title.md`).
2. Use the template below.
3. Submit a Pull Request. Discuss in the PR.
4. When merged, the status becomes "Accepted".
5. Link to the new ADR from this index.

## ADR template

```markdown
# NNNN — Title

- **Status:** Proposed | Accepted | Superseded by ADR-XXXX | Deprecated
- **Date:** YYYY-MM-DD
- **Deciders:** names or roles

## Context

What is the problem? What constraints exist?

## Decision

What did we decide?

## Consequences

Positive, negative, and neutral results.

## Alternatives considered

What else did we look at, and why did we reject it?
```

[↑ Back to top](#architecture-decision-records-adrs) · [← Docs index](../README.md)
