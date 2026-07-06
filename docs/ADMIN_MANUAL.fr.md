<!--
Langues : English (ADMIN_MANUAL.md) | Français (ce fichier) | Kreyòl (ADMIN_MANUAL.ht.md) | Español (ADMIN_MANUAL.es.md)
-->

**Langues :** [English](ADMIN_MANUAL.md) · **Français** · [Kreyòl Ayisyen](ADMIN_MANUAL.ht.md) · [Español](ADMIN_MANUAL.es.md)

[← Index de la documentation](README.fr.md) · [README du projet](../README.md) · [Glossaire](GLOSSARY.fr.md)

---

# Manuel d'administration

Guide pratique au quotidien pour le personnel municipal qui utilise le panneau d'administration. Aucune connaissance technique requise.

## Sommaire

- [Avant de commencer](#avant-de-commencer)
- [Connexion](#connexion)
- [Le tableau de bord](#le-tableau-de-bord)
- [Demandes de service](#demandes-de-service)
- [Vérifier les paiements](#vérifier-les-paiements)
- [Publier des actualités](#publier-des-actualités)
- [Diffuser une alerte d'urgence](#diffuser-une-alerte-durgence)
- [Gérer les élus](#gérer-les-élus)
- [Gérer les installations](#gérer-les-installations)
- [Examiner les suggestions](#examiner-les-suggestions)
- [Rapports de terrain](#rapports-de-terrain)
- [Manuel de gouvernance](#manuel-de-gouvernance)
- [Revue d'audit financier](#revue-daudit-financier)
- [Rôles utilisateurs et accès](#rôles-utilisateurs-et-accès)
- [Déconnexion et passation](#déconnexion-et-passation)
- [Dépannage](#dépannage)

---

## Avant de commencer

Il vous faut :

- Un navigateur (Chrome, Edge, Safari, Firefox).
- Vos identifiants admin (donnés par votre responsable IT).
- Internet.

Recommandé : un deuxième écran/onglet pour les notes ; lecture du [Glossaire](GLOSSARY.fr.md).

[↑ Retour en haut](#sommaire)

---

## Connexion

1. Allez sur `https://{votre-sous-domaine}.portal.ht`.
2. Cliquez **Connexion** ou allez à `/login`.
3. Saisissez votre e-mail et mot de passe.
4. Vous arrivez sur `/admin`.

Si le mot de passe ne marche pas, demandez à votre responsable IT de le réinitialiser. Ne partagez jamais votre mot de passe.

[↑ Retour en haut](#sommaire)

---

## Le tableau de bord

`/admin` est votre point de départ chaque jour :

- **Demandes ouvertes**.
- **Paiements en attente**.
- **Activité récente**.
- **Liens rapides** vers chaque section.

Ouvrez le tableau de bord en arrivant le matin.

[↑ Retour en haut](#sommaire)

---

## Demandes de service

### Lire une demande

1. **Requests** ou `/admin/requests`.
2. La liste affiche : date, type, statut, résumé.
3. Cliquez une ligne pour voir le détail à `/admin/requests/[id]` : nom, contact, description, photo, GPS, historique de statut.

### Mettre à jour le statut

| Statut | Sens |
|---|---|
| **Open** | Soumise, pas encore traitée |
| **In progress** | Un agent y travaille |
| **Resolved** | Réglée |
| **Closed** | Résolue et reconnue par le résident |
| **Rejected** | Pas exploitable (hors champ, doublon, malveillant) — joindre une raison |

Cliquez **Update Status**, ajoutez une note interne courte.

### Bonnes pratiques

- Mise à jour sous **48 h**, même un simple accusé.
- Cas complexes : statut **In progress**, puis nouvelle MAJ à la fin.
- Rejets : raison claire — protection juridique.

[↑ Retour en haut](#sommaire)

---

## Vérifier les paiements

Aujourd'hui : réconciliation manuelle.

### Procédure

1. `/admin/finance`.
2. Filtre statut **Pending Upload**.
3. Ouvrez : code mémo, montant, méthode, contact.
4. Croisez avec relevé bancaire/MonCash.
5. Si trouvé : **Mark Verified**, date réelle, capture optionnelle.
6. Si non trouvé sous 5 jours ouvrés : **Failed** avec raison.

> **Critique :** ne validez jamais sans preuve indépendante.

[↑ Retour en haut](#sommaire)

---

## Publier des actualités

Voir [Guide de contenu](CONTENT_GUIDE.fr.md) pour la procédure GitHub web (recommandée). Un éditeur web admin est sur la feuille de route.

[↑ Retour en haut](#sommaire)

---

## Diffuser une alerte d'urgence

1. `/admin/emergency` → **New Alert**.
2. Titre dans les 4 langues, corps, sévérité (`info`/`warning`/`critical`), début, fin.
3. Sauver.

L'alerte apparaît immédiatement.

> Doublez les alertes critiques par WhatsApp, radio, haut-parleurs municipaux. Le portail complète, ne remplace pas.

Pour terminer plus tôt : éditer la fin ou cliquer **Deactivate**.

[↑ Retour en haut](#sommaire)

---

## Gérer les élus

`/admin/officials`. Nouveau : nom, rôle, section communale, photo, WhatsApp, profil Vwa. Mettre inactif plutôt que supprimer.

À chaque élection, prévoyez 2 h dans les 7 jours suivant l'investiture.

[↑ Retour en haut](#sommaire)

---

## Gérer les installations

`/admin/facilities`. Catégories : hôpital, école, police, pompiers, église, marché, gouvernement, autre.

GPS via téléphone ou Google Maps (clic droit → « Plus d'infos sur cet endroit »).

[↑ Retour en haut](#sommaire)

---

## Examiner les suggestions

`/admin/facility-suggestions`. Accepter ou rejeter avec raison. Vidange hebdomadaire conseillée.

[↑ Retour en haut](#sommaire)

---

## Rapports de terrain

`/admin/field-reports`. Type, lieu, description, photo, sévérité. Alimente la carte `/map`.

[↑ Retour en haut](#sommaire)

---

## Manuel de gouvernance

`/admin/handbook`. Lecture : tous les admins selon le rôle. Édition : `superadmin` via `/admin/handbook/editor`. Lecture trackée — utile pour l'onboarding.

[↑ Retour en haut](#sommaire)

---

## Revue d'audit financier

`/admin/finance/audit-review`. Snapshots automatiques. Comparez mois en cours / mois précédent. Anomalie → escaladez au trésorier. Page en lecture seule.

[↑ Retour en haut](#sommaire)

---

## Rôles utilisateurs et accès

| Rôle | Peut |
|---|---|
| `user` | Soumettre demandes, payer |
| `admin` | Demandes, paiements, élus/installations, actus/alertes |
| `superadmin` | Tout admin + handbook + créer/désactiver admins |

Au moins **deux `superadmin`** par commune.

Nouvel admin : `/admin/users` ou Drizzle Studio. Jamais de compte partagé.

[↑ Retour en haut](#sommaire)

---

## Déconnexion et passation

Fin de poste :
1. Note dans **Open requests**.
2. Message Slack/WhatsApp à l'équipe suivante : urgences, paiements, alertes actives.
3. Avatar → **Logout**.
4. Fermez l'onglet (postes partagés).

[↑ Retour en haut](#sommaire)

---

## Dépannage

| Problème | Action |
|---|---|
| Mot de passe oublié | Réinitialisation par le responsable IT |
| Pas d'admin panel | Compte non admin — demandez à un superadmin |
| Paiement validé par erreur | **Reverse Verification** + raison |
| Faute de frappe sur news/alerte | Re-éditer le MDX/l'alerte |
| Site indisponible | `/api/health`, sinon IT lead |
| Données d'une autre commune visibles | **Incident critique** : `security@haiticity.org` immédiatement |

[↑ Retour en haut](#sommaire)

---

[← Index de la documentation](README.fr.md) · [Intégration d'une commune](TENANT_ONBOARDING.fr.md) · [Guide de contenu →](CONTENT_GUIDE.fr.md)
