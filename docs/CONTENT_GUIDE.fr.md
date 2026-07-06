<!--
Langues : English (CONTENT_GUIDE.md) | Français (ce fichier) | Kreyòl (CONTENT_GUIDE.ht.md) | Español (CONTENT_GUIDE.es.md)
-->

**Langues :** [English](CONTENT_GUIDE.md) · **Français** · [Kreyòl Ayisyen](CONTENT_GUIDE.ht.md) · [Español](CONTENT_GUIDE.es.md)

[← Index de la documentation](README.fr.md) · [README du projet](../README.md) · [Glossaire](GLOSSARY.fr.md)

---

# Guide de contenu

Comment traduire ou modifier du contenu **sans rien installer** — il suffit d'un navigateur et d'un compte GitHub. Pour les traducteurs, équipes communication, et toute personne qui veut améliorer les textes du portail.

## Sommaire

- [Ce que vous pouvez modifier](#ce-que-vous-pouvez-modifier)
- [Créer un compte GitHub](#créer-un-compte-github)
- [Modifier un fichier dans GitHub](#modifier-un-fichier-dans-github)
- [Modifier une étiquette UI (`messages/*.json`)](#modifier-une-étiquette-ui-messagesjson)
- [Traduire la description d'un service](#traduire-la-description-dun-service)
- [Ajouter une actualité](#ajouter-une-actualité)
- [Modifier une page statique (À propos, Confidentialité, Conditions)](#modifier-une-page-statique-à-propos-confidentialité-conditions)
- [Bases du Markdown](#bases-du-markdown)
- [Aide-mémoire frontmatter](#aide-mémoire-frontmatter)
- [Erreurs fréquentes](#erreurs-fréquentes)
- [Obtenir de l'aide](#obtenir-de-laide)

---

## Ce que vous pouvez modifier

Tout est du texte. Trois emplacements :

| Type | Emplacement | Exemple |
|---|---|---|
| Étiquettes UI (textes courts) | `messages/{locale}.json` | « Soumettre », menu de navigation |
| Services, actualités, pages légales | `src/content/**/*.mdx` | Page service ramassage, article ouragan |
| Traductions | Mêmes fichiers avec suffixe `.fr.`, `.ht.`, `.es.` | `services/trash.fr.mdx` |

Tout passe par l'interface GitHub. Aucun logiciel à installer.

[↑ Retour en haut](#sommaire)

---

## Créer un compte GitHub

Si vous en avez déjà un, passez.

1. <https://github.com/signup>.
2. Email, mot de passe, nom d'utilisateur.
3. Confirmez l'email de vérification.
4. (Optionnel) Photo et fonction à la mairie.

C'est tout. Plan gratuit suffisant.

[↑ Retour en haut](#sommaire)

---

## Modifier un fichier dans GitHub

Cinq étapes pour toute modification :

1. Connectez-vous sur <https://github.com>.
2. Allez sur le fichier (liens plus bas).
3. Cliquez l'**icône crayon** en haut à droite.
4. Modifiez dans le navigateur.
5. Descendez. Choisissez **Create a new branch for this commit and start a pull request** (par défaut). **Propose changes**.
6. Sur l'écran suivant : **Create pull request**.

Un mainteneur examine et fusionne. Quelques minutes après la fusion, votre changement est en ligne.

Si vous n'avez pas l'accès en écriture sur le dépôt principal, GitHub vous proposera de **forker** — acceptez.

[↑ Retour en haut](#sommaire)

---

## Modifier une étiquette UI (`messages/*.json`)

Étiquettes courtes : navbar, boutons, formulaires.

| Langue | Fichier |
|---|---|
| Anglais | [`messages/en.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/en.json) |
| Français | [`messages/fr.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/fr.json) |
| Créole haïtien | [`messages/ht.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/ht.json) |
| Espagnol | [`messages/es.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/es.json) |

### Exemple : améliorer une traduction française

```json
{
  "Nav": {
    "home": "Accueil",
    "services": "Services",
    "report": "Signaler",
    "pay": "Payer"
  }
}
```

Pour changer « Signaler » en « Signaler un problème » :

1. Crayon.
2. Modifier la **valeur** (à droite des deux-points, entre guillemets).
3. PR.

> **Important :** ne renommez **jamais** les **clés** (gauche : `home`, `services`…). Seules les **valeurs** changent.

> **Important :** toute nouvelle clé dans `en.json` doit exister dans les **quatre** fichiers. Sinon `MISSING_MESSAGE` à l'écran.

[↑ Retour en haut](#sommaire)

---

## Traduire la description d'un service

Fichiers MDX dans [`src/content/services/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content/services).

Base : `{slug}.mdx` (anglais). Traductions : `{slug}.fr.mdx`, `.ht.mdx`, `.es.mdx`.

### Exemple : ajouter la version française pour « Trash Collection »

1. Ouvrez l'anglais : [`src/content/services/trash.mdx`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/src/content/services/trash.mdx).
2. Copiez tout.
3. Dans `src/content/services/` → **Add file → Create new file**.
4. Nom : `trash.fr.mdx`.
5. Collez et traduisez le frontmatter :

```yaml
---
title: Collecte des ordures
description: Service municipal de collecte des ordures.
steps:
  - Mettez vos ordures dans le sac officiel
  - Sortez-le avant 6 h le jour de collecte
  - Vérifiez l'horaire de votre quartier
documents:
  - Aucun document requis
fees: Gratuit
---
```

6. Traduisez le corps en Markdown.
7. PR.

Si vous ne traduisez qu'une partie, c'est OK — repli automatique sur l'anglais.

> **Important :** gardez les **noms de champs** (`title`, `description`…) en anglais. Ne traduisez que les **valeurs**.

[↑ Retour en haut](#sommaire)

---

## Ajouter une actualité

Fichiers MDX dans [`src/content/news/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content/news).

Nommage : `YYYY-MM-DD-{slug}.mdx`.

### Exemple : préparation cyclonique, mai 2026

1. `src/content/news/` → **Add file → Create new file**.
2. Nom : `2026-05-20-prep-saison-cyclonique.fr.mdx`.
3. Collez :

```mdx
---
date: "20 mai 2026"
dateISO: "2026-05-20"
title: "Préparation à la saison cyclonique"
description: "Ce que chaque famille doit faire avant le 1er juin."
---

La saison cyclonique haïtienne débute le 1er juin. Le bureau du maire invite chaque foyer à préparer une trousse d'urgence pour 72 heures :

- Eau potable (4 litres par personne et par jour)
- Aliments non périssables
- Lampe torche et piles de rechange
- Radio à piles
- Trousse de premiers soins
- Copies des pièces d'identité dans un sac étanche

Les abris publics seront ouverts au besoin. Liste à /directory.
```

4. PR.

Pour les autres langues : répétez avec `.mdx`, `.ht.mdx`, `.es.mdx`.

> **Astuce :** dates `YYYY-MM-DD` exactement, tri automatique du plus récent au plus ancien.

[↑ Retour en haut](#sommaire)

---

## Modifier une page statique (À propos, Confidentialité, Conditions)

Pages à la racine de [`src/content/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content). Même format.

| Page | Fichier |
|---|---|
| À propos | `about.mdx` (+ `.fr.mdx`, `.ht.mdx`, `.es.mdx`) |
| Confidentialité | `privacy.mdx` |
| Conditions | `terms.mdx` |
| Tech | `tech.mdx` |

[↑ Retour en haut](#sommaire)

---

## Bases du Markdown

| Syntaxe | Rendu |
|---|---|
| `# Titre 1` | Grand titre |
| `## Titre 2` | Titre de section |
| `### Titre 3` | Sous-section |
| `**gras**` | **gras** |
| `*italique*` | *italique* |
| `- item` | liste à puces |
| `1. item` | liste numérotée |
| `[texte](https://exemple.com)` | [texte](https://exemple.com) |
| `![alt](image.jpg)` | image |
| `> citation` | citation |
| ` `code` ` | code en ligne |

[↑ Retour en haut](#sommaire)

---

## Aide-mémoire frontmatter

YAML entre deux `---`.

### Service

```yaml
---
title: Nom du service
description: Description en une ligne
steps:
  - Étape 1
  - Étape 2
documents:
  - Document requis
fees: Tarif (texte)
---
```

### Actualité

```yaml
---
date: "JJ mois AAAA"
dateISO: "AAAA-MM-JJ"
title: "Titre"
description: "Extrait court."
---
```

### Page statique

```yaml
---
title: Titre
description: Description courte
---
```

> **YAML :** chaînes avec deux-points entre guillemets. Listes avec `- `. Indentation : 2 espaces, jamais de tabulation.

[↑ Retour en haut](#sommaire)

---

## Erreurs fréquentes

| Erreur | Résultat | Correction |
|---|---|---|
| Clé JSON renommée | `MISSING_MESSAGE` | Remettre la clé d'origine |
| `---` de fermeture du frontmatter manquant | Page vide / erreur | Ajouter le `---` |
| Mauvais nom de traduction | Ignorée | Respecter `slug.fr.mdx`… |
| `dateISO` mal formaté | Article disparaît | `YYYY-MM-DD` strictement |
| Indentation YAML cassée | Erreur | 2 espaces |
| Italique avec `_underscore_` | Comportement variable | Préférer `*` |
| Virgule en trop dans JSON | Fichier illisible | Supprimer |

Échec CI sur la PR : lisez le message en bas de la PR, il indique la ligne.

[↑ Retour en haut](#sommaire)

---

## Obtenir de l'aide

- Bloqué sur une traduction ? Ouvrez la PR avec « relecture native demandée » dans la description.
- Bloqué sur Git/GitHub ? Issue : <https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose>.
- Question générale : `info@haiticity.org`.

Les contributions de contenu sont parmi les plus importantes — un beau code sans bons textes ne sert à personne.

[↑ Retour en haut](#sommaire)

---

[← Index de la documentation](README.fr.md) · [Manuel d'administration](ADMIN_MANUAL.fr.md) · [Architecture →](ARCHITECTURE.fr.md)
