<!--
Langues : English (FOR_MUNICIPALITIES.md) | Français (ce fichier) | Kreyòl (FOR_MUNICIPALITIES.ht.md) | Español (FOR_MUNICIPALITIES.es.md)
-->

**Langues :** [English](FOR_MUNICIPALITIES.md) · **Français** · [Kreyòl Ayisyen](FOR_MUNICIPALITIES.ht.md) · [Español](FOR_MUNICIPALITIES.es.md)

[← Index de la documentation](README.fr.md) · [README du projet](../README.md) · [Glossaire](GLOSSARY.fr.md)

---

# Pour les municipalités

Guide non technique pour les maires, conseillers et agents municipaux qui envisagent Haiti City Portal pour leur commune.

## Sommaire

- [Qu'est-ce que Haiti City Portal ?](#quest-ce-que-haiti-city-portal-)
- [Que peuvent faire vos résidents ?](#que-peuvent-faire-vos-résidents-)
- [Que peut faire votre personnel ?](#que-peut-faire-votre-personnel-)
- [Ce qu'il vous faut pour le faire tourner](#ce-quil-vous-faut-pour-le-faire-tourner)
- [Coûts estimatifs](#coûts-estimatifs)
- [Délai de mise en ligne](#délai-de-mise-en-ligne)
- [Rôles requis chez vous](#rôles-requis-chez-vous)
- [Langues et accessibilité](#langues-et-accessibilité)
- [Données, propriété et confidentialité](#données-propriété-et-confidentialité)
- [Questions fréquentes](#questions-fréquentes)
- [Comment commencer](#comment-commencer)
- [Qui contacter](#qui-contacter)

---

## Qu'est-ce que Haiti City Portal ?

Haiti City Portal est un **logiciel libre et gratuit** pour les communes haïtiennes. Il offre à vos résidents un site web unique où ils peuvent :

- Consulter les informations sur les services municipaux
- Soumettre des demandes et signaler des problèmes (nids-de-poule, ordures, éclairage)
- Payer les frais municipaux via MonCash ou virement bancaire
- Lire les actualités officielles et les alertes d'urgence
- Trouver hôpitaux, écoles, postes de police
- Voir les élus et les contacter

Il offre aussi à votre personnel un panneau d'administration pour gérer les demandes, vérifier les paiements, publier des actualités et diffuser des alertes.

Il est conçu pour qu'**un même système partagé puisse desservir n'importe quel nombre de communes**. Chaque commune a son propre sous-domaine (par ex. `jacmel.portal.ht`, `cap.portal.ht`) et ses propres données — totalement séparées des autres communes.

> **En une phrase :** c'est le même type de système qu'utilisent des villes comme Boston ou Lyon, mais conçu spécifiquement pour Haïti — multilingue par défaut, prêt pour les faibles débits, et adapté aux réalités locales (CASEC, ASEC, MonCash, NIF).

[↑ Retour en haut](#sommaire)

---

## Que peuvent faire vos résidents ?

| Fonctionnalité | Pourquoi ça compte |
|---|---|
| Trouver un service et voir les documents requis | Réduit les déplacements inutiles à la mairie |
| Signaler un problème avec photo et localisation GPS | Les problèmes ne tombent plus dans l'oubli |
| Payer en ligne via MonCash ou virement | Moins de cash, moins de files |
| Recevoir un reçu numérique (quittance) | Moins de papier, moins de fraude |
| Voir tous les équipements publics sur une carte | Aide plus rapide en cas d'urgence |
| Lire actualités et alertes officielles | Information autoritative remplace rumeur |
| Utiliser le site en créole, français, anglais ou espagnol | Accès égal pour les résidents et la diaspora |
| Voir les élus par section communale | Responsabilité démocratique renforcée |

[↑ Retour en haut](#sommaire)

---

## Que peut faire votre personnel ?

| Fonctionnalité admin | Qui l'utilise |
|---|---|
| Voir les demandes entrantes et changer leur statut | Personnel d'accueil |
| Vérifier les paiements en attente avec relevés banque/MonCash | Agent financier |
| Publier articles d'actualité et alertes d'urgence | Agent de communication |
| Gérer la liste des élus et leurs coordonnées | Cabinet du maire |
| Tenir à jour l'annuaire des installations et leurs GPS | Responsable SIG / engagement civique |
| Consulter les tableaux financiers et snapshots d'audit | Maire / trésorier |
| Lire et acquitter les articles du manuel de gouvernance | Tous les admins |
| Restreindre qui peut faire quoi (rôles user/admin/superadmin) | IT / cabinet |

[↑ Retour en haut](#sommaire)

---

## Ce qu'il vous faut pour le faire tourner

Trois choses seulement :

1. **Un nom de domaine** — par exemple `portal.ht` ou le vôtre (`jacmel-mairie.ht`). Environ 15–30 $ par an.
2. **Un compte d'hébergement** — recommandé : [Vercel](https://vercel.com) (gratuit pour les petites communes, 20–40 $/mois pour les plus grandes).
3. **Une base PostgreSQL gérée** — recommandé : [Neon](https://neon.tech) (gratuit pour les petites communes, 19 $/mois pour le palier payant).

Vous n'avez **pas** besoin de serveur physique, de salle serveur ou de matériel spécial. Tout tourne dans le cloud.

Avec ces trois éléments, un développeur expérimenté peut déployer le portail de votre commune **en moins d'une journée**.

Voir le détail dans [Déploiement](DEPLOYMENT.fr.md) et [Intégration d'une commune](TENANT_ONBOARDING.fr.md).

[↑ Retour en haut](#sommaire)

---

## Coûts estimatifs

Pour une commune de taille moyenne (50 000–200 000 habitants) :

| Poste | Coût mensuel indicatif |
|---|---|
| Nom de domaine | ~2 $/mois (payé annuellement) |
| Hébergement (Vercel) | 0–40 $ |
| Base de données (Neon) | 0–19 $ |
| Service e-mail (optionnel, ex. Resend) | 0–20 $ |
| Tuiles cartographiques (gratuites par défaut avec MapLibre) | 0 $ |
| **Total** | **~20–80 $ / mois** |

Ces chiffres ne couvrent que l'infrastructure. Ils **n'incluent pas** les personnes : un développeur pour déployer, un éditeur pour traduire, un admin pour vérifier les paiements. La plupart des communes peuvent assurer ces rôles avec leur personnel actuel.

Une deuxième, troisième ou centième commune peut rejoindre le même déploiement partagé à **un coût additionnel quasi nul**, grâce à l'architecture multi-tenant.

[↑ Retour en haut](#sommaire)

---

## Délai de mise en ligne

Calendrier réaliste pour une commune :

| Étape | Durée | Qui |
|---|---|---|
| Acheter le domaine, créer les comptes hébergement | 1 jour | IT ou développeur |
| Déployer l'application | Demi-journée | Développeur |
| Configurer votre sous-domaine et créer le tenant | 1 heure | Développeur |
| Saisir élus, sections communales, installations | 1–3 jours | Communication + état civil |
| Traduire ou rédiger les descriptions de services | 1–2 semaines | Équipe communication |
| Former le personnel au panneau admin | Demi-journée | Cabinet |
| Lancement restreint | 1 jour | Communication |
| Lancement public | 1 jour | Cabinet du maire |

**Total : 2–4 semaines de la décision au lancement public**, sous réserve de disponibilité du personnel.

[↑ Retour en haut](#sommaire)

---

## Rôles requis chez vous

| Rôle | Temps requis | Compétences |
|---|---|---|
| **Sponsor** (maire ou chef de cabinet) | Quelques heures au total | Pouvoir décisionnel, priorisation |
| **Développeur / responsable IT** | 2–5 jours pour la mise en place, puis ponctuel | À l'aise avec Node.js, hébergement web, DNS. Interne, bénévole ou prestataire. |
| **Agent de communication** | Continu | Rédige actualités, traduit services, publie alertes. Sans code. |
| **Agent financier** | Continu | Vérifie les paiements |
| **Personnel d'accueil** | Continu | Lit les demandes entrantes et change leurs statuts |

Vous n'avez pas besoin d'une grande équipe. Un agent à l'aise avec le numérique plus l'équipe communication suffit pour la plupart des communes.

[↑ Retour en haut](#sommaire)

---

## Langues et accessibilité

Le portail est livré en quatre langues :

- **Créole haïtien (Kreyòl Ayisyen)** — par défaut, langue maternelle de la grande majorité des Haïtiens.
- **Français** — langue écrite officielle du gouvernement.
- **Anglais** — pour la diaspora, les ONG et les partenaires.
- **Espagnol** — accessibilité transfrontalière (République dominicaine, partenaires régionaux).

Les résidents changent de langue en haut de chaque page. Si un contenu n'est pas encore traduit, le portail affiche automatiquement la version anglaise — pas de page cassée.

Le site est conçu mobile-first, optimisé pour les faibles débits (2G/3G), et respecte les standards d'accessibilité web courants.

[↑ Retour en haut](#sommaire)

---

## Données, propriété et confidentialité

- **Vos données vous appartiennent.** Les résidents, demandes, paiements, actualités et élus de votre commune sont stockés dans *votre* base. Les autres communes du déploiement partagé ne peuvent pas voir vos données.
- **Le logiciel est open source** sous la Business Source License 1.1. Toute commune peut l'utiliser librement à des fins non commerciales. Il devient Apache 2.0 (totalement libre) le 31 décembre 2028. Voir [LICENSE.md](../LICENSE.md).
- **L'isolation entre tenants est appliquée au niveau du code.** Chaque requête filtre par `tenant_id`. Une fuite de données entre communes est traitée comme un incident de sécurité critique.
- **Les mots de passe sont hachés.** Même les mainteneurs ne peuvent pas les lire.
- **Aucun pistage analytique par défaut.** Vous décidez ce que vous ajoutez.

Détails dans [Politique de sécurité](../SECURITY.md).

[↑ Retour en haut](#sommaire)

---

## Questions fréquentes

**Q. Faut-il payer le logiciel ?**
R. Non. Le code est gratuit. Vous payez uniquement l'infrastructure (domaine, hébergement, base) et votre personnel.

**Q. Nous n'avons pas de développeur. Que faire ?**
R. Trois options : (1) Demander à une université locale — beaucoup d'étudiants en informatique sauteraient sur ce projet. (2) Solliciter le réseau Haitians in Tech pour un bénévole ou prestataire abordable. (3) Écrire à `info@haiticity.org`, nous aiderons à mettre en relation.

**Q. Peut-on personnaliser le site pour notre commune ?**
R. Oui — nom, logo, couleurs, photos officielles, sections communales, services et actualités sont tous configurables par commune. La base graphique est partagée pour que toutes les communes apparaissent comme une infrastructure civique nationale cohérente.

**Q. Peut-on ajouter un service propre à notre commune ?**
R. Oui. Les services se définissent dans des fichiers de contenu modifiables par n'importe qui. Voir [Guide de contenu](CONTENT_GUIDE.fr.md).

**Q. Et si notre Internet est instable ?**
R. Le site est optimisé pour faibles débits. La soumission hors-ligne est sur la feuille de route ([État de l'implémentation](v0.1-implementation-plan.md)).

**Q. Si MonCash est en panne ?**
R. Le virement bancaire sert de solution de repli. Le système émet un code mémo que les résidents joignent à leur paiement, et un admin vérifie manuellement. L'intégration MonCash en webhook est sur la feuille de route.

**Q. Nous avons déjà un site. Pourquoi changer ?**
R. Vous n'êtes pas obligé. Vous pouvez faire tourner le portail sur un sous-domaine (`services.votre-mairie.ht`) et le relier à votre site existant. Ou en faire votre site principal. Au choix.

**Q. Les résidents peuvent-ils créer un compte ?**
R. Aujourd'hui, ils peuvent soumettre des demandes anonymement. La création de compte (suivi de demandes) est sur la feuille de route.

**Q. Et la diaspora ?**
R. Le portail est multilingue (anglais/français/espagnol) et accepte les virements internationaux pour les projets communautaires. Stripe (USD/EUR) est sur la feuille de route.

**Q. Peut-on intégrer nos systèmes existants (ex. fiscalité) ?**
R. Oui. Le portail expose des API et peut être étendu. Parlez-en à votre développeur.

[↑ Retour en haut](#sommaire)

---

## Comment commencer

1. Lire ce document et le [Glossaire](GLOSSARY.fr.md) — partager les deux avec les décideurs.
2. Identifier votre développeur / IT et lui partager [Déploiement](DEPLOYMENT.fr.md) et [Intégration d'une commune](TENANT_ONBOARDING.fr.md).
3. Identifier votre référent contenu (communication) et lui partager [Guide de contenu](CONTENT_GUIDE.fr.md).
4. Choisir un domaine (ou sous-domaine).
5. Créer les comptes hébergement et base.
6. Déployer.
7. Intégrer votre commune (la créer dans le système).
8. Saisir élus, sections, installations, services, actualités.
9. Former le personnel avec [Manuel d'administration](ADMIN_MANUAL.fr.md).
10. Lancer.

[↑ Retour en haut](#sommaire)

---

## Qui contacter

| Motif | Contact |
|---|---|
| Questions générales | `info@haiticity.org` |
| Trouver un développeur | `info@haiticity.org` |
| Sécurité ou vulnérabilité | `security@haiticity.org` |
| Licence pour usage commercial | `licensing@haiticity.org` |
| Bug ou demande de fonctionnalité | [Ouvrir une issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose) |

Voir aussi le projet sur [GitHub](https://github.com/haitiansintech/HaitiCityPortal).

[↑ Retour en haut](#sommaire)

---

[← Index de la documentation](README.fr.md) · [Glossaire](GLOSSARY.fr.md) · [Déploiement →](DEPLOYMENT.fr.md)
