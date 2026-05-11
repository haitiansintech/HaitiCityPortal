<!--
Lang yo: English (README.md) | Français (README.fr.md) | Kreyòl (fichye sa a) | Español (README.es.md)
-->

**Lang yo:** [English](README.md) · [Français](README.fr.md) · **Kreyòl Ayisyen** · [Español](README.es.md)

[← Endèks dokimantasyon](../README.ht.md) · [README pwojè a](../../README.md) · [Glosè](../GLOSSARY.ht.md)

---

# Dosye Desizyon Achitekti (ADR)

Dosye sa a anrejistre *poukisa* dèyè desizyon teknik enpòtan nan Haiti City Portal. ADR yo se dokiman kout, imuab — yon fwa aksepte, yo dekri istwa. Si yon desizyon ranvèse, ekri yon nouvo ADR ki ranplase ansyen an.

## Endèks

| # | Tit | Estati |
|---|---|---|
| [0001](0001-multi-tenant-via-subdomain.ht.md) | Multi-tenant atravè soudomèn + middleware | Aksepte |
| [0002](0002-uuid-primary-keys.ht.md) | Kle prensipal UUID toupatou | Aksepte |
| [0003](0003-mdx-content-vs-database.ht.md) | Kontni prose nan MDX, pa nan baz done | Aksepte |

## Ajoute yon nouvo ADR

1. Nimewote fichye (`NNNN-tit-kout.ht.md`).
2. Itilize modèl anba a.
3. Soumèt yon PR. Diskite nan PR a.
4. Yon fwa fizyone: estati « Aksepte ».
5. Lye nouvo ADR la soti nan endèks sa a.

## Modèl

```markdown
# NNNN — Tit

- **Estati:** Pwopoze | Aksepte | Ranplase pa ADR-XXXX | Obsolet
- **Dat:** AAAA-MM-JJ
- **Desidè:** non oswa wòl

## Kontèks

Ki pwoblèm? Ki kontrent?

## Desizyon

Sa nou deside?

## Konsekans

Pozitif, negatif, nyout.

## Altènativ konsidere

Sa lòt nou te gade, epi poukisa rejte?
```

[↑ Retounen anwo](#dosye-desizyon-achitekti-adr) · [← Endèks dokimantasyon](../README.ht.md)
