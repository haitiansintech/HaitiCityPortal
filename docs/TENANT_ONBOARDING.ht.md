<!--
Lang yo: English (TENANT_ONBOARDING.md) | Français (TENANT_ONBOARDING.fr.md) | Kreyòl (fichye sa a) | Español (TENANT_ONBOARDING.es.md)
-->

**Lang yo:** [English](TENANT_ONBOARDING.md) · [Français](TENANT_ONBOARDING.fr.md) · **Kreyòl Ayisyen** · [Español](TENANT_ONBOARDING.es.md)

[← Endèks dokimantasyon](README.ht.md) · [README pwojè a](../README.md) · [Glosè](GLOSSARY.ht.md)

---

# Mete yon Vil Anplas (tenant onboarding)

Kijan pou ajoute yon nouvo komin (yon « tenant ») sou yon deplwaman Haiti City Portal k ap mache. Dokiman sa pran swit apre [Deplwaman](DEPLOYMENT.ht.md).

## Tablo Kontni

- [Kisa yon tenant ye?](#kisa-yon-tenant-ye)
- [Prerequi](#prerequi)
- [Lis verifikasyon](#lis-verifikasyon)
- [Etap 1 — Chwazi yon soudomèn](#etap-1--chwazi-yon-soudomèn)
- [Etap 2 — Kreye liy tenant la](#etap-2--kreye-liy-tenant-la)
- [Etap 3 — Verifye soudomèn nan reponn](#etap-3--verifye-soudomèn-nan-reponn)
- [Etap 4 — Kreye premye itilizatè admin](#etap-4--kreye-premye-itilizatè-admin)
- [Etap 5 — Ajoute ofisyèl ak seksyon kominal](#etap-5--ajoute-ofisyèl-ak-seksyon-kominal)
- [Etap 6 — Ajoute etablisman](#etap-6--ajoute-etablisman)
- [Etap 7 — Ajoute sèvis ak nouvèl](#etap-7--ajoute-sèvis-ak-nouvèl)
- [Etap 8 — Pèsonalize tenant la](#etap-8--pèsonalize-tenant-la)
- [Etap 9 — Fòme staf ak lanse](#etap-9--fòme-staf-ak-lanse)
- [Chanje non oswa retire yon tenant](#chanje-non-oswa-retire-yon-tenant)
- [Erè yo fè souvan](#erè-yo-fè-souvan)

---

## Kisa yon tenant ye?

Yon **tenant** se yon komin. Chak liy nan baz done a (ofisyèl, demann, peyman, nouvèl) apatni a yon sèl tenant. Pòtal la sèvi nenpòt kantite tenant nan yon sèl aplikasyon — chak rive pa pwòp soudomèn li.

Yon liy nan tab `tenants` se sous laverite. Kolòn `subdomain` lan pilote routaj. Si `tenants.subdomain = "jacmel"`, alò `https://jacmel.portal.ht` se pòtal komin sa a.

Plis sou achitekti: [Achitekti](ARCHITECTURE.ht.md).

[↑ Retounen anwo](#tablo-kontni)

---

## Prerequi

Anvan ou ajoute yon nouvo tenant:

- Deplwaman pwodiksyon k ap mache ([Deplwaman](DEPLOYMENT.ht.md)).
- DNS wildcard konfigire (`*.portal.ht`).
- Domèn wildcard nan Vercel (**Settings → Domains**).
- Aksè baz done (`DATABASE_URL`).

Idantifye **sponsò tenant** (majistra oswa chèf kabinè) ak **lidè tenant** (anplwaye responsab kontni ak admin).

[↑ Retounen anwo](#tablo-kontni)

---

## Lis verifikasyon

Pou chak nouvo komin:

- [ ] Soudomèn chwazi
- [ ] Liy tenant kreye
- [ ] Soudomèn reponn ak HTTPS
- [ ] Premye admin kreye
- [ ] Seksyon kominal antre
- [ ] Ofisyèl antre
- [ ] Etablisman ajoute (oswa enpòte)
- [ ] Sèvis dekri an MDX (oswa sekou anglè okòmansman)
- [ ] Omwen yon atik nouvèl pibliye
- [ ] Lòlò, koulè, foto majistra konfigire
- [ ] Omwen de anplwaye fòme
- [ ] Lansman restren
- [ ] Lansman piblik

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 1 — Chwazi yon soudomèn

Idantifyan kout, fasil pou sonje, miniskil, san espas oswa karaktè espesyal.

| Komin | Soudomèn sigjere |
|---|---|
| Jakmèl | `jacmel` |
| Cap-Haïtien | `cap` oswa `capha` |
| Pòtoprens | `pap` |
| Pétion-Ville | `petionville` |
| Les Cayes | `cayes` |
| Croix-des-Bouquets | `croix` |

URL final: `https://{subdomain}.portal.ht`.

**Mo rezève pou evite:** `www`, `admin`, `api`, `static`, `assets`, `cdn`, `mail`, `email`, `app`, `staging`, `dev`, `test`, `localhost`, `demo`.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 2 — Kreye liy tenant la

De metòd.

### Opsyon A — Script seed (rekòmande pou tou premye tenant)

Wè [Deplwaman, etap 6.2](DEPLOYMENT.ht.md#etap-6--schema-inisyal-ak-seed). Script la kreye liy tenant ak superadmin nan menm fwa.

### Opsyon B — Drizzle Studio (pou pwochèn komin)

```bash
npm run db:studio
```

1. Louvri tab `tenants`.
2. **+ Add Record**.
3. `name`: `Ville du Cap-Haïtien`. `subdomain`: `cap`.
4. Sove. Note `id` (UUID) jenere a.

### Opsyon C — SQL dirèk

```sql
INSERT INTO tenants (name, subdomain)
VALUES ('Ville du Cap-Haïtien', 'cap')
RETURNING id;
```

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 3 — Verifye soudomèn nan reponn

Louvri `https://cap.portal.ht`. Paj akèy la dwe parèt ak non komin lan.

Si « DB unavailable »:
- CNAME wildcard DNS.
- `*.portal.ht` nan Vercel **Settings → Domains**.
- `subdomain` matche URL la (sansib pou kas, miniskil).
- SSL pwovizyone (jiska 10 minit premye fwa).

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 4 — Kreye premye itilizatè admin

### Opsyon A — Drizzle Studio

1. Tab `users` → **+ Add Record**.
2. `tenant_id`: UUID etap 2. `email`: `admin@cap.portal.ht`.
3. `password_hash`: hash bcrypt **pa modpas an klè**:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('MODPAS_OU', 10))"
   ```
4. `role`: `superadmin`. `name`: `Admin Cap-Haïtien`.
5. Sove.

### Opsyon B — SQL

```sql
INSERT INTO users (tenant_id, email, password_hash, role, name)
VALUES ('<UUID>', 'admin@cap.portal.ht', '$2a$10$...', 'superadmin', 'Admin Cap-Haïtien');
```

Teste sou `https://cap.portal.ht/login`.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 5 — Ajoute ofisyèl ak seksyon kominal

### 5.1 Seksyon kominal

Pou chak seksyon, liy nan `communal_sections`: `tenant_id`, `name` (« 1ère Section Bas Limbé »), `code` (`cap-1`).

### 5.2 Ofisyèl

Pou chak ofisyèl eli, liy nan `officials`: `tenant_id`, `name`, `role` (`casec`/`asec`/`mayor`/`town_delegate`), `communal_section_id`, `whatsapp`, `vwa_profile_url`, `photo_url`.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 6 — Ajoute etablisman

Liy nan `facilities`: `tenant_id`, `name`, `category` (hospital/school/police/church/market/other), `latitude`, `longitude`, `address`, `phone`.

Konsèy: rezidan ka pwopoze koreksyon; yo rive nan `facility_suggestions`.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 7 — Ajoute sèvis ak nouvèl

Sèvis ak nouvèl yo se **fichye kontni**, pa liy BD. Wè [Gid Kontni](CONTENT_GUIDE.ht.md). Wit sèvis pa default yo ase pou pifò komin nan lansman.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 8 — Pèsonalize tenant la

Jodi a pèsonalizab pa tenant:
- `name` nan navbar la.
- `subdomain`.
- Foto atravè `officials.photo_url`.

Lòlò pèsonalize ak koulè sou plan. Annatant: mete vizyèl ou nan `public/tenants/{subdomain}/`.

[↑ Retounen anwo](#tablo-kontni)

---

## Etap 9 — Fòme staf ak lanse

Distribiye [Manyèl Administrasyon](ADMIN_MANUAL.ht.md). Sesyon 1–2 èdtan: koneksyon, demann, verifikasyon peyman, nouvèl, alèt, pasaj. Apre lansman restren, apre lansman piblik.

[↑ Retounen anwo](#tablo-kontni)

---

## Chanje non oswa retire yon tenant

### Chanje non

`name` ka chanje. `subdomain` dwe rete stab. Si w dwe chanje l: kreye nouvo a, redirije ansyen an, kominike 90 jou.

### Retire

Backup dabò. Retire liy depandan anvan `tenants`:

```sql
DELETE FROM payment_records WHERE tenant_id = '<UUID>';
DELETE FROM service_requests WHERE tenant_id = '<UUID>';
DELETE FROM facilities WHERE tenant_id = '<UUID>';
-- ... pou chak tab antite ...
DELETE FROM tenants WHERE id = '<UUID>';
```

Pi bon: achive olye retire.

[↑ Retounen anwo](#tablo-kontni)

---

## Erè yo fè souvan

| Erè | Senptòm | Koreksyon |
|---|---|---|
| `*.portal.ht` pa nan Vercel | 404 | Settings → Domains |
| Soudomèn an majiskil | Tenant pa jwenn | Miniskil sèlman |
| Modpas an klè nan `password_hash` | Login toujou echwe | Jenere yon hash bcrypt |
| `tenant_id` bliye | Liy envizib | Met liy lan ajou |
| De tenant menm `subdomain` | Routaj endefini | Kontrent inisite |
| Mo rezève kòm subdomain | Konfli | Chwazi yon lòt non |

[↑ Retounen anwo](#tablo-kontni)

---

[← Endèks dokimantasyon](README.ht.md) · [Deplwaman](DEPLOYMENT.ht.md) · [Manyèl Administrasyon →](ADMIN_MANUAL.ht.md)
