**Lang yo:** [English](0002-uuid-primary-keys.md) · [Français](0002-uuid-primary-keys.fr.md) · **Kreyòl Ayisyen** · [Español](0002-uuid-primary-keys.es.md)

[← Endèks ADR](README.ht.md) · [Achitekti](../ARCHITECTURE.ht.md)

---

# 0002 — Kle prensipal UUID nan tout tab

- **Estati:** Aksepte
- **Dat:** 2025-09-01
- **Desidè:** mainteneurs pwojè a

## Kontèks

Chak tab bezwen yon PK. Chwa: antye sekansyèl oswa UUID.

Kontrent: mòd ofliy (jenerasyon san kolizyon); multi-tenant (ID sekansyèl revele volim); URL inifòm ant komin.

## Desizyon

Chak PK se `uuid("id").defaultRandom().primaryKey()`. Pa gen eksepsyon. FK refere UUID sa yo.

## Konsekans

**Pozitif:** jenerasyon ofliy san pwoblèm; izolasyon tenant pwoteje; URL inifòm.

**Negatif:** gwosè (16 vs 4–8 byte); pa lizib (atenue ak kòd memo `JAC-TAX-8821`); fragmentasyon B-tree sou gwo echèl (UUIDv7 opsyon pou pita).

**Nyout:** règ pou chak nouvo kontribitè dwe konnen.

## Altènativ konsidere

- **Antye sekansyèl**: vyole egzijans ofliy ak izolasyon.
- **UUIDv7 / ULID**: chemen migrasyon akseptab pou pita.

[↑ Retounen anwo](#0002--kle-prensipal-uuid-nan-tout-tab) · [← Anvan: 0001](0001-multi-tenant-via-subdomain.ht.md) · [Endèks ADR](README.ht.md) · [Pwochen: 0003 →](0003-mdx-content-vs-database.ht.md)
