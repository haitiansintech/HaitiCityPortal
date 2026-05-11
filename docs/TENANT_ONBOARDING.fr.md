<!--
Langues : English (TENANT_ONBOARDING.md) | Français (ce fichier) | Kreyòl (TENANT_ONBOARDING.ht.md) | Español (TENANT_ONBOARDING.es.md)
-->

**Langues :** [English](TENANT_ONBOARDING.md) · **Français** · [Kreyòl Ayisyen](TENANT_ONBOARDING.ht.md) · [Español](TENANT_ONBOARDING.es.md)

[← Index de la documentation](README.fr.md) · [README du projet](../README.md) · [Glossaire](GLOSSARY.fr.md)

---

# Intégration d'une commune (tenant onboarding)

Comment ajouter une nouvelle commune (un « tenant ») à un déploiement Haiti City Portal en cours. Ce document prend la suite de [Déploiement](DEPLOYMENT.fr.md).

## Sommaire

- [Qu'est-ce qu'un tenant ?](#quest-ce-quun-tenant-)
- [Prérequis](#prérequis)
- [Liste de contrôle](#liste-de-contrôle)
- [Étape 1 — Choisir un sous-domaine](#étape-1--choisir-un-sous-domaine)
- [Étape 2 — Créer la ligne tenant](#étape-2--créer-la-ligne-tenant)
- [Étape 3 — Vérifier que le sous-domaine répond](#étape-3--vérifier-que-le-sous-domaine-répond)
- [Étape 4 — Créer le premier utilisateur admin](#étape-4--créer-le-premier-utilisateur-admin)
- [Étape 5 — Ajouter élus et sections communales](#étape-5--ajouter-élus-et-sections-communales)
- [Étape 6 — Ajouter les installations](#étape-6--ajouter-les-installations)
- [Étape 7 — Ajouter services et actualités](#étape-7--ajouter-services-et-actualités)
- [Étape 8 — Personnaliser la commune](#étape-8--personnaliser-la-commune)
- [Étape 9 — Former le personnel et lancer](#étape-9--former-le-personnel-et-lancer)
- [Renommer ou supprimer une commune](#renommer-ou-supprimer-une-commune)
- [Erreurs fréquentes](#erreurs-fréquentes)

---

## Qu'est-ce qu'un tenant ?

Un **tenant** est une commune. Chaque enregistrement de la base (élus, demandes, paiements, actualités) appartient à un seul tenant. Le portail dessert un nombre quelconque de tenants depuis une seule application — chacun via son propre sous-domaine.

Une ligne dans la table `tenants` fait foi. Sa colonne `subdomain` pilote le routage. Si `tenants.subdomain = "jacmel"`, alors `https://jacmel.portal.ht` est le portail de cette commune.

Architecture détaillée : [Architecture](ARCHITECTURE.fr.md).

[↑ Retour en haut](#sommaire)

---

## Prérequis

Avant d'ajouter un nouveau tenant :

- Déploiement de production fonctionnel ([Déploiement](DEPLOYMENT.fr.md)).
- DNS wildcard configuré (`*.portal.ht`).
- Domaine wildcard ajouté dans Vercel (**Settings → Domains**).
- Accès à la base (`DATABASE_URL`).

Identifiez le **sponsor du tenant** (maire ou chef de cabinet) et le **référent tenant** (l'agent en charge du contenu et de l'admin).

[↑ Retour en haut](#sommaire)

---

## Liste de contrôle

À cocher pour chaque nouvelle commune :

- [ ] Sous-domaine choisi
- [ ] Ligne tenant créée
- [ ] Sous-domaine répond en HTTPS
- [ ] Premier admin créé
- [ ] Sections communales saisies
- [ ] Élus saisis
- [ ] Installations ajoutées (ou importées)
- [ ] Services décrits en MDX (ou repli anglais au début)
- [ ] Au moins un article d'actualité publié
- [ ] Logo, couleurs, photo du maire configurés
- [ ] Au moins deux agents formés
- [ ] Lancement restreint
- [ ] Lancement public

[↑ Retour en haut](#sommaire)

---

## Étape 1 — Choisir un sous-domaine

Identifiant court, mémorable, en minuscules, sans espace ni caractère spécial.

| Commune | Sous-domaine suggéré |
|---|---|
| Jacmel | `jacmel` |
| Cap-Haïtien | `cap` ou `capha` |
| Port-au-Prince | `pap` |
| Pétion-Ville | `petionville` |
| Les Cayes | `cayes` |
| Croix-des-Bouquets | `croix` |

URL finale : `https://{subdomain}.portal.ht`.

**Mots réservés à éviter :** `www`, `admin`, `api`, `static`, `assets`, `cdn`, `mail`, `email`, `app`, `staging`, `dev`, `test`, `localhost`, `demo`.

[↑ Retour en haut](#sommaire)

---

## Étape 2 — Créer la ligne tenant

Deux méthodes.

### Option A — Script de seed (recommandé pour le tout premier tenant)

Voir [Déploiement, étape 6.2](DEPLOYMENT.fr.md#étape-6--schéma-initial-et-seed). Le script crée à la fois la ligne tenant et un superadmin.

### Option B — Drizzle Studio (pour les communes suivantes)

```bash
npm run db:studio
```

1. Ouvrez la table `tenants`.
2. **+ Add Record**.
3. `name`: `Ville du Cap-Haïtien`. `subdomain`: `cap`.
4. Sauver. Notez l'`id` (UUID) généré.

### Option C — SQL direct

```sql
INSERT INTO tenants (name, subdomain)
VALUES ('Ville du Cap-Haïtien', 'cap')
RETURNING id;
```

[↑ Retour en haut](#sommaire)

---

## Étape 3 — Vérifier que le sous-domaine répond

Ouvrez `https://cap.portal.ht`. La page d'accueil doit s'afficher avec le nom de la commune.

Si « DB unavailable » :
- CNAME wildcard DNS.
- `*.portal.ht` dans Vercel **Settings → Domains**.
- `subdomain` correspond à l'URL (sensible à la casse, minuscules).
- SSL provisionné (jusqu'à 10 minutes la première fois).

[↑ Retour en haut](#sommaire)

---

## Étape 4 — Créer le premier utilisateur admin

### Option A — Drizzle Studio

1. Table `users` → **+ Add Record**.
2. `tenant_id`: UUID de l'étape 2. `email`: `admin@cap.portal.ht`.
3. `password_hash`: hash bcrypt **et non le mot de passe en clair** :
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('VOTRE_MOT_DE_PASSE', 10))"
   ```
4. `role`: `superadmin`. `name`: `Admin Cap-Haïtien`.
5. Sauver.

### Option B — SQL

```sql
INSERT INTO users (tenant_id, email, password_hash, role, name)
VALUES ('<UUID>', 'admin@cap.portal.ht', '$2a$10$...', 'superadmin', 'Admin Cap-Haïtien');
```

Testez sur `https://cap.portal.ht/login`.

[↑ Retour en haut](#sommaire)

---

## Étape 5 — Ajouter élus et sections communales

### 5.1 Sections communales

Pour chaque section, ligne dans `communal_sections` : `tenant_id`, `name` (« 1ère Section Bas Limbé »), `code` (`cap-1`).

### 5.2 Élus

Pour chaque élu, ligne dans `officials` : `tenant_id`, `name`, `role` (`casec`/`asec`/`mayor`/`town_delegate`), `communal_section_id`, `whatsapp`, `vwa_profile_url`, `photo_url`.

[↑ Retour en haut](#sommaire)

---

## Étape 6 — Ajouter les installations

Lignes dans `facilities` : `tenant_id`, `name`, `category` (hospital/school/police/church/market/other), `latitude`, `longitude`, `address`, `phone`.

Astuce : les résidents peuvent suggérer des corrections ; elles arrivent dans `facility_suggestions`.

[↑ Retour en haut](#sommaire)

---

## Étape 7 — Ajouter services et actualités

Services et actualités sont des **fichiers de contenu**, pas des lignes BD. Voir [Guide de contenu](CONTENT_GUIDE.fr.md). Les huit services par défaut suffisent à la plupart des communes au lancement.

[↑ Retour en haut](#sommaire)

---

## Étape 8 — Personnaliser la commune

Aujourd'hui personnalisable par tenant :
- `name` dans la navbar.
- `subdomain`.
- Photos via `officials.photo_url`.

Logo personnalisé et couleurs sur la feuille de route. En attendant : déposez vos visuels dans `public/tenants/{subdomain}/`.

[↑ Retour en haut](#sommaire)

---

## Étape 9 — Former le personnel et lancer

Distribuez [Manuel d'administration](ADMIN_MANUAL.fr.md). Session de 1–2 h : connexion, demandes, vérification de paiement, actualité, alerte, passation. Puis lancement restreint puis public.

[↑ Retour en haut](#sommaire)

---

## Renommer ou supprimer une commune

### Renommer

`name` peut changer. `subdomain` doit rester stable. Si vous devez le changer : créez le nouveau, redirigez l'ancien, communiquez 90 jours.

### Supprimer

Sauvegardez d'abord. Supprimez les lignes dépendantes avant `tenants` :

```sql
DELETE FROM payment_records WHERE tenant_id = '<UUID>';
DELETE FROM service_requests WHERE tenant_id = '<UUID>';
DELETE FROM facilities WHERE tenant_id = '<UUID>';
-- ... pour chaque table d'entité ...
DELETE FROM tenants WHERE id = '<UUID>';
```

Préférez archiver plutôt que supprimer.

[↑ Retour en haut](#sommaire)

---

## Erreurs fréquentes

| Erreur | Symptôme | Correction |
|---|---|---|
| `*.portal.ht` non ajouté à Vercel | 404 | Settings → Domains |
| Sous-domaine en majuscules | Tenant introuvable | Minuscules uniquement |
| Mot de passe en clair dans `password_hash` | Login échoue toujours | Générer un hash bcrypt |
| `tenant_id` oublié | Ligne invisible | Mettre à jour la ligne |
| Deux tenants même `subdomain` | Routage indéfini | Contrainte d'unicité |
| Mot réservé en subdomain | Conflit | Choisir un autre nom |

[↑ Retour en haut](#sommaire)

---

[← Index de la documentation](README.fr.md) · [Déploiement](DEPLOYMENT.fr.md) · [Manuel d'administration →](ADMIN_MANUAL.fr.md)
