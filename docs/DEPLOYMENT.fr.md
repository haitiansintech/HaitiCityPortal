<!--
Langues : English (DEPLOYMENT.md) | Français (ce fichier) | Kreyòl (DEPLOYMENT.ht.md) | Español (DEPLOYMENT.es.md)
-->

**Langues :** [English](DEPLOYMENT.md) · **Français** · [Kreyòl Ayisyen](DEPLOYMENT.ht.md) · [Español](DEPLOYMENT.es.md)

[← Index de la documentation](README.fr.md) · [README du projet](../README.md) · [Glossaire](GLOSSARY.fr.md)

---

# Déploiement

Guide étape par étape pour déployer Haiti City Portal en production. Document destiné au développeur ou au responsable IT qui exploitera le service en ligne.

## Sommaire

- [Prérequis](#prérequis)
- [Vue d'ensemble de l'architecture](#vue-densemble-de-larchitecture)
- [Étape 1 — Domaine](#étape-1--domaine)
- [Étape 2 — DNS wildcard](#étape-2--dns-wildcard)
- [Étape 3 — Base de données (Neon)](#étape-3--base-de-données-neon)
- [Étape 4 — Hébergement (Vercel)](#étape-4--hébergement-vercel)
- [Étape 5 — Variables d'environnement](#étape-5--variables-denvironnement)
- [Étape 6 — Schéma initial et seed](#étape-6--schéma-initial-et-seed)
- [Étape 7 — Connecter le domaine à Vercel](#étape-7--connecter-le-domaine-à-vercel)
- [Étape 8 — Vérifier le déploiement](#étape-8--vérifier-le-déploiement)
- [Étape 9 — Ajouter votre premier tenant](#étape-9--ajouter-votre-premier-tenant)
- [Mettre à jour l'application](#mettre-à-jour-lapplication)
- [Sauvegardes et reprise](#sauvegardes-et-reprise)
- [Supervision et logs](#supervision-et-logs)
- [Récapitulatif des coûts](#récapitulatif-des-coûts)
- [Plateformes alternatives](#plateformes-alternatives)
- [Dépannage](#dépannage)

---

## Prérequis

Sur votre poste :

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [GitHub CLI](https://cli.github.com/) (`gh`) — optionnel
- Un éditeur (VS Code, Cursor, etc.)

Comptes nécessaires :

- [GitHub](https://github.com) — pour forker le dépôt
- Un bureau d'enregistrement de domaine (Namecheap, Cloudflare, Porkbun…)
- [Vercel](https://vercel.com) — hébergement
- [Neon](https://neon.tech) — base PostgreSQL

[↑ Retour en haut](#sommaire)

---

## Vue d'ensemble de l'architecture

En production :

```
        Internet
           │
           ▼
   ┌───────────────┐       (chaque commune a son sous-domaine)
   │  Cloudflare/  │       ex.   jacmel.portal.ht
   │ Bureau DNS    │             cap.portal.ht
   │ wildcard DNS  │             demo.portal.ht
   │ *.portal.ht   │
   └───────┬───────┘
           │
           ▼
   ┌───────────────┐       App Next.js :
   │    Vercel     │       - middleware lit Host → tenant
   │  (Next.js 15) │       - server components requêtent la BD
   └───────┬───────┘       - HTTPS automatique
           │
           ▼
   ┌───────────────┐       Postgres 16 :
   │     Neon      │       - une base partagée
   │  (PostgreSQL) │       - lignes filtrées par tenant_id
   └───────────────┘
```

Voir [Architecture](ARCHITECTURE.fr.md) pour le diagramme complet.

[↑ Retour en haut](#sommaire)

---

## Étape 1 — Domaine

Un seul domaine que toutes les communes partageront comme sous-domaines.

Recommandé : un `.ht` pour la lisibilité haïtienne, mais tout TLD fonctionne.

| Bureau | Notes |
|---|---|
| Cloudflare | Renouvellements moins chers, excellent DNS, SSL gratuit |
| Namecheap | Interface simple, bon support |
| Porkbun | Pas cher, interface moderne |

Après l'achat, **pointez les nameservers de votre domaine vers Cloudflare** si vous avez acheté ailleurs — DNS le plus simple pour les wildcards.

[↑ Retour en haut](#sommaire)

---

## Étape 2 — DNS wildcard

Le multi-tenant exige un enregistrement DNS wildcard.

Chez votre fournisseur DNS (Cloudflare ici), ajoutez **deux CNAME** :

| Type | Nom | Cible | Proxy |
|---|---|---|---|
| CNAME | `@` (apex) | `cname.vercel-dns.com` | DNS only (nuage gris) |
| CNAME | `*` | `cname.vercel-dns.com` | DNS only (nuage gris) |

Le `*` permet à `jacmel.portal.ht`, `cap.portal.ht` et toute future commune de résoudre automatiquement.

> **Important :** sur Cloudflare, mettez les enregistrements en « DNS only » (nuage gris) au début. Vercel doit émettre un certificat SSL pour chaque sous-domaine et le proxy de Cloudflare peut interférer. Vous pourrez activer le proxy plus tard.

[↑ Retour en haut](#sommaire)

---

## Étape 3 — Base de données (Neon)

1. Connectez-vous sur [neon.tech](https://neon.tech).
2. Créez un **Projet** `haiti-city-portal-prod`.
3. Choisissez la région la plus proche : **AWS US East 2 (Ohio)** ou **US East 1 (Virginie)**.
4. Copiez la **chaîne de connexion** :
   ```
   postgresql://USER:PASSWORD@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. Ce sera la variable `DATABASE_URL` à l'étape 5.

> **Astuce :** la formule gratuite de Neon est généreuse. Vous pouvez démarrer gratuitement et passer au plan « Launch » (~19 $/mois) quand l'usage croît.

[↑ Retour en haut](#sommaire)

---

## Étape 4 — Hébergement (Vercel)

### 4.1 Forker le dépôt

1. Allez sur [github.com/haitiansintech/HaitiCityPortal](https://github.com/haitiansintech/HaitiCityPortal).
2. Cliquez **Fork** en haut à droite.
3. (Optionnel) Renommez votre fork (`mairie-jacmel-portal`).

### 4.2 Importer dans Vercel

1. Connectez-vous sur [vercel.com](https://vercel.com) avec GitHub.
2. **Add New… → Project**.
3. Sélectionnez votre fork.
4. **Framework preset** : Next.js (auto-détecté).
5. **Root directory** : par défaut.
6. **Build & output settings** : par défaut.
7. **Ne cliquez pas Deploy** maintenant — ajoutez d'abord les variables (étape 5).

[↑ Retour en haut](#sommaire)

---

## Étape 5 — Variables d'environnement

Dans les paramètres Vercel (ou pendant l'import) :

| Variable | Requise ? | Exemple |
|---|---|---|
| `DATABASE_URL` | **Oui** | `postgresql://USER:PASS@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `AUTH_SECRET` | **Oui** | Chaîne aléatoire 32+ caractères. `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Oui** | `https://portal.ht` |
| `AUTH_TRUST_HOST` | Recommandée | `true` |
| `NEXT_PUBLIC_BASE_URL` | Optionnelle | `https://portal.ht` |
| `ENABLE_LOCAL_MODE` | Doit être **non défini ou `false`** en prod | (ne pas définir) |

Modèle annoté complet : [`.env.production.example`](../.env.production.example).

> **Attention :** ne committez jamais de secrets sur GitHub. Vercel chiffre les variables d'environnement.

Cliquez **Deploy**.

[↑ Retour en haut](#sommaire)

---

## Étape 6 — Schéma initial et seed

Le premier déploiement démarre l'app, mais la base est vide.

### 6.1 Pousser le schéma

Depuis votre poste :

```bash
git clone https://github.com/VOTRE-ORG/HaitiCityPortal.git
cd HaitiCityPortal
npm install
echo 'DATABASE_URL="<votre chaîne Neon>"' > .env.local
npm run db:push
```

### 6.2 Seed du premier tenant

```bash
$env:CONFIRM_PRODUCTION_SEED="yes"
$env:SEED_ADMIN_EMAIL="admin@votre-domaine.ht"
$env:SEED_ADMIN_PASSWORD="<mot de passe fort, unique>"
$env:SEED_TENANT_NAME="Ville de Jacmel"
$env:SEED_TENANT_SUBDOMAIN="jacmel"

npm run db:seed:prod
```

(Sur macOS/Linux : `export VAR=valeur`.)

Crée :
- Une ligne `tenants` avec votre sous-domaine.
- Une ligne `users` superadmin avec votre e-mail et mot de passe haché.

Connexion ensuite à `https://jacmel.portal.ht/login` une fois le DNS résolu (étape 7).

Pour ajouter d'autres communes plus tard : [Intégration d'une commune](TENANT_ONBOARDING.fr.md).

[↑ Retour en haut](#sommaire)

---

## Étape 7 — Connecter le domaine à Vercel

Dans Vercel :

1. **Settings → Domains**.
2. Ajoutez `portal.ht`.
3. Ajoutez `*.portal.ht` (le wildcard).
4. Vercel vérifie le DNS (étape 2) et émet les certificats SSL.

Ensuite :
- `https://portal.ht` → arrive sur l'app (configurable pour rediriger vers un tenant par défaut ou une page d'accueil).
- `https://jacmel.portal.ht` → arrive sur votre tenant Jacmel.

> **Apex domain :** si votre bureau ne supporte pas le CNAME à l'apex, utilisez les enregistrements A recommandés par Vercel. Cloudflare et Porkbun gèrent le CNAME-flattening.

[↑ Retour en haut](#sommaire)

---

## Étape 8 — Vérifier le déploiement

Liste de contrôle :

- [ ] `https://portal.ht` répond.
- [ ] `https://jacmel.portal.ht` répond.
- [ ] `https://jacmel.portal.ht/api/health` retourne un OK.
- [ ] Changement de langue : `/en/`, `/fr/`, `/ht/`, `/es/`.
- [ ] Connexion à `/login` avec votre admin.
- [ ] Accès à une page admin (`/admin`).
- [ ] Cadenas HTTPS valide.

En cas d'échec : [Dépannage](#dépannage).

[↑ Retour en haut](#sommaire)

---

## Étape 9 — Ajouter votre premier tenant

Si vous avez seedé un tenant à l'étape 6, c'est fait. Passez à la saisie de données via l'admin — voir [Manuel d'administration](ADMIN_MANUAL.fr.md).

Pour les communes suivantes : [Intégration d'une commune](TENANT_ONBOARDING.fr.md).

[↑ Retour en haut](#sommaire)

---

## Mettre à jour l'application

Quand du nouveau code arrive en amont :

1. Synchronisez votre fork : GitHub → votre fork → bouton **Sync fork**.
2. Vercel redéploie automatiquement à chaque push sur `main`.
3. Si un changement de schéma est inclus, lancez `npm run db:push` sur la prod (ou automatisez dans CI).

Recommandé : un environnement `staging` Vercel avec une base Neon distincte, pour tester d'abord.

[↑ Retour en haut](#sommaire)

---

## Sauvegardes et reprise

| Risque | Atténuation |
|---|---|
| Perte de base | Snapshots automatiques Neon. Plans payants : 30 jours. |
| Bug applicatif | Vercel garde tous les déploiements précédents. **Promote to Production** = rollback instantané. |
| Détournement DNS | 2FA sur registrar et fournisseur DNS. |
| Mot de passe admin perdu | Réinitialisation via Drizzle Studio ou re-seed. |
| `AUTH_SECRET` perdu | Rotation = déconnexion de toutes les sessions. Conserver dans un gestionnaire de mots de passe. |

[↑ Retour en haut](#sommaire)

---

## Supervision et logs

- **Logs Vercel** : Settings → Logs.
- **Tableau Neon** : performance et stockage.
- Optionnel : **Sentry** pour le suivi d'erreurs applicatives.
- Optionnel : **Better Stack / Pingdom** sur `/api/health` pour la disponibilité.

[↑ Retour en haut](#sommaire)

---

## Récapitulatif des coûts

| Composant | Gratuit | Standard payant |
|---|---|---|
| Vercel | 0 $ | 20 $/utilisateur/mois (Pro) |
| Neon | 0 $ | 19 $/mois (Launch) |
| Cloudflare DNS | 0 $ | 0 $ |
| Domaine `.ht` | n/a | ~30 $/an |
| Total | **~0 $/mois + 30 $/an** | **~40 $/mois + 30 $/an** |

[↑ Retour en haut](#sommaire)

---

## Plateformes alternatives

C'est du Next.js 15 standard ; tourne partout où Node.js tourne.

| Alternative | Notes |
|---|---|
| VPS auto-hébergé (Hetzner, Linode, OVH) | Docker ; ~5–20 $/mois ; vous gérez SSL et sauvegardes |
| Cloudflare Pages + Workers | Possible avec adaptateurs ; certaines fonctions Next.js limitées |
| Fly.io | Bon pour Postgres + Next.js auto-hébergés |
| Railway | Expérience proche de Vercel |
| Render | Expérience proche de Vercel |
| AWS, GCP, Azure | Possible mais lourd ; déconseillé pour un premier déploiement |

Auto-hébergement : à votre charge SSL, certificats wildcard, gestion de processus, sauvegardes Postgres.

[↑ Retour en haut](#sommaire)

---

## Dépannage

### Le sous-domaine renvoie « 404 Not Found »
- Vérifiez que le CNAME wildcard existe.
- Vérifiez que `*.portal.ht` est bien dans Vercel **Settings → Domains**.
- L'émission SSL Vercel peut prendre 1–10 minutes la première fois.

### « DB unavailable, using fallback tenant »
- `DATABASE_URL` manquante ou erronée.
- Base Neon en pause (free tier auto-pause après 5 minutes).
- Chaîne de connexion sans `?sslmode=require`.

### « MISSING_MESSAGE » ou « FORMATTING_ERROR »
- Une clé manque dans un `messages/{locale}.json`. Vérifiez la parité des clés.

### Boucle de redirection à la connexion
- `NEXTAUTH_URL` ne correspond pas à l'URL réelle.
- `AUTH_SECRET` non défini ou < 32 caractères.
- `AUTH_TRUST_HOST` pas à `true`.

### `npm run db:push` échoue
- Testez la connexion `psql` d'abord.
- Région du projet Neon correcte.

### Échec build Vercel au premier déploiement
- Vérifiez les variables manquantes dans le log de build.

[↑ Retour en haut](#sommaire)

---

[← Index de la documentation](README.fr.md) · [Pour les municipalités](FOR_MUNICIPALITIES.fr.md) · [Intégration d'une commune →](TENANT_ONBOARDING.fr.md)
