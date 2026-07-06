**Langues :** [English](0003-mdx-content-vs-database.md) · **Français** · [Kreyòl Ayisyen](0003-mdx-content-vs-database.ht.md) · [Español](0003-mdx-content-vs-database.es.md)

[← Index des ADR](README.fr.md) · [Architecture](../ARCHITECTURE.fr.md)

---

# 0003 — Contenu de prose en MDX, pas en base

- **Statut :** Accepté
- **Date :** 2025-09-01
- **Décideurs :** mainteneurs du projet

## Contexte

Le portail a besoin de prose en quatre langues : descriptions de services, actualités, pages légales. Trois options : tout en base, CMS headless tiers (Sanity, Contentful…), fichiers MDX dans le dépôt.

Contraintes : édition par des traducteurs non-développeurs ; historique auditable ; pas d'abonnement SaaS récurrent qui bloque les communes à faibles ressources ; relecture type code (PR + diff).

## Décision

Prose dans `src/content/**/*.mdx`. Étiquettes courtes dans `messages/{locale}.json`. Champs dynamiques admin en colonnes JSONB.

Les traducteurs éditent via GitHub web ; voir [Guide de contenu](../CONTENT_GUIDE.fr.md).

## Conséquences

**Positives :** gratuit ; historique Git complet ; PR pour le contenu comme pour le code ; repli locale = simple lecture fichier ; contenu portable.

**Négatives :** changements en prod nécessitent redéploiement (Vercel le rend instantané) ; les traducteurs doivent apprendre GitHub (~30 min) ; éditions en masse via PR multiples ou imports CSV.

**Neutres :** future UI admin pour éditer du MDX en navigateur prévue ; stockage identique.

## Alternatives examinées

- **Tout en base** : traduction difficile sans CMS ; pas d'historique.
- **CMS headless** : coût récurrent ; verrou éditeur ; nouveau login pour les éditeurs.
- **Decap CMS** (Git, open-source) : ajout futur qui *complète* MDX plutôt que de le remplacer.

[↑ Retour en haut](#0003--contenu-de-prose-en-mdx-pas-en-base) · [← Précédent : 0002](0002-uuid-primary-keys.fr.md) · [Index des ADR](README.fr.md)
