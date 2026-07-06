<!--
Lang yo: English (0001-multi-tenant-via-subdomain.md) | Français (...fr.md) | Kreyòl (fichye sa a) | Español (...es.md)
-->

**Lang yo:** [English](0001-multi-tenant-via-subdomain.md) · [Français](0001-multi-tenant-via-subdomain.fr.md) · **Kreyòl Ayisyen** · [Español](0001-multi-tenant-via-subdomain.es.md)

[← Endèks ADR](README.ht.md) · [Achitekti](../ARCHITECTURE.ht.md)

---

# 0001 — Multi-tenant atravè soudomèn + middleware

- **Estati:** Aksepte
- **Dat:** 2025-09-01
- **Desidè:** mainteneurs pwojè a

## Kontèks

Pòtal la dwe sèvi anpil komin depi yon sèl aplikasyon, ak izolasyon estrik done yo. Twa modèl konsidere:

1. **Yon baz pa tenant**.
2. **Yon schema pa tenant** nan yon baz pataje.
3. **Scoping pa liy ak `tenant_id`** — schema pataje, chak liy make ak tenant li.

Kontrent: ajoute yon komin san redeplwaman; pri Vercel + Neon; majorite rekèt scoped.

## Desizyon

**Scoping pa liy ak `tenant_id`**. Rezolisyon tenant nan middleware: soudomèn ekstrè soti nan `Host` epi ekri nan antèt sèvè `x-tenant-subdomain` Server Components li.

Chak tab (sof `tenants`) gen yon kolòn `tenant_id uuid NOT NULL` ak FK sou `tenants.id`. Chak rekèt filtre sou li.

## Konsekans

**Pozitif:** ajoute yon komin = yon INSERT + DNS wildcard deja la; pri baz inik; agregasyon nasyonal trivial.

**Negatif:** yon `tenant_id` bliye = ensidan kritik (atenue pa revizyon kòd); backup global; pèfòmans afekte si yon komin dominan.

**Nyout:** `x-tenant-subdomain` *pa janm* kwè soti nan kliyan — middleware ekri li.

## Altènativ konsidere

- **Baz pa tenant**: twò chè, lou pou opere.
- **Schema pa tenant**: migrasyon Drizzle difisil; benefis maj.
- **Tenant pa chemen** (`/jacmel/services`): konfli ak prefiks lokal ak URL mwens pwofesyonèl.

[↑ Retounen anwo](#0001--multi-tenant-atravè-soudomèn--middleware) · [← Endèks ADR](README.ht.md) · [Pwochen: 0002 →](0002-uuid-primary-keys.ht.md)
