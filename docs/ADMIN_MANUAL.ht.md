<!--
Lang yo: English (ADMIN_MANUAL.md) | Français (ADMIN_MANUAL.fr.md) | Kreyòl (fichye sa a) | Español (ADMIN_MANUAL.es.md)
-->

**Lang yo:** [English](ADMIN_MANUAL.md) · [Français](ADMIN_MANUAL.fr.md) · **Kreyòl Ayisyen** · [Español](ADMIN_MANUAL.es.md)

[← Endèks dokimantasyon](README.ht.md) · [README pwojè a](../README.md) · [Glosè](GLOSSARY.ht.md)

---

# Manyèl Administrasyon

Gid pratik pou anplwaye lameri k ap itilize panèl admin chak jou. Pa bezwen koneksans teknik.

## Tablo Kontni

- [Anvan w kòmanse](#anvan-w-kòmanse)
- [Koneksyon](#koneksyon)
- [Tablobò a](#tablobò-a)
- [Demann sèvis](#demann-sèvis)
- [Verifye peyman](#verifye-peyman)
- [Pibliye nouvèl](#pibliye-nouvèl)
- [Pibliye yon alèt ijans](#pibliye-yon-alèt-ijans)
- [Jere ofisyèl](#jere-ofisyèl)
- [Jere etablisman](#jere-etablisman)
- [Egzamine sijesyon](#egzamine-sijesyon)
- [Rapò teren](#rapò-teren)
- [Manyèl gouvènans](#manyèl-gouvènans)
- [Revizyon odit finans](#revizyon-odit-finans)
- [Wòl itilizatè ak aksè](#wòl-itilizatè-ak-aksè)
- [Dekonèksyon ak pasaj](#dekonèksyon-ak-pasaj)
- [Rezolisyon pwoblèm](#rezolisyon-pwoblèm)

---

## Anvan w kòmanse

Ou bezwen:

- Yon navigatè (Chrome, Edge, Safari, Firefox).
- Imèl ak modpas admin ou (lidè IT ou bay ou).
- Entènèt.

Rekòmande: yon dezyèm ekran/onglè pou nòt; li [Glosè](GLOSSARY.ht.md).

[↑ Retounen anwo](#tablo-kontni)

---

## Koneksyon

1. Ale sou `https://{soudomèn-ou}.portal.ht`.
2. Klike **Login** oswa ale `/login`.
3. Antre imèl ak modpas.
4. Ou rive sou `/admin`.

Si modpas pa mache, mande lidè IT reseti l. Pa janm pataje modpas.

[↑ Retounen anwo](#tablo-kontni)

---

## Tablobò a

`/admin` se kote w kòmanse chak jou:

- **Demann ouvri**.
- **Peyman annatant**.
- **Aktivite resan**.
- **Lyen rapid** pou chak seksyon.

Louvri tablobò a premye bagay nan maten.

[↑ Retounen anwo](#tablo-kontni)

---

## Demann sèvis

### Li yon demann

1. **Requests** oswa `/admin/requests`.
2. Lis la montre: dat, tip, estati, rezime.
3. Klike yon liy pou wè detay nan `/admin/requests/[id]`: non, kontak, deskripsyon, foto, GPS, istorik estati.

### Met estati ajou

| Estati | Sans |
|---|---|
| **Open** | Soumèt, poko trete |
| **In progress** | Yon anplwaye ap travay sou li |
| **Resolved** | Rezoud |
| **Closed** | Rezoud epi rezidan rekonèt |
| **Rejected** | Pa egzekitab (deyò sijè, doub, malisye) — ajoute rezon |

Klike **Update Status**, ajoute yon nòt entèn kout.

### Pi bon pratik

- Met ajou anvan **48 èdtan**, menm yon senp akize.
- Ka konplèks: **In progress**, met ajou ankò lè fini.
- Rejè: rezon klè — pwoteksyon legal.

[↑ Retounen anwo](#tablo-kontni)

---

## Verifye peyman

Jodi a: rekonsilyasyon manyèl.

### Pwosedi

1. `/admin/finance`.
2. Filtre estati **Pending Upload**.
3. Louvri: kòd memo, montan, metòd, kontak.
4. Konpare ak relve labank/MonCash.
5. Si jwenn: **Mark Verified**, dat reyèl, kapti opsyonèl.
6. Si pa jwenn apre 5 jou ouvrab: **Failed** ak rezon.

> **Kritik:** pa janm valide san prèv endepandan.

[↑ Retounen anwo](#tablo-kontni)

---

## Pibliye nouvèl

Wè [Gid Kontni](CONTENT_GUIDE.ht.md) pou pwosedi GitHub web (rekòmande). Yon editè web admin sou plan.

[↑ Retounen anwo](#tablo-kontni)

---

## Pibliye yon alèt ijans

1. `/admin/emergency` → **New Alert**.
2. Tit nan 4 lang, kò, severite (`info`/`warning`/`critical`), kòmansman, fen.
3. Sove.

Alèt parèt imedyatman.

> Doub alèt kritik atravè WhatsApp, radyo, opalè minisipal. Pòtal konplete, pa ranplase.

Pou fini bonè: edite fen oswa klike **Deactivate**.

[↑ Retounen anwo](#tablo-kontni)

---

## Jere ofisyèl

`/admin/officials`. Nouvo: non, wòl, seksyon kominal, foto, WhatsApp, pwofil Vwa. Mete inaktif olye retire.

Nan chak eleksyon, planifye 2 èdtan nan 7 jou apre envestiti.

[↑ Retounen anwo](#tablo-kontni)

---

## Jere etablisman

`/admin/facilities`. Kategori: lopital, lekòl, polis, ponpye, legliz, mache, gouvènman, lòt.

GPS atravè telefòn oswa Google Maps (klik dwat → « Plis enfòmasyon sou kote sa »).

[↑ Retounen anwo](#tablo-kontni)

---

## Egzamine sijesyon

`/admin/facility-suggestions`. Aksepte oswa rejte ak rezon. Netwaye chak semèn.

[↑ Retounen anwo](#tablo-kontni)

---

## Rapò teren

`/admin/field-reports`. Tip, kote, deskripsyon, foto, severite. Antre nan kat `/map`.

[↑ Retounen anwo](#tablo-kontni)

---

## Manyèl gouvènans

`/admin/handbook`. Lekti: tout admin dapre wòl. Edisyon: `superadmin` atravè `/admin/handbook/editor`. Lekti swiv — itil pou onboarding.

[↑ Retounen anwo](#tablo-kontni)

---

## Revizyon odit finans

`/admin/finance/audit-review`. Snapshot otomatik. Konpare mwa kouran/mwa anvan. Anomali → eskalade trezorye. Paj an lekti sèlman.

[↑ Retounen anwo](#tablo-kontni)

---

## Wòl itilizatè ak aksè

| Wòl | Ka |
|---|---|
| `user` | Soumèt demann, peye |
| `admin` | Demann, peyman, ofisyèl/etablisman, nouvèl/alèt |
| `superadmin` | Tout admin + handbook + kreye/dezaktive admin |

Omwen **de `superadmin`** pa komin.

Nouvo admin: `/admin/users` oswa Drizzle Studio. Pa janm kont pataje.

[↑ Retounen anwo](#tablo-kontni)

---

## Dekonèksyon ak pasaj

Fen pòs:
1. Nòt nan **Open requests**.
2. Mesaj Slack/WhatsApp ekip pwochen: ijans, peyman, alèt aktif.
3. Avatar → **Logout**.
4. Fèmen onglè (aparèy pataje).

[↑ Retounen anwo](#tablo-kontni)

---

## Rezolisyon pwoblèm

| Pwoblèm | Aksyon |
|---|---|
| Modpas bliye | Reseti pa lidè IT |
| Pa wè admin panel | Kont pa admin — mande superadmin |
| Peyman valide pa erè | **Reverse Verification** + rezon |
| Erè frap sou nouvèl/alèt | Re-edite MDX/alèt |
| Sit pa disponib | `/api/health`, si non lidè IT |
| Wè done yon lòt komin | **Ensidan kritik**: `security@haiticity.org` imedyatman |

[↑ Retounen anwo](#tablo-kontni)

---

[← Endèks dokimantasyon](README.ht.md) · [Mete yon Vil Anplas](TENANT_ONBOARDING.ht.md) · [Gid Kontni →](CONTENT_GUIDE.ht.md)
