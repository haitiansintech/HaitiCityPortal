<!--
Langues : English (0001-multi-tenant-via-subdomain.md) | Français (ce fichier) | Kreyòl (...ht.md) | Español (...es.md)
-->

**Langues :** [English](0001-multi-tenant-via-subdomain.md) · **Français** · [Kreyòl Ayisyen](0001-multi-tenant-via-subdomain.ht.md) · [Español](0001-multi-tenant-via-subdomain.es.md)

[← Index des ADR](README.fr.md) · [Architecture](../ARCHITECTURE.fr.md)

---

# 0001 — Multi-tenant par sous-domaine + middleware

- **Statut :** Accepté
- **Date :** 2025-09-01
- **Décideurs :** mainteneurs du projet

## Contexte

Le portail doit servir de nombreuses communes depuis une seule application, tout en isolant strictement les données. Trois schémas envisagés :

1. **Une base par tenant**.
2. **Un schéma par tenant** dans une base partagée.
3. **Scoping par ligne avec `tenant_id`** — schéma partagé, chaque ligne marquée par son tenant.

Contraintes : ajout d'une commune sans redéploiement ; coût Vercel + Neon ; majorité de requêtes scoped par tenant.

## Décision

**Scoping par ligne avec `tenant_id`**. Résolution du tenant dans le middleware : sous-domaine extrait du `Host` et écrit dans l'en-tête serveur `x-tenant-subdomain` lu par les Server Components.

Chaque table (sauf `tenants`) a une colonne `tenant_id uuid NOT NULL` avec FK vers `tenants.id`. Chaque requête filtre dessus.

## Conséquences

**Positives :** ajout d'une commune = un INSERT + DNS wildcard déjà en place ; coût base unique ; agrégations nationales triviales.

**Négatives :** un oubli de `tenant_id` = incident critique (atténué par revue de code) ; sauvegardes globales ; performance impactée si une commune domine.

**Neutres :** `x-tenant-subdomain` n'est *jamais* cru depuis le client — le middleware l'écrit.

## Alternatives examinées

- **Base par tenant** : trop chère, lourde à opérer.
- **Schéma par tenant** : migrations Drizzle pénibles ; bénéfices marginaux.
- **Tenant par chemin** (`/jacmel/services`) : conflit avec les préfixes locale et URL moins pro.

[↑ Retour en haut](#0001--multi-tenant-par-sous-domaine--middleware) · [← Index des ADR](README.fr.md) · [Suivant : 0002 →](0002-uuid-primary-keys.fr.md)
