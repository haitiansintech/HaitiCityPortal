<!--
Lang yo: English (FOR_MUNICIPALITIES.md) | Français (FOR_MUNICIPALITIES.fr.md) | Kreyòl (fichye sa a) | Español (FOR_MUNICIPALITIES.es.md)
-->

**Lang yo:** [English](FOR_MUNICIPALITIES.md) · [Français](FOR_MUNICIPALITIES.fr.md) · **Kreyòl Ayisyen** · [Español](FOR_MUNICIPALITIES.es.md)

[← Endèks dokimantasyon](README.ht.md) · [README pwojè a](../README.md) · [Glosè](GLOSSARY.ht.md)

---

# Pou Minisipalite yo

Yon gid ki pa teknik pou majistra, konseye, ak anplwaye lameri k ap konsidere Haiti City Portal pou komin yo.

## Tablo Kontni

- [Kisa Haiti City Portal ye?](#kisa-haiti-city-portal-ye)
- [Ki sa rezidan ou yo ka fè?](#ki-sa-rezidan-ou-yo-ka-fè)
- [Ki sa staf ou ka fè?](#ki-sa-staf-ou-ka-fè)
- [Sa w bezwen pou fè l mache](#sa-w-bezwen-pou-fè-l-mache)
- [Estimasyon pri](#estimasyon-pri)
- [Tan pou lansman](#tan-pou-lansman)
- [Wòl ou bezwen sou bò pa w](#wòl-ou-bezwen-sou-bò-pa-w)
- [Lang ak aksesibilite](#lang-ak-aksesibilite)
- [Done, pwopriyete, ak vi prive](#done-pwopriyete-ak-vi-prive)
- [Kesyon yo poze souvan](#kesyon-yo-poze-souvan)
- [Kijan pou kòmanse](#kijan-pou-kòmanse)
- [Ak kilès pou kontakte](#ak-kilès-pou-kontakte)

---

## Kisa Haiti City Portal ye?

Haiti City Portal se yon **lojisyèl gratis ak kòd louvri** pou komin ayisyen yo. Li bay rezidan ou yo yon sèl sit entènèt kote yo ka:

- Wè enfòmasyon sou sèvis lameri yo
- Soumèt demann epi siyale pwoblèm (twou nan wout, fatra, limyè)
- Peye frè lameri pa MonCash oswa transfè bankè
- Li nouvèl ofisyèl ak alèt ijans
- Jwenn lopital, lekòl, ak komisarya
- Wè ofisyèl eli yo epi kontakte yo

Li bay tou staf ou yon panèl administrasyon pou jere demann, verifye peyman, pibliye nouvèl, ak voye alèt ijans.

Li fèt pou **yon menm sistèm pataje ka sèvi nenpòt kantite komin**. Chak komin gen pwòp soudomèn li (egzanp `jacmel.portal.ht`, `cap.portal.ht`) ak pwòp done li — totalman separe ak lòt komin yo.

> **Nan yon fraz:** se menm kalite sistèm yon vil tankou Boston oswa Lyon itilize, men fèt espesyalman pou Ayiti — milti-lang pa default, pare pou ti bandlarjè, epi adapte ak reyalite lokal yo (CASEC, ASEC, MonCash, NIF).

[↑ Retounen anwo](#tablo-kontni)

---

## Ki sa rezidan ou yo ka fè?

| Sa rezidan ka fè | Poukisa li enpòtan |
|---|---|
| Jwenn yon sèvis epi wè dokiman ki nesesè | Mwens vwayaj initil nan lameri |
| Siyale yon pwoblèm ak foto ak GPS | Pwoblèm yo pa pèdi nan vid |
| Peye anliy pa MonCash oswa transfè | Mwens kach, mwens lafil |
| Resevwa yon kitans dijital | Mwens papye, mwens fwod |
| Wè tout etablisman piblik sou yon kat | Èd pi rapid nan ka ijans |
| Li nouvèl ak alèt ofisyèl | Enfòmasyon serye ranplase rimè |
| Itilize sit la an kreyòl, franse, anglè oswa espanyòl | Aksè egal pou rezidan ak dyaspora |
| Wè ofisyèl pa seksyon kominal | Plis responsablite demokratik |

[↑ Retounen anwo](#tablo-kontni)

---

## Ki sa staf ou ka fè?

| Sa admin ka fè | Kilès ki itilize l |
|---|---|
| Wè demann k ap antre epi chanje estati yo | Anplwaye akèy |
| Verifye peyman annatant ak relve labank/MonCash | Ofisye finans |
| Pibliye atik nouvèl ak alèt ijans | Ofisye kominikasyon |
| Jere lis ofisyèl yo ak kowòdone yo | Kabinè majistra |
| Mete ajou ane riye etablisman ak GPS yo | Responsab SIG / angajman sivik |
| Wè tablobò finans ak snapshot odit | Majistra / trezorye |
| Li ak akeyi atik manyèl gouvènans | Tout admin |
| Restren kilès ka fè kisa (wòl user/admin/superadmin) | IT / kabinè |

[↑ Retounen anwo](#tablo-kontni)

---

## Sa w bezwen pou fè l mache

Sèlman twa bagay:

1. **Yon non domèn** — egzanp `portal.ht` oswa pa w (`jacmel-mairie.ht`). Anviwon $15–30 pa ane.
2. **Yon kont ebèjman** — rekòmande: [Vercel](https://vercel.com) (gratis pou ti komin, $20–40/mwa pou pi gwo).
3. **Yon baz PostgreSQL jere** — rekòmande: [Neon](https://neon.tech) (gratis pou ti komin, $19/mwa nivo peye).

Ou **pa bezwen** sèvè fizik, sal sèvè, oswa materyèl espesyal. Tout bagay nan nyaj la.

Avèk sa twa yo, yon devlopè eksperyans ka deplwaye pòtal komin ou **nan mwens pase yon jou**.

Wè detay nan [Deplwaman](DEPLOYMENT.ht.md) ak [Mete yon Vil Anplas](TENANT_ONBOARDING.ht.md).

[↑ Retounen anwo](#tablo-kontni)

---

## Estimasyon pri

Pou yon komin gwosè mwayèn (50 000–200 000 abitan):

| Atik | Pri mwayè/mwa |
|---|---|
| Non domèn | ~$2/mwa (peye chak ane) |
| Ebèjman (Vercel) | $0–40 |
| Baz done (Neon) | $0–19 |
| Sèvis imèl (opsyonèl, egz. Resend) | $0–20 |
| Karo kat (gratis pa default ak MapLibre) | $0 |
| **Total** | **~$20–80 / mwa** |

Chif sa yo se pou enfrastrikti sèlman. Yo **pa kouvri** moun: yon devlopè pou deplwaye, yon editè pou tradwi, yon admin pou verifye peyman. Plizyè komin ka kouvri wòl sa yo ak staf yo gen deja.

Yon dezyèm, twazyèm, oswa santyèm komin ka rantre nan menm deplwaman pataje a ak yon **pri adisyonèl prèske zewo**, gras ak achitekti milti-tenant la.

[↑ Retounen anwo](#tablo-kontni)

---

## Tan pou lansman

Kalandriye reyalis pou yon komin:

| Etap | Tan | Kilès |
|---|---|---|
| Achte domèn, mete kont ebèjman ak baz done | 1 jou | IT oswa devlopè |
| Deplwaye aplikasyon an | Mwatye jou | Devlopè |
| Konfigire soudomèn ou epi kreye tenant la | 1 èdtan | Devlopè |
| Antre ofisyèl, seksyon kominal, etablisman | 1–3 jou | Kominikasyon + eta sivil |
| Tradwi oswa ekri deskripsyon sèvis | 1–2 semèn | Ekip kominikasyon |
| Fòme staf sou panèl admin | Mwatye jou | Kabinè |
| Lansman restren | 1 jou | Kominikasyon |
| Lansman piblik | 1 jou | Kabinè majistra |

**Total: 2–4 semèn ant desizyon ak lansman piblik**, dapre disponibilite staf.

[↑ Retounen anwo](#tablo-kontni)

---

## Wòl ou bezwen sou bò pa w

| Wòl | Tan ki bezwen | Konpetans |
|---|---|---|
| **Sponsò** (majistra oswa chèf kabinè) | Kèk èdtan an total | Pouvwa desizyon, priyorize |
| **Devlopè / lidè IT** | 2–5 jou pou enstalasyon, apre sa pa souvan | Alèz ak Node.js, ebèjman, DNS. Anndan, volontè, oswa kontraktè. |
| **Ofisye kominikasyon** | Kontinyèl | Ekri nouvèl, tradwi sèvis, mete alèt. San kòd. |
| **Ofisye finans** | Kontinyèl | Verifye peyman ak relve banke/MonCash |
| **Anplwaye akèy** | Kontinyèl | Li demann k ap antre epi chanje estati yo |

Ou pa bezwen yon gwo ekip. Yon sèl moun nan staf ki alèz ak nimerik plis ekip kominikasyon majistra ase pou pifò komin.

[↑ Retounen anwo](#tablo-kontni)

---

## Lang ak aksesibilite

Pòtal la livre nan kat lang:

- **Kreyòl Ayisyen** — pa default, paske se lang manman pou pifò ayisyen.
- **Franse** — lang ekri ofisyèl gouvènman an.
- **Anglè** — pou dyaspora, ONG, ak patnè.
- **Espanyòl** — aksesibilite tranfwontye (Repiblik Dominikèn, patnè rejyonal).

Rezidan yo chanje lang an wo chak paj. Si yon kontni poko tradwi, pòtal la otomatikman montre vèsyon anglè a — pa gen paj kase.

Sit la fèt mobil-an-premye, optimize pou ti bandlarjè (2G/3G), epi respekte estanda aksesibilite web kouran yo.

[↑ Retounen anwo](#tablo-kontni)

---

## Done, pwopriyete, ak vi prive

- **Done w yo se pou ou.** Rezidan, demann, peyman, nouvèl, ak ofisyèl komin ou estoke nan baz *pa w*. Lòt komin sou menm deplwaman pataje pa ka wè done w.
- **Lojisyèl la kòd louvri** anba Business Source License 1.1. Nenpòt komin ka itilize l librman pou itilizasyon ki pa komèsyal. Li vin Apache 2.0 (konplètman lib) nan 31 desanm 2028. Wè [LICENSE.md](../LICENSE.md).
- **Izolasyon ant tenant aplike nan nivo kòd la.** Chak rekèt baz done filtre pa `tenant_id`. Yon bug ki pèmèt done yon komin parèt nan yon lòt trete kòm yon ensidan sekirite kritik.
- **Modpas yo hash.** Menm mainteneur pwojè a pa ka li yo.
- **Pa gen swiv analitik pa default.** Ou deside sa w ajoute.

Detay nan [Politik Sekirite](../SECURITY.md).

[↑ Retounen anwo](#tablo-kontni)

---

## Kesyon yo poze souvan

**K. Èske nou dwe peye pou itilize lojisyèl sa a?**
R. Non. Kòd la gratis. Ou peye sèlman enfrastrikti (domèn, ebèjman, baz) ak tan staf ou.

**K. Nou pa gen devlopè. Sa pou n fè?**
R. Twa opsyon: (1) Mande yon inivèsite lokal — anpil etidyan enfòmatik ta sote sou yon pwojè konsa pou kredi oswa tèz. (2) Kontakte rezo Haitians in Tech la pou yon volontè oswa kontraktè bon pri. (3) Ekri nan `info@haiticity.org`, n ap ede konekte w.

**K. Èske nou ka pèsonalize sit la pou komin nou?**
R. Wi — non, lòlò, koulè, foto ofisyèl, seksyon kominal, sèvis, ak nouvèl tout konfigirab pa komin. Baz grafik la pataje pou tout komin parèt kòm yon enfrastrikti sivik nasyonal.

**K. Èske nou ka ajoute yon sèvis espesifik pou komin nou?**
R. Wi. Sèvis defini nan fichye kontni nenpòt moun ka modifye. Wè [Gid Kontni](CONTENT_GUIDE.ht.md).

**K. E si entènèt nou pa fyab?**
R. Sit la optimize pou ti bandlarjè. Soumisyon ofliy sou plan ([Estati Aplikasyon](v0.1-implementation-plan.md)).

**K. E si MonCash anpàn?**
R. Transfè bankè se yon altènatif. Sistèm lan bay yon kòd memo rezidan mete ak peyman l, epi yon admin verifye manyèlman. Entegrasyon MonCash dirèk sou plan.

**K. Nou gen yon sit deja. Poukisa chanje?**
R. Ou pa oblije. Ou ka fè pòtal la mache nan yon soudomèn (`services.lameri-w.ht`) epi konekte l ak sit ou genyen an. Oswa fè l sit prensipal ou. Chwa pa w.

**K. Èske rezidan ka kreye kont?**
R. Jodi a, yo ka soumèt demann anonim. Kreyasyon kont pou rezidan (suiv demann) sou plan.

**K. E dyaspora a?**
R. Pòtal la milti-lang (anglè/franse/espanyòl) epi sipòte transfè entènasyonal pou pwojè kominote. Stripe (USD/EUR) sou plan.

**K. Èske n ka entegre ak sistèm nou genyen (egz. dosye taks)?**
R. Wi. Pòtal la ekspoze API epi ka pwolonje. Pale ak devlopè w.

[↑ Retounen anwo](#tablo-kontni)

---

## Kijan pou kòmanse

1. Li dokiman sa a ak [Glosè](GLOSSARY.ht.md) — pataje toulède ak desidè yo.
2. Idantifye devlopè / lidè IT epi pataje [Deplwaman](DEPLOYMENT.ht.md) ak [Mete yon Vil Anplas](TENANT_ONBOARDING.ht.md) avèk li.
3. Idantifye lidè kontni ou (kominikasyon) epi pataje [Gid Kontni](CONTENT_GUIDE.ht.md) avèk li.
4. Deside yon domèn (oswa soudomèn).
5. Mete kont ebèjman ak baz done.
6. Deplwaye.
7. Mete tenant ou (kreye komin ou nan sistèm lan).
8. Antre ofisyèl, seksyon, etablisman, sèvis, nouvèl.
9. Fòme staf ak [Manyèl Administrasyon](ADMIN_MANUAL.ht.md).
10. Lanse.

[↑ Retounen anwo](#tablo-kontni)

---

## Ak kilès pou kontakte

| Rezon | Kontak |
|---|---|
| Kesyon jeneral | `info@haiticity.org` |
| Èd jwenn yon devlopè | `info@haiticity.org` |
| Sekirite oswa vilnerabilite | `security@haiticity.org` |
| Lisans pou itilizasyon komèsyal | `licensing@haiticity.org` |
| Bug oswa demann fonksyonalite | [Louvri yon issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose) |

Wè pwojè a sou [GitHub](https://github.com/haitiansintech/HaitiCityPortal).

[↑ Retounen anwo](#tablo-kontni)

---

[← Endèks dokimantasyon](README.ht.md) · [Glosè](GLOSSARY.ht.md) · [Deplwaman →](DEPLOYMENT.ht.md)
