<!--
Langues : English (README.md) | Français (ce fichier) | Kreyòl (README.ht.md) | Español (README.es.md)
-->

**Langues :** [English](README.md) · **Français** · [Kreyòl Ayisyen](README.ht.md) · [Español](README.es.md)

[← Retour au README du projet](../README.md)

---

# Haiti City Portal — Documentation

Bienvenue. Cet index est la porte d'entrée de tous les documents du projet. Choisissez le document qui correspond à votre rôle — vous n'avez pas besoin de tout lire.

## Sommaire

- [Commencer ici selon votre rôle](#commencer-ici-selon-votre-rôle)
- [Tous les documents](#tous-les-documents)
- [Ordre de lecture pour un nouveau contributeur](#ordre-de-lecture-pour-un-nouveau-contributeur)
- [Ordre de lecture pour une municipalité](#ordre-de-lecture-pour-une-municipalité)
- [Comment proposer une modification](#comment-proposer-une-modification)
- [À propos des traductions](#à-propos-des-traductions)

---

## Commencer ici selon votre rôle

| Vous êtes… | Commencez par |
|---|---|
| **Maire, conseiller ou agent municipal** qui évalue le projet pour sa municipalité | [Pour les municipalités](FOR_MUNICIPALITIES.fr.md) |
| **Développeur** souhaitant contribuer au code | [Architecture](ARCHITECTURE.fr.md) → [Notes techniques](technical-notes.md) → [Contribuer](../CONTRIBUTING.md) |
| **Administrateur système / informaticien** qui doit déployer le projet | [Déploiement](DEPLOYMENT.fr.md) → [Intégration d'une commune](TENANT_ONBOARDING.fr.md) |
| **Agent municipal** qui utilisera le panneau d'administration | [Manuel d'administration](ADMIN_MANUAL.fr.md) |
| **Traducteur ou éditeur de contenu** (sans coder) | [Guide de contenu](CONTENT_GUIDE.fr.md) |
| **Citoyen** curieux de savoir ce que c'est | [Pour les municipalités](FOR_MUNICIPALITIES.fr.md) (section « Qu'est-ce que c'est ») |
| **Vous ne comprenez pas un mot** dans un document | [Glossaire](GLOSSARY.fr.md) |

---

## Tous les documents

### Vue d'ensemble en langage clair

| Document | Objet |
|---|---|
| [Pour les municipalités](FOR_MUNICIPALITIES.fr.md) | Non technique : ce que c'est, ce qu'il vous faut, ce que ça coûte, qui contacter |
| [Glossaire](GLOSSARY.fr.md) | Définitions claires de tous les termes techniques et civiques haïtiens utilisés |
| [Code de conduite](../CODE_OF_CONDUCT.fr.md) | Comportement attendu des contributeurs et des membres de la communauté |

### Exploitation (déployer et faire tourner le portail)

| Document | Objet |
|---|---|
| [Déploiement](DEPLOYMENT.fr.md) | Étape par étape : domaine, DNS, hébergement, base de données, variables, premier déploiement |
| [Intégration d'une commune](TENANT_ONBOARDING.fr.md) | Comment ajouter une nouvelle ville : créer le tenant, configurer le sous-domaine, l'image de marque, les officiels, le premier admin |
| [Manuel d'administration](ADMIN_MANUAL.fr.md) | Comment le personnel municipal utilise le panneau au quotidien |
| [Guide de contenu](CONTENT_GUIDE.fr.md) | Traduire ou modifier du contenu via le site GitHub (aucun outil à installer) |
| [Protection de branche](BRANCH_PROTECTION.md) | Configuration de la protection de la branche `main` pour les administrateurs du dépôt |

### Ingénierie

| Document | Objet |
|---|---|
| [Architecture](ARCHITECTURE.fr.md) | Vue d'ensemble en une page avec diagramme |
| [Notes techniques](technical-notes.md) | Approfondissement : tenants, contenu, authentification, paiements, cartes |
| [Exigences produit (PRD)](haiti-city-portal-prd.md) | Liste complète des fonctionnalités et des utilisateurs cibles |
| [État de l'implémentation](v0.1-implementation-plan.md) | Inventaire à cocher de ce qui est fait et ce qui reste |
| [Décisions d'architecture (ADR)](adr/README.fr.md) | Les « pourquoi » derrière les choix techniques majeurs |
| [Instructions Copilot](../copilot-instructions.md) | Règles strictes pour les assistants IA et les contributeurs |

### Politique

| Document | Objet |
|---|---|
| [Politique de sécurité](../SECURITY.md) | Comment signaler une vulnérabilité et le modèle de sécurité du projet |
| [Contribuer](../CONTRIBUTING.md) | Comment forker, contribuer au code et traduire |
| [Licence](../LICENSE.md) | Business Source License 1.1 (devient Apache 2.0 le 31 décembre 2028) |

---

## Ordre de lecture pour un nouveau contributeur

Pour écrire du code dans ce projet :

1. [README du projet](../README.md) — ce qu'est le produit et comment le lancer localement
2. [Architecture](ARCHITECTURE.fr.md) — le diagramme et les 6 règles strictes
3. [Glossaire](GLOSSARY.fr.md) — gardez-le ouvert dans un autre onglet
4. [Notes techniques](technical-notes.md) — approfondissement
5. [Instructions Copilot](../copilot-instructions.md) — règles de codage
6. [Contribuer](../CONTRIBUTING.md) — fork, branche, PR, CLA

---

## Ordre de lecture pour une municipalité

Si vous êtes un élu ou un responsable informatique évaluant le projet :

1. [Pour les municipalités](FOR_MUNICIPALITIES.fr.md) — **commencez ici**
2. [Glossaire](GLOSSARY.fr.md) — gardez-le sous la main
3. [Déploiement](DEPLOYMENT.fr.md) — partagez avec votre informaticien
4. [Intégration d'une commune](TENANT_ONBOARDING.fr.md) — partagez avec votre informaticien
5. [Manuel d'administration](ADMIN_MANUAL.fr.md) — distribuez au personnel qui utilisera le portail
6. [Guide de contenu](CONTENT_GUIDE.fr.md) — distribuez à vos traducteurs et à votre équipe communication

---

## Comment proposer une modification

Aucun outil à installer. Depuis n'importe quel document sur GitHub :

1. Cliquez sur l'**icône crayon** en haut à droite du fichier.
2. Modifiez le texte directement dans votre navigateur.
3. Descendez, décrivez brièvement votre changement, cliquez **Propose changes**.
4. Cliquez **Create pull request**.

C'est tout. Un mainteneur examinera et fusionnera.

Si une phrase n'est pas claire, qu'une traduction est fausse, qu'un lien est cassé, ou qu'une section manque — ouvrez une Pull Request ou [créez une issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose).

---

## À propos des traductions

Chaque document est fourni en quatre langues : anglais (`.md`), français (`.fr.md`), créole haïtien (`.ht.md`), espagnol (`.es.md`). La version anglaise fait foi — quand vous modifiez un fait en anglais, mettez aussi à jour les trois autres versions, ou ouvrez une issue précisant les traductions à actualiser.

Les traductions initiales ont été produites par des contributeurs et bénéficieront d'une relecture par des locuteurs natifs. Toute correction est la bienvenue via Pull Request ou issue.

---

[↑ Retour en haut](#haiti-city-portal--documentation) · [README du projet](../README.md)
