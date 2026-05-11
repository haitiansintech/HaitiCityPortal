**Langues :** [English](0002-uuid-primary-keys.md) · **Français** · [Kreyòl Ayisyen](0002-uuid-primary-keys.ht.md) · [Español](0002-uuid-primary-keys.es.md)

[← Index des ADR](README.fr.md) · [Architecture](../ARCHITECTURE.fr.md)

---

# 0002 — Clés primaires UUID partout

- **Statut :** Accepté
- **Date :** 2025-09-01
- **Décideurs :** mainteneurs du projet

## Contexte

Toute table a besoin d'une PK. Choix classiques : entiers séquentiels ou UUID.

Contraintes : mode hors-ligne (génération sans collision) ; multi-tenant (les IDs séquentiels révèlent le volume) ; URLs uniformes entre communes.

## Décision

Chaque PK est `uuid("id").defaultRandom().primaryKey()`. Pas d'exception. Les FK référencent ces UUID.

## Conséquences

**Positives :** génération hors-ligne sûre ; isolation tenant préservée ; URLs uniformes.

**Négatives :** taille (16 vs 4–8 octets) ; non-lisibles (atténué par codes mémo `JAC-TAX-8821`) ; fragmentation B-tree à grande échelle (UUIDv7 en option future).

**Neutres :** règle à connaître pour tout nouveau contributeur.

## Alternatives examinées

- **Entiers séquentiels** : violent les exigences hors-ligne et isolation.
- **UUIDv7 / ULID** : voie de migration acceptable plus tard.

[↑ Retour en haut](#0002--clés-primaires-uuid-partout) · [← Précédent : 0001](0001-multi-tenant-via-subdomain.fr.md) · [Index des ADR](README.fr.md) · [Suivant : 0003 →](0003-mdx-content-vs-database.fr.md)
