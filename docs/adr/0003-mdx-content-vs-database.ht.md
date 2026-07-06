**Lang yo:** [English](0003-mdx-content-vs-database.md) · [Français](0003-mdx-content-vs-database.fr.md) · **Kreyòl Ayisyen** · [Español](0003-mdx-content-vs-database.es.md)

[← Endèks ADR](README.ht.md) · [Achitekti](../ARCHITECTURE.ht.md)

---

# 0003 — Kontni prose nan MDX, pa nan baz done

- **Estati:** Aksepte
- **Dat:** 2025-09-01
- **Desidè:** mainteneurs pwojè a

## Kontèks

Pòtal la bezwen prose nan kat lang: deskripsyon sèvis, atik nouvèl, paj legal. Twa opsyon: tout nan baz, CMS headless tyès pati (Sanity, Contentful…), fichye MDX nan depo.

Kontrent: tradiksyon pa moun ki pa devlopè; istwa odit; pa gen abònman SaaS k ap bloke komin ki gen ti resous; revizyon menm jan ak kòd (PR + diff).

## Desizyon

Prose nan `src/content/**/*.mdx`. Etikèt kout nan `messages/{locale}.json`. Chan dinamik admin nan kolòn JSONB.

Tradiktè edite atravè GitHub web; wè [Gid Kontni](../CONTENT_GUIDE.ht.md).

## Konsekans

**Pozitif:** gratis; istwa Git konplè; PR pou kontni menm jan ak kòd; sekou lokal = senp lekti fichye; kontni pòtatif.

**Negatif:** chanjman an pwodiksyon mande redeplwaman (Vercel rann li enstantane); tradiktè dwe aprann GitHub (~30 min); edisyon an mas atravè PR miltip oswa enpòt CSV.

**Nyout:** UI admin pou edite MDX nan navigatè prevwa; estokaj rete menm.

## Altènativ konsidere

- **Tout nan baz**: tradiksyon difisil san CMS; pa gen istwa.
- **CMS headless**: pri rekiran; vèrou; nouvo login pou editè.
- **Decap CMS** (Git, kòd louvri): ajou fiti ki *konplete* MDX olye ranplase.

[↑ Retounen anwo](#0003--kontni-prose-nan-mdx-pa-nan-baz-done) · [← Anvan: 0002](0002-uuid-primary-keys.ht.md) · [Endèks ADR](README.ht.md)
