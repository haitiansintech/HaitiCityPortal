<!--
Lang yo: English (CONTENT_GUIDE.md) | Français (CONTENT_GUIDE.fr.md) | Kreyòl (fichye sa a) | Español (CONTENT_GUIDE.es.md)
-->

**Lang yo:** [English](CONTENT_GUIDE.md) · [Français](CONTENT_GUIDE.fr.md) · **Kreyòl Ayisyen** · [Español](CONTENT_GUIDE.es.md)

[← Endèks dokimantasyon](README.ht.md) · [README pwojè a](../README.md) · [Glosè](GLOSSARY.ht.md)

---

# Gid Kontni

Kijan pou tradwi oswa modifye kontni **san enstale anyen** — sèlman yon navigatè ak yon kont GitHub. Pou tradiktè, ekip kominikasyon, ak nenpòt moun ki vle amelyore tèks pòtal la.

## Tablo Kontni

- [Sa w ka modifye](#sa-w-ka-modifye)
- [Kreye yon kont GitHub](#kreye-yon-kont-github)
- [Modifye yon fichye nan GitHub](#modifye-yon-fichye-nan-github)
- [Modifye yon etikèt UI (`messages/*.json`)](#modifye-yon-etikèt-ui-messagesjson)
- [Tradwi deskripsyon yon sèvis](#tradwi-deskripsyon-yon-sèvis)
- [Ajoute yon atik nouvèl](#ajoute-yon-atik-nouvèl)
- [Modifye yon paj estatik](#modifye-yon-paj-estatik)
- [Bazil Markdown](#bazil-markdown)
- [Bilten frontmatter](#bilten-frontmatter)
- [Erè komen](#erè-komen)
- [Jwenn èd](#jwenn-èd)

---

## Sa w ka modifye

Tout se tèks. Twa kote:

| Tip | Kote | Egzanp |
|---|---|---|
| Etikèt UI (tèks kout) | `messages/{locale}.json` | « Soumèt », meni navigasyon |
| Sèvis, nouvèl, paj legal | `src/content/**/*.mdx` | Paj sèvis ramasaj, atik siklòn |
| Tradiksyon | Menm fichye ak sufiks `.fr.`, `.ht.`, `.es.` | `services/trash.ht.mdx` |

Tout pase atravè entèfas GitHub. Pa gen lojisyèl pou enstale.

[↑ Retounen anwo](#tablo-kontni)

---

## Kreye yon kont GitHub

Si w deja gen yon, pase.

1. <https://github.com/signup>.
2. Imèl, modpas, non itilizatè.
3. Konfime imèl la.
4. (Opsyonèl) Foto ak wòl ou nan lameri.

Sa fini. Plan gratis ase.

[↑ Retounen anwo](#tablo-kontni)

---

## Modifye yon fichye nan GitHub

Senk etap pou chak modifikasyon:

1. Konekte sou <https://github.com>.
2. Ale sou fichye a (lyen pi ba).
3. Klike **ikòn kreyon** anwo adwat.
4. Modifye nan navigatè.
5. Desann. Chwazi **Create a new branch for this commit and start a pull request** (default). **Propose changes**.
6. Sou ekran swivan: **Create pull request**.

Yon mainteneur revize epi fizyone. Apre kèk minit fizyon, chanjman ou sou pòtal la.

Si ou pa gen aksè ekriti sou depo prensipal la, GitHub ap pwopoze pou **fork**.

[↑ Retounen anwo](#tablo-kontni)

---

## Modifye yon etikèt UI (`messages/*.json`)

Etikèt kout: navbar, bouton, fòm.

| Lang | Fichye |
|---|---|
| Anglè | [`messages/en.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/en.json) |
| Franse | [`messages/fr.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/fr.json) |
| Kreyòl | [`messages/ht.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/ht.json) |
| Espanyòl | [`messages/es.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/es.json) |

### Egzanp: amelyore yon tradiksyon kreyòl

```json
{
  "Nav": {
    "home": "Akèy",
    "services": "Sèvis",
    "report": "Rapòte",
    "pay": "Peye"
  }
}
```

Pou chanje « Rapòte » an « Siyale yon Pwoblèm »:

1. Kreyon.
2. Chanje **valè** la (adwat de pwen, nan guillemets).
3. PR.

> **Enpòtan:** pa janm chanje **kle** yo (agòch: `home`, `services`…). Sèlman **valè** yo chanje.

> **Enpòtan:** chak nouvo kle nan `en.json` dwe egziste nan **kat** fichye yo. Si non, `MISSING_MESSAGE` parèt.

[↑ Retounen anwo](#tablo-kontni)

---

## Tradwi deskripsyon yon sèvis

Fichye MDX nan [`src/content/services/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content/services).

Baz: `{slug}.mdx` (anglè). Tradiksyon: `{slug}.fr.mdx`, `.ht.mdx`, `.es.mdx`.

### Egzanp: ajoute vèsyon kreyòl pou « Trash Collection »

1. Louvri anglè: [`src/content/services/trash.mdx`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/src/content/services/trash.mdx).
2. Kopye tout.
3. Nan `src/content/services/` → **Add file → Create new file**.
4. Non: `trash.ht.mdx`.
5. Kole, tradwi frontmatter:

```yaml
---
title: Ramasaj Fatra
description: Sèvis minisipal ramasaj fatra.
steps:
  - Mete fatra w nan sak ofisyèl la
  - Soti l avan 6 è jou ramasaj
  - Verifye orè katye w
documents:
  - Pa gen dokiman nesesè
fees: Gratis
---
```

6. Tradwi kò Markdown la.
7. PR.

Si w sèlman tradwi yon pati, sa OK — sekou otomatik sou anglè.

> **Enpòtan:** kenbe **non chan** (`title`, `description`…) an anglè. Sèlman **valè** yo tradwi.

[↑ Retounen anwo](#tablo-kontni)

---

## Ajoute yon atik nouvèl

Fichye MDX nan [`src/content/news/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content/news).

Non: `YYYY-MM-DD-{slug}.mdx`.

### Egzanp: preparasyon siklòn, me 2026

1. `src/content/news/` → **Add file → Create new file**.
2. Non: `2026-05-20-prep-siklon.ht.mdx`.
3. Kole:

```mdx
---
date: "20 me 2026"
dateISO: "2026-05-20"
title: "Preparasyon pou sezon siklòn"
description: "Sa chak fanmi dwe fè anvan 1ye jen."
---

Sezon siklòn ayisyen kòmanse 1ye jen. Biwo majistra a mande chak fwaye prepare yon twous ijans pou 72 èdtan:

- Dlo (4 lit pa moun pa jou)
- Manje ki pa gate
- Lanp ak pil rezèv
- Radyo ak pil
- Twous premye swen
- Kopi pyès idantite nan yon sak san dlo

Abri piblik ap louvri si nesesè. Lis nan /directory.
```

4. PR.

Pou lòt lang: repete ak `.mdx`, `.fr.mdx`, `.es.mdx`.

> **Konsèy:** dat `YYYY-MM-DD` egzakteman, tri otomatik.

[↑ Retounen anwo](#tablo-kontni)

---

## Modifye yon paj estatik

Paj nan rasin [`src/content/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content). Menm fòma.

| Paj | Fichye |
|---|---|
| Apropo | `about.mdx` (+ `.fr.mdx`, `.ht.mdx`, `.es.mdx`) |
| Vi prive | `privacy.mdx` |
| Kondisyon | `terms.mdx` |
| Tech | `tech.mdx` |

[↑ Retounen anwo](#tablo-kontni)

---

## Bazil Markdown

| Sentaks | Rann |
|---|---|
| `# Tit 1` | Gwo tit |
| `## Tit 2` | Tit seksyon |
| `### Tit 3` | Sou-seksyon |
| `**fò**` | **fò** |
| `*italik*` | *italik* |
| `- item` | lis pwen |
| `1. item` | lis nimewote |
| `[tèks](https://egzanp.com)` | [tèks](https://egzanp.com) |
| `![alt](image.jpg)` | imaj |
| `> sitasyon` | sitasyon |
| ` `kòd` ` | kòd anliy |

[↑ Retounen anwo](#tablo-kontni)

---

## Bilten frontmatter

YAML ant de `---`.

### Sèvis

```yaml
---
title: Non sèvis la
description: Deskripsyon yon liy
steps:
  - Etap 1
  - Etap 2
documents:
  - Dokiman nesesè
fees: Pri (tèks)
---
```

### Atik

```yaml
---
date: "JJ mwa AAAA"
dateISO: "AAAA-MM-JJ"
title: "Tit"
description: "Ekstrè kout."
---
```

### Paj estatik

```yaml
---
title: Tit
description: Ti deskripsyon
---
```

> **YAML:** chèn ak de pwen nan guillemets. Lis ak `- `. Endantasyon: 2 espas, pa janm tab.

[↑ Retounen anwo](#tablo-kontni)

---

## Erè komen

| Erè | Rezilta | Solisyon |
|---|---|---|
| Kle JSON chanje | `MISSING_MESSAGE` | Remete kle orijinal |
| `---` fèmti frontmatter manke | Paj vid / erè | Ajoute `---` |
| Move non tradiksyon | Inyore | Respekte `slug.ht.mdx`… |
| `dateISO` move fòma | Atik disparèt | `YYYY-MM-DD` strikt |
| Endantasyon YAML kase | Erè | 2 espas |
| Italik ak `_underscore_` | Komportman varye | Prefere `*` |
| Vigil anplis nan JSON | Fichye pa li | Retire |

Echèk CI sou PR: li mesaj an ba PR a, li montre liy lan.

[↑ Retounen anwo](#tablo-kontni)

---

## Jwenn èd

- Bloke sou yon tradiksyon? Louvri PR ak « bezwen revizyon natif » nan deskripsyon.
- Bloke sou Git/GitHub? Issue: <https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose>.
- Kesyon jeneral: `info@haiticity.org`.

Kontribisyon kontni se nan pi enpòtan yo — bèl kòd san bon tèks pa sèvi pèsòn.

[↑ Retounen anwo](#tablo-kontni)

---

[← Endèks dokimantasyon](README.ht.md) · [Manyèl Administrasyon](ADMIN_MANUAL.ht.md) · [Achitekti →](ARCHITECTURE.ht.md)
