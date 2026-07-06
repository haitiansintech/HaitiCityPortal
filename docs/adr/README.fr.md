<!--
Langues : English (README.md) | Français (ce fichier) | Kreyòl (README.ht.md) | Español (README.es.md)
-->

**Langues :** [English](README.md) · **Français** · [Kreyòl Ayisyen](README.ht.md) · [Español](README.es.md)

[← Index de la documentation](../README.fr.md) · [README du projet](../../README.md) · [Glossaire](../GLOSSARY.fr.md)

---

# Décisions d'architecture (ADR)

Ce dossier consigne les *pourquoi* des grandes décisions techniques de Haiti City Portal. Les ADR sont courts et immuables — une fois acceptés, ils décrivent l'histoire. Si une décision est inversée, écrivez un nouvel ADR qui supplante l'ancien.

## Index

| # | Titre | Statut |
|---|---|---|
| [0001](0001-multi-tenant-via-subdomain.fr.md) | Multi-tenant par sous-domaine + middleware | Accepté |
| [0002](0002-uuid-primary-keys.fr.md) | Clés primaires UUID partout | Accepté |
| [0003](0003-mdx-content-vs-database.fr.md) | Contenu de prose en MDX, pas en base | Accepté |

## Ajouter un nouvel ADR

1. Numérotez le fichier (`NNNN-titre-court.fr.md`).
2. Utilisez le modèle ci-dessous.
3. Soumettez une PR. Discussion dans la PR.
4. Une fois fusionné : statut « Accepté ».
5. Liez le nouvel ADR depuis cet index.

## Modèle

```markdown
# NNNN — Titre

- **Statut :** Proposé | Accepté | Supplanté par ADR-XXXX | Obsolète
- **Date :** AAAA-MM-JJ
- **Décideurs :** noms ou rôles

## Contexte

Quel problème ? Quelles contraintes ?

## Décision

Qu'avons-nous décidé ?

## Conséquences

Positives, négatives, neutres.

## Alternatives examinées

Quoi d'autre a été regardé, et pourquoi rejeté ?
```

[↑ Retour en haut](#décisions-darchitecture-adr) · [← Index de la documentation](../README.fr.md)
