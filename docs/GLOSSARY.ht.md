<!--
Lang yo: English (GLOSSARY.md) | Français (GLOSSARY.fr.md) | Kreyòl (fichye sa a) | Español (GLOSSARY.es.md)
-->

**Lang yo:** [English](GLOSSARY.md) · [Français](GLOSSARY.fr.md) · **Kreyòl Ayisyen** · [Español](GLOSSARY.es.md)

[← Endèks dokimantasyon](README.ht.md) · [README pwojè a](../README.md)

---

# Glosè

Definisyon an lang senp pou tout tèm teknik, sivik, ak espesifik pou Ayiti yo itilize nan dokimantasyon sa a. Si yon mo bloke w nan yon dokiman, gade isit la. Si yon tèm manke, [louvri yon Pull Request](https://github.com/haitiansintech/HaitiCityPortal/edit/main/docs/GLOSSARY.ht.md) oswa [yon issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose).

## Tablo Kontni

- [Tèm sivik ak ayisyen](#tèm-sivik-ak-ayisyen)
- [Tèm teknik](#tèm-teknik)
- [Tèm operasyon](#tèm-operasyon)
- [Tèm espesifik pou pwojè a](#tèm-espesifik-pou-pwojè-a)
- [Akwonim](#akwonim)

---

## Tèm sivik ak ayisyen

| Tèm | Sans |
|---|---|
| **CASEC** | *Conseil d'Administration de la Section Communale*. Konsèy twa moun ki eli pou dirije yon *seksyon kominal*. |
| **ASEC** | *Assemblée de la Section Communale*. Asanble lejislatif eli yon seksyon kominal, akote CASEC la. |
| **Komin** | Yon minisipalite an Ayiti — menm bagay ak yon vil. Chak komin gen yon majistra; se nivo gouvènman sa a pòtal sa a sèvi. |
| **Seksyon kominal** | Sou-inite jeyografik nan yon komin, jere pa yon CASEC + ASEC. |
| **Majistra** | Chèf eli yon komin. |
| **Delege Vil** | Reprezantan gouvènman santral nonmen nan yon komin. |
| **MonCash** | Sèvis lajan mobil ki pi itilize an Ayiti, jere pa Digicel. Anpil rezidan peye fakti yo pa MonCash. |
| **NIF** | *Numéro d'Identification Fiscale*. Nimewo idantifikasyon fiskal ayisyen — egzije pou pifò demach ofisyèl. |
| **CIN** | *Carte d'Identification Nationale*. Kat idantite nasyonal ayisyen. |
| **Kitans / Quittance** | Resi oswa prèv peyman. Pòtal la bay yon kitans lè yon peyman verifye. |
| **Open311** | Estanda entènasyonal louvri ki pèmèt sitwayen siyale pwoblèm ki pa ijans (twou nan wout, fatra, limyè) bay minisipalite. Fòm `/report` pòtal la swiv estanda sa a. |

---

## Tèm teknik

| Tèm | Sans |
|---|---|
| **Frontend** | Pati nan yon aplikasyon ki kouri nan navigatè itilizatè a (paj, fòm, bouton). |
| **Backend** | Pati ki kouri sou yon sèvè: koneksyon, baz done, peyman. Itilizatè a pa janm wè kòd backend. |
| **Full-stack** | Yon aplikasyon ki gen tou de frontend ak backend nan menm pwojè a. Haiti City Portal se full-stack. |
| **Next.js** | Framework web pwojè a baze sou. Li bay tou de paj (frontend) ak lojik sèvè (backend) soti nan yon sèl kòd. |
| **App Router** | Sistèm routaj modèn nan Next.js 13+ kote chak dosye anba `src/app/` vin yon URL. |
| **React** | Bibliyotèk JavaScript Next.js itilize pou bati entèfas. |
| **Server Component** | Paj oswa konpozan ki kouri sou sèvè a epi voye HTML deja pare nan navigatè a. Pi rapid, pi bon pou SEO, ka li baz done dirèkteman. |
| **Client Component** | Konpozan ki kouri nan navigatè a. Bezwen pou bagay entèraktif (kat, fòm, animasyon). Make ak `"use client"` an wo fichye a. |
| **Server Action** | Fonksyon backend ou ka rele dirèkteman soti nan yon fòm. Defini nan `src/app/actions/`. |
| **API route** | Pwen bakend nan yon URL tankou `/api/health`. |
| **Middleware** | Kòd ki kouri sou sèvè a *anvan* yon paj rann. Pwojè sa a sèvi avè l pou detekte lang, idantifye vil (tenant), ak pwoteje paj admin. |
| **Baz done** | Kote done dinamik yo estoke: vil, itilizatè, demann sèvis, peyman, evènman. |
| **PostgreSQL (Postgres)** | Motè baz done a. Gratis, kòd louvri, anpil itilize. |
| **Drizzle ORM** | Zouti ki pèmèt devlopè ekri rekèt nan TypeScript olye SQL kri. Schema a nan `src/db/schema.ts`. |
| **Schema** | Plan baz done a — ki tab egziste, ki kolòn, ki tip. |
| **Migrasyon** | Fichye ki met schema a ajou (ajoute yon kolòn, chanje non yon tab). Drizzle jenere yo. |
| **Seeding** | Mete done depa nan yon baz vid (egzanp, yon vil demo). Lanse ak `npm run db:seed`. |
| **TypeScript** | Vèsyon JavaScript ak verifikasyon tip — kenbe anpil bug anvan kòd la kouri. |
| **Tailwind CSS** | Sistèm style kote w ekri ti klas (`bg-blue-500 p-4`) dirèkteman nan HTML. Pwojè a itilize Tailwind v4. |
| **shadcn/ui** | Bibliyotèk konpozan UI aksesib epi pèsonalizab (bouton, dyalòg, antre) bati sou Tailwind. |
| **MDX** | Markdown ak konpozan React anndan. Deskripsyon sèvis ak atik nouvèl ekri an MDX. |
| **Frontmatter** | Blòk YAML an wo yon fichye MDX (ant `---`) ki gen metadone (tit, dat, frè). |
| **MapLibre GL** | Bibliyotèk kat kòd louvri itilize nan `/map`. |
| **Leaflet** | Bibliyotèk kat pi senp, itilize nan ane riye etablisman yo. |
| **NextAuth (Auth.js)** | Bibliyotèk ki jere koneksyon, sesyon, ak wòl. |
| **bcryptjs** | Bibliyotèk pou hash modpas an sekirite. Modpas orijinal pa janm estoke. |
| **Zod** | Bibliyotèk pou valide done itilizatè antre nan fòm. |
| **next-intl** | Bibliyotèk ki jere kat lang yo ak URL prefiks-lokal (`/ht/`, `/fr/`, `/en/`, `/es/`). |

---

## Tèm operasyon

| Tèm | Sans |
|---|---|
| **Domèn** | Adrès web yon sit, egzanp `portal.ht`. Achte nan yon biwo enskripsyon (Namecheap, Cloudflare, GoDaddy…). |
| **Soudomèn** | Non devan yon domèn, egzanp `jacmel.portal.ht`. Se konsa pòtal la idantifye ki vil. |
| **DNS wildcard (joker)** | Yon antre DNS tankou `*.portal.ht` ki matche *nenpòt* soudomèn. Esansyèl pou ajoute yon nouvo vil san chanje DNS la. |
| **DNS** | Liv adrès Entènèt la. Marye `jacmel.portal.ht` ak adrès IP sèvè a. |
| **SSL / TLS / HTTPS** | Kadna nan navigatè a. Kripte trafik. Vercel bay li gratis. |
| **Hosting (ebèjman)** | Sèvè ki fè sit pwodiksyon an mache. Pwojè a fèt pou Vercel (rekòmande) men li mache nenpòt kote Node.js mache. |
| **Vercel** | Platfòm ebèjman bati pa konpayi ki fè Next.js. Plan gratis disponib; plan peye kòmanse $20/mwa. |
| **Neon** | Sèvis PostgreSQL jere souvan parye ak Vercel. Plan gratis disponib. |
| **Varyab anviwònman** | Valè konfigirasyon (modpas baz done, elatriye) bay aplikasyon an — pa janm ekri nan kòd. Estoke nan `.env.local` lokalman, nan tablobò ebèjè a pou pwodiksyon. |
| **CI / CD** | Entegrasyon Kontinyèl / Deplwaman Kontinyèl. Verifikasyon otomatik (lint, typecheck, build, tès) sou chak PR. Defini nan `.github/workflows/ci.yml`. |
| **Pull Request (PR)** | Pwopozisyon chanjman kòd, louvri sou GitHub pou revizyon anvan fizyon. |
| **Pwoteksyon branch** | Règ GitHub ki anpeche push dirèk sou `main` epi mande revizyon sou PR. |
| **Siyati GPG** | Siyen kriptografikman commits ou pou prouve yo soti nan men ou vrèman. Egzije pa pwoteksyon branch lan. |

---

## Tèm espesifik pou pwojè a

| Tèm | Sans |
|---|---|
| **Tenant** | Yon sèl minisipalite/vil sèvi pa pòtal la. Tout pwojè a fèt pou yon sèl aplikasyon ka sèvi anpil tenant. |
| **SaaS multi-tenant** | Modèl kote yon sèl aplikasyon sèvi anpil òganizasyon diferan, done yo izole. Haiti City Portal multi-tenant: yon sèl sèvè ka fè Jacmel, Cap-Haïtien, ak Pétion-Ville mache anmenmtan. |
| **`tenant_id`** | Kolòn UUID sou chak liy nan baz done a ki di a ki vil liy lan apatni. Chak rekèt dwe filtre pa `tenant_id`. |
| **Antèt `x-tenant-subdomain`** | Antèt HTTP entèn middleware a mete ki di rès aplikasyon an ki soudomèn vil rekèt aktyèl la soti. |
| **UUID** | Idantifyan aleatwa 128 bit tankou `550e8400-e29b-41d4-a716-446655440000`. Itilize kòm kle prensipal sou tout tab — pa janm antye sekansyèl. |
| **Lokal** | Kòd lang: `en` (anglè), `fr` (franse), `ht` (kreyòl ayisyen), `es` (espanyòl). Lokal default: `ht`. |
| **Prefiks lokal** | Pati `/ht/` oswa `/en/` nan yon URL. Tout paj piblik anba yon prefiks. |
| **Sekou lokal (locale fallback)** | Si yon fichye franse manke, pòtal la itilize fichye anglè a san pwoblèm. Pèmèt tradiktè liberasyon yon lang nan yon fwa. |
| **Kòd memo** | Kòd kout lizib (egzanp `JAC-TAX-8821`) montre yon rezidan apre yon demann peyman. Yo itilize l kòm referans nan MonCash oswa transfè bankè pou yon admin ka rekonsilye lajan an. |
| **Pending upload** | Estati yon peyman ki gen kòd memo bay men resepsyon pa ankò konfime pa yon admin. |
| **Rekonsilyasyon manyèl** | Pwosesis aktyèl kote yon admin konpare relve labank/MonCash ak peyman annatant nan pòtal la epi make yo verifye. Ap ranplase pita ak webhooks. |
| **Demann sèvis** | Rapò oswa demann yon sitwayen — konpatib Open311. Estoke nan `service_requests`. |
| **Rapò teren** | Obsèvasyon yon staf soti depi sou teren. Diferan ak demann sèvis. |
| **Seksyon kominal** (tèm BD) | Liy nan tab `communal_sections` ki reprezante yon sou-inite jeyografik; ofisyèl CASEC/ASEC lye ak yon sèl. |
| **Handbook** | Atik manyèl gouvènans entèn (`handbook_articles`), vizib sèlman pou admin ki gen bon wòl la. |
| **Snapshot odit** | Kopi chif finansyè nan yon moman pou detekte falsifikasyon apre. |
| **Alèt ijans** | Mesaj difize sou nivo yon tenant (siklòn, kouvrefe, koupire dlo). |

---

## Akwonim

| Akwonim | Vle di |
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

[↑ Retounen anwo](#glosè) · [← Endèks dokimantasyon](README.ht.md) · [README pwojè a →](../README.md)
