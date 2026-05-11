<!--
Lang yo: English (DEPLOYMENT.md) | Français (DEPLOYMENT.fr.md) | Kreyòl (fichye sa a) | Español (DEPLOYMENT.es.md)
-->

**Lang yo:** [English](DEPLOYMENT.md) · [Français](DEPLOYMENT.fr.md) · **Kreyòl Ayisyen** · [Español](DEPLOYMENT.es.md)

[← Endèks dokimantasyon](README.ht.md) · [README pwojè a](../README.md) · [Glosè](GLOSSARY.ht.md)

---

# Deplwaman

Gid etap pa etap pou deplwaye Haiti City Portal an pwodiksyon. Dokiman sa fèt pou devlopè oswa lidè IT k ap opere sèvis an liy lan.

## Tablo Kontni

- [Prerequi](#prerequi)
- [Apèsi achitekti](#apèsi-achitekti)
- [Etap 1 — Domèn](#etap-1--domèn)
- [Etap 2 — DNS wildcard](#etap-2--dns-wildcard)
- [Etap 3 — Baz done (Neon)](#etap-3--baz-done-neon)
- [Etap 4 — Ebèjman (Vercel)](#etap-4--ebèjman-vercel)
- [Etap 5 — Varyab anviwònman](#etap-5--varyab-anviwònman)
- [Etap 6 — Schema inisyal ak seed](#etap-6--schema-inisyal-ak-seed)
- [Etap 7 — Konekte domèn ak Vercel](#etap-7--konekte-domèn-ak-vercel)
- [Etap 8 — Verifye deplwaman an](#etap-8--verifye-deplwaman-an)
- [Etap 9 — Ajoute premye tenant ou](#etap-9--ajoute-premye-tenant-ou)
- [Mete aplikasyon an ajou](#mete-aplikasyon-an-ajou)
- [Backup ak rekiperasyon](#backup-ak-rekiperasyon)
- [Siveyans ak log](#siveyans-ak-log)
- [Rezime pri](#rezime-pri)
- [Lòt platfòm](#lòt-platfòm)
- [Rezolisyon pwoblèm](#rezolisyon-pwoblèm)

---

## Prerequi

Sou òdinatè w:

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [GitHub CLI](https://cli.github.com/) (`gh`) — opsyonèl
- Yon editè kòd (VS Code, Cursor)

Kont ou bezwen:

- [GitHub](https://github.com) — pou fork depo a
- Yon biwo enskripsyon domèn (Namecheap, Cloudflare, Porkbun…)
- [Vercel](https://vercel.com) — ebèjman
- [Neon](https://neon.tech) — baz PostgreSQL

[↑ Retounen anwo](#tablo-kontni)

---

## Apèsi achitekti

An pwodiksyon:

```
        Entènèt
           │
           ▼
   ┌───────────────┐       (chak komin gen pwòp soudomèn)
   │ Cloudflare /  │       egz.  jacmel.portal.ht
   │  biwo DNS     │             cap.portal.ht
   │  *.portal.ht  │             demo.portal.ht
   └───────┬───────┘
           │
           ▼
   ┌───────────────┐       App Next.js:
   │    Vercel     │       - middleware li Host → tenant
   │  (Next.js 15) │       - server components rekèt BD
   └───────┬───────┘       - HTTPS otomatik
           │
           ▼
   ┌───────────────┐       Postgres 16:
   │     Neon      │       - yon baz pataje
   │  (PostgreSQL) │       - liy filtre pa tenant_id
   └───────────────┘
```

Wè [Achitekti](ARCHITECTURE.ht.md) pou dyagram konplè.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 1 — Domèn

Yon sèl domèn pou tout komin pataje kòm soudomèn.

Rekòmande: yon `.ht` pou idantite ayisyen, men nenpòt TLD mache.

| Biwo | Nòt |
|---|---|
| Cloudflare | Renouvèlman pi bon mache, DNS ekselan, SSL gratis |
| Namecheap | Entèfas senp, bon sipò |
| Porkbun | Bon mache, modèn |

Apre acha, **mete nameservers domèn ou pwente sou Cloudflare** si w te achte yon lòt kote.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 2 — DNS wildcard

Multi-tenant egzije yon wildcard DNS.

Sou founisè DNS ou (Cloudflare isit la), ajoute **de CNAME**:

| Tip | Non | Sib | Proxy |
|---|---|---|---|
| CNAME | `@` (apèks) | `cname.vercel-dns.com` | DNS only (nyaj gri) |
| CNAME | `*` | `cname.vercel-dns.com` | DNS only (nyaj gri) |

`*` la pèmèt `jacmel.portal.ht`, `cap.portal.ht`, ak nenpòt komin nan tan kap vini rezoud otomatikman.

> **Enpòtan:** sou Cloudflare, mete antre yo nan « DNS only » (nyaj gri) okòmansman. Vercel dwe bay sètifika SSL pou chak soudomèn.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 3 — Baz done (Neon)

1. Konekte sou [neon.tech](https://neon.tech).
2. Kreye yon **Pwojè** `haiti-city-portal-prod`.
3. Chwazi rejyon ki pi pre: **AWS US East 2 (Ohio)** oswa **US East 1 (Vijini)**.
4. Kopye **chèn koneksyon** an:
   ```
   postgresql://USER:PASSWORD@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. Sa va vin varyab `DATABASE_URL` nan etap 5.

> **Konsèy:** plan gratis Neon jenere. Kòmanse gratis epi monte sou plan « Launch » (~$19/mwa) lè itilizasyon ap monte.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 4 — Ebèjman (Vercel)

### 4.1 Fork depo a

1. Ale sou [github.com/haitiansintech/HaitiCityPortal](https://github.com/haitiansintech/HaitiCityPortal).
2. Klike **Fork** anwo adwat.
3. (Opsyonèl) Chanje non fork ou (`mairie-jacmel-portal`).

### 4.2 Enpòte nan Vercel

1. Konekte sou [vercel.com](https://vercel.com) ak GitHub.
2. **Add New… → Project**.
3. Chwazi fork ou.
4. **Framework preset**: Next.js (otomatik).
5. **Root directory**: default.
6. **Build & output settings**: default.
7. **Pa klike Deploy** kounye a — ajoute varyab yo dabò (etap 5).

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 5 — Varyab anviwònman

Nan paramèt Vercel:

| Varyab | Bezwen? | Egzanp |
|---|---|---|
| `DATABASE_URL` | **Wi** | `postgresql://USER:PASS@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `AUTH_SECRET` | **Wi** | Chèn aleatwa 32+ karaktè. `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Wi** | `https://portal.ht` |
| `AUTH_TRUST_HOST` | Rekòmande | `true` |
| `NEXT_PUBLIC_BASE_URL` | Opsyonèl | `https://portal.ht` |
| `ENABLE_LOCAL_MODE` | Dwe **pa defini oswa `false`** an pwodiksyon | (pa defini) |

Modèl konplè ak kòmantè: [`.env.production.example`](../.env.production.example).

> **Atansyon:** pa janm commit sekrè sou GitHub. Vercel kripte varyab anviwònman.

Klike **Deploy**.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 6 — Schema inisyal ak seed

Premye deplwaman lanse app la, men baz la vid.

### 6.1 Pouse schema a

Soti sou òdinatè w:

```bash
git clone https://github.com/OU-ORG/HaitiCityPortal.git
cd HaitiCityPortal
npm install
echo 'DATABASE_URL="<chèn Neon ou>"' > .env.local
npm run db:push
```

### 6.2 Seed premye tenant

```bash
$env:CONFIRM_PRODUCTION_SEED="yes"
$env:SEED_ADMIN_EMAIL="admin@domèn-ou.ht"
$env:SEED_ADMIN_PASSWORD="<modpas fò, inik>"
$env:SEED_TENANT_NAME="Vil Jakmèl"
$env:SEED_TENANT_SUBDOMAIN="jacmel"

npm run db:seed:prod
```

(Sou macOS/Linux: `export VAR=valè`.)

Sa kreye:
- Yon liy `tenants` ak soudomèn ou chwazi.
- Yon liy `users` superadmin ak imèl ou ak modpas hash.

Konekte apre sou `https://jacmel.portal.ht/login` lè DNS rezoud (etap 7).

Pou ajoute lòt komin: [Mete yon Vil Anplas](TENANT_ONBOARDING.ht.md).

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 7 — Konekte domèn ak Vercel

Nan Vercel:

1. **Settings → Domains**.
2. Ajoute `portal.ht`.
3. Ajoute `*.portal.ht` (wildcard la).
4. Vercel verifye DNS la (etap 2) epi bay sètifika SSL otomatikman.

Apre:
- `https://portal.ht` → rive nan app la.
- `https://jacmel.portal.ht` → rive nan tenant Jacmel ou.

> **Apèks domèn:** si biwo w pa sipòte CNAME nan apèks la, itilize antre A Vercel rekòmande. Cloudflare ak Porkbun jere CNAME-flattening.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 8 — Verifye deplwaman an

Lis verifikasyon:

- [ ] `https://portal.ht` reponn.
- [ ] `https://jacmel.portal.ht` reponn.
- [ ] `https://jacmel.portal.ht/api/health` retounen OK.
- [ ] Chanjman lang: `/en/`, `/fr/`, `/ht/`, `/es/`.
- [ ] Konekte sou `/login` ak admin ou.
- [ ] Aksè a yon paj admin (`/admin`).
- [ ] Ikon kadna HTTPS valid.

Si yon bagay echwe: [Rezolisyon pwoblèm](#rezolisyon-pwoblèm).

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 9 — Ajoute premye tenant ou

Si ou seedè yon tenant nan etap 6, sa fini. Pase pou antre done atravè admin — wè [Manyèl Administrasyon](ADMIN_MANUAL.ht.md).

Pou pwochèn komin: [Mete yon Vil Anplas](TENANT_ONBOARDING.ht.md).

[↑ Retounen anwo](#tablo-kontni)

---

## Mete aplikasyon an ajou

Lè kòd nouvo soti anwo:

1. Senkronize fork ou: GitHub → fork ou → bouton **Sync fork**.
2. Vercel redeplwaye otomatikman sou chak push sou `main`.
3. Si gen chanjman schema, lanse `npm run db:push` sou prod (oswa otomatize nan CI).

Rekòmande: yon anviwònman `staging` Vercel ak yon baz Neon distenk pou tès anvan.

[↑ Retounen anwo](#tablo-kontni)

---

## Backup ak rekiperasyon

| Risk | Solisyon |
|---|---|
| Pèdi baz | Snapshot otomatik Neon. Plan peye: 30 jou. |
| Bug app | Vercel kenbe tout deplwaman anvan yo. **Promote to Production** = rollback enstantane. |
| DNS pirate | 2FA sou registrar ak founisè DNS. |
| Modpas admin pèdi | Reseti atravè Drizzle Studio oswa re-seed. |
| `AUTH_SECRET` pèdi | Wotasyon = dekonekte tout sesyon. Konsève nan jesyonè modpas. |

[↑ Retounen anwo](#tablo-kontni)

---

## Siveyans ak log

- **Logs Vercel**: Settings → Logs.
- **Tablo Neon**: pèfòmans ak depo.
- Opsyonèl: **Sentry** pou erè aplikasyon.
- Opsyonèl: **Better Stack / Pingdom** sou `/api/health` pou disponiblite.

[↑ Retounen anwo](#tablo-kontni)

---

## Rezime pri

| Eleman | Gratis | Standar peye |
|---|---|---|
| Vercel | $0 | $20/itilizatè/mwa (Pro) |
| Neon | $0 | $19/mwa (Launch) |
| Cloudflare DNS | $0 | $0 |
| Domèn `.ht` | n/a | ~$30/ane |
| Total | **~$0/mwa + $30/ane** | **~$40/mwa + $30/ane** |

[↑ Retounen anwo](#tablo-kontni)

---

## Lòt platfòm

Se Next.js 15 estanda; mache nenpòt kote Node.js mache.

| Altènatif | Nòt |
|---|---|
| VPS oto-ebèje (Hetzner, Linode, OVH) | Docker; ~$5–20/mwa; ou jere SSL ak backup |
| Cloudflare Pages + Workers | Posib ak adaptè; kèk fonksyon Next.js limite |
| Fly.io | Bon pou Postgres + Next.js oto-ebèje |
| Railway | Eksperyans menm jan ak Vercel |
| Render | Eksperyans menm jan ak Vercel |
| AWS, GCP, Azure | Posib men lou; pa rekòmande pou premye deplwaman |

Oto-ebèjman: ou responsab pou SSL, sètifika wildcard, jesyon pwosesis, backup Postgres.

[↑ Retounen anwo](#tablo-kontni)

---

## Rezolisyon pwoblèm

### Soudomèn retounen « 404 Not Found »
- Verifye CNAME wildcard egziste.
- Verifye `*.portal.ht` byen mete nan Vercel **Settings → Domains**.
- Bay SSL Vercel ka pran 1–10 minit premye fwa a.

### « DB unavailable, using fallback tenant »
- `DATABASE_URL` manke oswa pa kòrèk.
- Baz Neon an pòz (free tier auto-pause apre 5 minit).
- Chèn koneksyon san `?sslmode=require`.

### « MISSING_MESSAGE » oswa « FORMATTING_ERROR »
- Yon kle manke nan `messages/{locale}.json`. Verifye paritè kle yo.

### Bouk redireksyon nan koneksyon
- `NEXTAUTH_URL` pa matche URL reyèl la.
- `AUTH_SECRET` pa defini oswa < 32 karaktè.
- `AUTH_TRUST_HOST` pa `true`.

### `npm run db:push` echwe
- Teste koneksyon `psql` an premye.
- Verifye rejyon pwojè Neon kòrèk.

### Build Vercel echwe nan premye deplwaman
- Verifye varyab manke nan log build.

[↑ Retounen anwo](#tablo-kontni)

---

[← Endèks dokimantasyon](README.ht.md) · [Pou minisipalite](FOR_MUNICIPALITIES.ht.md) · [Mete yon Vil Anplas →](TENANT_ONBOARDING.ht.md)
