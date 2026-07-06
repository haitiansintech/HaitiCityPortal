<!--
Langues : English (GLOSSARY.md) | Français (ce fichier) | Kreyòl (GLOSSARY.ht.md) | Español (GLOSSARY.es.md)
-->

**Langues :** [English](GLOSSARY.md) · **Français** · [Kreyòl Ayisyen](GLOSSARY.ht.md) · [Español](GLOSSARY.es.md)

[← Index de la documentation](README.fr.md) · [README du projet](../README.md)

---

# Glossaire

Définitions en langage clair de tous les termes techniques, civiques et propres à Haïti utilisés dans cette documentation. Si un mot vous bloque, cherchez-le ici. Si un terme manque, [ouvrez une Pull Request](https://github.com/haitiansintech/HaitiCityPortal/edit/main/docs/GLOSSARY.fr.md) ou [créez une issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose).

## Sommaire

- [Termes civiques et haïtiens](#termes-civiques-et-haïtiens)
- [Termes techniques](#termes-techniques)
- [Termes d'exploitation](#termes-dexploitation)
- [Termes propres au projet](#termes-propres-au-projet)
- [Sigles](#sigles)

---

## Termes civiques et haïtiens

| Terme | Sens |
|---|---|
| **CASEC** | *Conseil d'Administration de la Section Communale*. Le conseil élu de trois personnes qui gouverne une *section communale*. |
| **ASEC** | *Assemblée de la Section Communale*. L'assemblée législative élue d'une section communale, à côté du CASEC. |
| **Commune** | Une municipalité en Haïti — équivalent d'une ville. Chaque commune a un maire ; c'est le niveau que dessert ce portail. |
| **Section communale** | Sous-unité géographique d'une commune, gouvernée par un CASEC + ASEC. |
| **Maire** | Chef élu d'une commune. |
| **Délégué de ville** | Représentant nommé par le gouvernement central dans une commune. |
| **MonCash** | Le service d'argent mobile le plus utilisé en Haïti, opéré par Digicel. Beaucoup de résidents paient leurs factures via MonCash. |
| **NIF** | *Numéro d'Identification Fiscale*. Identifiant fiscal haïtien — requis pour la plupart des démarches officielles. |
| **CIN** | *Carte d'Identification Nationale*. La carte d'identité nationale haïtienne. |
| **Quittance** | Reçu ou preuve de paiement. Le portail émet une quittance lorsqu'un paiement est vérifié. |
| **Open311** | Norme internationale ouverte permettant aux citoyens de signaler des problèmes non urgents (nids-de-poule, ordures, éclairage) à une municipalité. Le formulaire `/report` du portail suit cette norme. |

---

## Termes techniques

| Terme | Sens |
|---|---|
| **Frontend** | Partie d'une application qui s'exécute dans le navigateur de l'utilisateur (pages, formulaires, boutons). |
| **Backend** | Partie qui s'exécute sur un serveur : connexion, base de données, paiements. L'utilisateur ne voit jamais le code backend. |
| **Full-stack** | Une application qui contient à la fois le frontend et le backend dans le même projet. Haiti City Portal est full-stack. |
| **Next.js** | Le framework web sur lequel le projet est construit. Il produit à la fois les pages (frontend) et la logique serveur (backend) à partir d'un seul code. |
| **App Router** | Le système de routage moderne de Next.js 13+ où chaque dossier sous `src/app/` devient une URL. |
| **React** | La bibliothèque JavaScript qu'utilise Next.js pour construire les interfaces. |
| **Server Component** | Page ou composant qui s'exécute côté serveur et envoie du HTML déjà prêt au navigateur. Plus rapide, meilleur pour le SEO, peut lire la base de données directement. |
| **Client Component** | Composant qui s'exécute dans le navigateur. Nécessaire pour les éléments interactifs (cartes, formulaires, animations). Marqué par `"use client"` en haut du fichier. |
| **Server Action** | Fonction backend appelable directement depuis un formulaire. Définie dans `src/app/actions/`. |
| **API route** | Point d'accès backend à une URL comme `/api/health`. |
| **Middleware** | Code qui s'exécute sur le serveur *avant* le rendu de la page. Ce projet l'utilise pour détecter la langue, identifier la ville (tenant) et protéger les pages admin. |
| **Base de données** | Où sont stockées les données dynamiques : villes, utilisateurs, demandes, paiements, événements. |
| **PostgreSQL (Postgres)** | Le moteur de base de données utilisé. Gratuit, open source, très répandu. |
| **Drizzle ORM** | Outil qui permet d'écrire les requêtes en TypeScript plutôt qu'en SQL brut. Le schéma est dans `src/db/schema.ts`. |
| **Schéma** | Plan de la base : quelles tables existent, quelles colonnes, quels types. |
| **Migration** | Fichier qui met à jour le schéma (ajoute une colonne, renomme une table). Drizzle les génère. |
| **Seeding** | Insérer des données de départ dans une base vide (ex. une ville de démo). Lancé avec `npm run db:seed`. |
| **TypeScript** | Version de JavaScript avec vérification de types — détecte beaucoup d'erreurs avant l'exécution. |
| **Tailwind CSS** | Système de styles où l'on écrit de petites classes (`bg-blue-500 p-4`) directement dans le HTML. Le projet utilise Tailwind v4. |
| **shadcn/ui** | Bibliothèque de composants accessibles et personnalisables (boutons, boîtes de dialogue, champs) basés sur Tailwind. |
| **MDX** | Markdown enrichi de composants React. Les descriptions de services et articles d'actualité sont en MDX. |
| **Frontmatter** | Le bloc YAML en haut d'un fichier MDX (entre `---`) qui contient les métadonnées (titre, date, frais). |
| **MapLibre GL** | Bibliothèque de cartes open source utilisée à `/map`. |
| **Leaflet** | Bibliothèque de cartes plus simple, utilisée dans l'annuaire des installations. |
| **NextAuth (Auth.js)** | Bibliothèque qui gère la connexion, les sessions et les rôles. |
| **bcryptjs** | Bibliothèque pour hacher les mots de passe en sécurité. Le mot de passe original n'est jamais stocké. |
| **Zod** | Bibliothèque de validation des saisies utilisateur. |
| **next-intl** | Bibliothèque qui gère les quatre langues et les URLs préfixées (`/ht/`, `/fr/`, `/en/`, `/es/`). |

---

## Termes d'exploitation

| Terme | Sens |
|---|---|
| **Domaine** | Adresse web d'un site, par exemple `portal.ht`. Acheté chez un bureau d'enregistrement (Namecheap, Cloudflare, GoDaddy…). |
| **Sous-domaine** | Préfixe d'un domaine, par exemple `jacmel.portal.ht`. C'est ainsi que ce portail identifie la ville. |
| **DNS wildcard (joker)** | Enregistrement DNS comme `*.portal.ht` qui correspond à *n'importe quel* sous-domaine. Indispensable pour ajouter une ville sans toucher au DNS. |
| **DNS** | Le carnet d'adresses d'Internet. Associe `jacmel.portal.ht` à l'IP du serveur. |
| **SSL / TLS / HTTPS** | Le cadenas dans le navigateur. Chiffre le trafic. Vercel l'offre gratuitement. |
| **Hébergement** | Le serveur qui fait tourner le site en production. Le projet est conçu pour Vercel (recommandé) mais marche partout où tourne Node.js. |
| **Vercel** | Plateforme d'hébergement de la société qui édite Next.js. Gratuit jusqu'à un certain volume ; plans payants à partir de ~20 $/mois. |
| **Neon** | Service PostgreSQL géré, souvent associé à Vercel. Plan gratuit disponible. |
| **Variable d'environnement** | Valeur de configuration (mot de passe de la base, etc.) fournie à l'application — jamais inscrite dans le code. Stockée dans `.env.local` localement, dans le tableau de bord de l'hébergeur en production. |
| **CI / CD** | Intégration continue / Déploiement continu. Vérifications automatiques (lint, typecheck, build, tests) à chaque PR. Définies dans `.github/workflows/ci.yml`. |
| **Pull Request (PR)** | Proposition de changement de code, ouverte sur GitHub pour relecture avant fusion. |
| **Protection de branche** | Règles GitHub interdisant les push directs sur `main` et exigeant des relectures sur les PR. |
| **Signature GPG** | Signer cryptographiquement ses commits pour prouver qu'ils viennent bien de vous. Exigée par la protection de branche. |

---

## Termes propres au projet

| Terme | Sens |
|---|---|
| **Tenant (locataire)** | Une seule municipalité/ville desservie par le portail. Le projet est bâti pour qu'une seule application en serve plusieurs. |
| **SaaS multi-tenant** | Modèle où une seule application sert plusieurs organisations distinctes, leurs données isolées. Haiti City Portal est multi-tenant : un même serveur peut faire tourner Jacmel, Cap-Haïtien et Pétion-Ville à la fois. |
| **`tenant_id`** | Colonne UUID sur chaque ligne de la base disant à quelle ville la ligne appartient. Chaque requête doit filtrer par `tenant_id`. |
| **En-tête `x-tenant-subdomain`** | En-tête HTTP interne posé par le middleware qui dit au reste de l'application de quel sous-domaine vient la requête. |
| **UUID** | Identifiant aléatoire de 128 bits (par ex. `550e8400-e29b-41d4-a716-446655440000`). Utilisé comme clé primaire de toutes les tables — jamais des entiers séquentiels. |
| **Locale** | Code de langue : `en` (anglais), `fr` (français), `ht` (créole haïtien), `es` (espagnol). Locale par défaut : `ht`. |
| **Préfixe de locale** | La partie `/ht/` ou `/en/` d'une URL. Toutes les pages publiques vivent sous un préfixe. |
| **Repli de locale** | Si un fichier français manque, le portail utilise silencieusement le fichier anglais. Permet de publier une langue à la fois. |
| **Code mémo** | Code court lisible (par ex. `JAC-TAX-8821`) montré au résident après une demande de paiement. Il l'utilise comme référence dans MonCash ou son virement pour qu'un admin puisse rapprocher la somme. |
| **Pending upload** | Statut d'un paiement dont le code mémo a été émis mais dont la réception n'a pas encore été confirmée par un admin. |
| **Réconciliation manuelle** | Processus actuel où un admin compare les relevés bancaires/MonCash aux paiements en attente du portail et les marque vérifiés. Sera remplacé plus tard par des webhooks. |
| **Demande de service** | Signalement ou demande citoyenne — compatible Open311. Stockée dans `service_requests`. |
| **Rapport de terrain** | Observation soumise par le personnel depuis le terrain. Distinct d'une demande citoyenne. |
| **Section communale** (terme BD) | Ligne de la table `communal_sections` représentant une sous-unité géographique ; CASEC/ASEC y sont liés. |
| **Handbook** | Articles internes du manuel de gouvernance (`handbook_articles`), visibles seulement par les admins du bon rôle. |
| **Snapshot d'audit** | Copie figée des chiffres financiers à un instant T pour détecter une falsification ultérieure. |
| **Alerte d'urgence** | Message diffusé à l'échelle d'un tenant (ouragan, couvre-feu, coupure d'eau). |

---

## Sigles

| Sigle | Signification |
|---|---|
| **API** | Application Programming Interface |
| **ADR** | Architecture Decision Record |
| **BSL** | Business Source License |
| **CI** | Continuous Integration |
| **CD** | Continuous Deployment |
| **CLA** | Contributor License Agreement |
| **CMS** | Content Management System |
| **DNS** | Domain Name System |
| **GIS** | Geographic Information System |
| **HCP** | Haiti City Portal |
| **HTML** | HyperText Markup Language |
| **HTTPS** | HyperText Transfer Protocol Secure |
| **JSON** | JavaScript Object Notation |
| **JSONB** | JSON, Binary |
| **MDX** | Markdown + JSX |
| **ORM** | Object-Relational Mapper |
| **PR** | Pull Request |
| **PRD** | Product Requirements Document |
| **PWA** | Progressive Web App |
| **RC** | Release Candidate |
| **SaaS** | Software as a Service |
| **SDK** | Software Development Kit |
| **SQL** | Structured Query Language |
| **SSL** | Secure Sockets Layer |
| **TLS** | Transport Layer Security |
| **UI** | User Interface |
| **URL** | Uniform Resource Locator |
| **UUID** | Universally Unique Identifier |
| **YAML** | YAML Ain't Markup Language |

---

[↑ Retour en haut](#glossaire) · [← Index de la documentation](README.fr.md) · [README du projet →](../README.md)
