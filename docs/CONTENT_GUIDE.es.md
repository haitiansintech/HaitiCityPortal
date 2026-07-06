<!--
Idiomas: English (CONTENT_GUIDE.md) | Français (CONTENT_GUIDE.fr.md) | Kreyòl (CONTENT_GUIDE.ht.md) | Español (este archivo)
-->

**Idiomas:** [English](CONTENT_GUIDE.md) · [Français](CONTENT_GUIDE.fr.md) · [Kreyòl Ayisyen](CONTENT_GUIDE.ht.md) · **Español**

[← Índice de documentación](README.es.md) · [README del proyecto](../README.md) · [Glosario](GLOSSARY.es.md)

---

# Guía de Contenido

Cómo traducir o editar contenido **sin instalar nada** — solo un navegador y una cuenta de GitHub. Para traductores, equipos de comunicaciones y cualquiera que quiera mejorar los textos del portal.

## Índice

- [Qué puede editar](#qué-puede-editar)
- [Crear una cuenta de GitHub](#crear-una-cuenta-de-github)
- [Editar un archivo en GitHub](#editar-un-archivo-en-github)
- [Editar una etiqueta UI (`messages/*.json`)](#editar-una-etiqueta-ui-messagesjson)
- [Traducir la descripción de un servicio](#traducir-la-descripción-de-un-servicio)
- [Agregar una noticia](#agregar-una-noticia)
- [Editar una página estática](#editar-una-página-estática)
- [Bases de Markdown](#bases-de-markdown)
- [Cheat sheet de frontmatter](#cheat-sheet-de-frontmatter)
- [Errores frecuentes](#errores-frecuentes)
- [Obtener ayuda](#obtener-ayuda)

---

## Qué puede editar

Todo es texto. Tres lugares:

| Tipo | Ubicación | Ejemplo |
|---|---|---|
| Etiquetas UI (textos cortos) | `messages/{locale}.json` | "Enviar", menú nav |
| Servicios, noticias, páginas legales | `src/content/**/*.mdx` | Página servicio basura, noticia huracán |
| Traducciones | Mismos archivos con sufijo `.fr.`, `.ht.`, `.es.` | `services/trash.es.mdx` |

Todo pasa por la interfaz web de GitHub. Sin software a instalar.

[↑ Volver arriba](#índice)

---

## Crear una cuenta de GitHub

Si ya tiene una, sáltese.

1. <https://github.com/signup>.
2. Email, contraseña, usuario.
3. Confirme el email.
4. (Opcional) Foto y rol en la comuna.

Listo. Plan gratis basta.

[↑ Volver arriba](#índice)

---

## Editar un archivo en GitHub

Cinco pasos para cualquier edición:

1. Inicie sesión en <https://github.com>.
2. Vaya al archivo (links abajo).
3. Clic en el **icono de lápiz** arriba a la derecha.
4. Edite en el navegador.
5. Baje. Elija **Create a new branch for this commit and start a pull request** (por defecto). **Propose changes**.
6. En la siguiente pantalla: **Create pull request**.

Un mantenedor revisa y fusiona. Pocos minutos tras la fusión, su cambio está en vivo.

Si no tiene acceso de escritura al repositorio principal, GitHub ofrecerá hacer un **fork** — acepte.

[↑ Volver arriba](#índice)

---

## Editar una etiqueta UI (`messages/*.json`)

Textos cortos: navbar, botones, formularios.

| Idioma | Archivo |
|---|---|
| Inglés | [`messages/en.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/en.json) |
| Francés | [`messages/fr.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/fr.json) |
| Criollo haitiano | [`messages/ht.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/ht.json) |
| Español | [`messages/es.json`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/messages/es.json) |

### Ejemplo: mejorar una traducción al español

```json
{
  "Nav": {
    "home": "Inicio",
    "services": "Servicios",
    "report": "Reportar",
    "pay": "Pagar"
  }
}
```

Para cambiar "Reportar" a "Reportar un problema":

1. Lápiz.
2. Cambie el **valor** (a la derecha de los dos puntos, entre comillas).
3. PR.

> **Importante:** nunca cambie las **claves** (izquierda: `home`, `services`…). Solo cambian los **valores**.

> **Importante:** cualquier nueva clave en `en.json` debe estar en los **cuatro** archivos. Si no, aparece `MISSING_MESSAGE`.

[↑ Volver arriba](#índice)

---

## Traducir la descripción de un servicio

Archivos MDX en [`src/content/services/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content/services).

Base: `{slug}.mdx` (inglés). Traducciones: `{slug}.fr.mdx`, `.ht.mdx`, `.es.mdx`.

### Ejemplo: agregar versión en español para "Trash Collection"

1. Abra el inglés: [`src/content/services/trash.mdx`](https://github.com/haitiansintech/HaitiCityPortal/blob/main/src/content/services/trash.mdx).
2. Copie todo.
3. En `src/content/services/` → **Add file → Create new file**.
4. Nombre: `trash.es.mdx`.
5. Pegue, traduzca el frontmatter:

```yaml
---
title: Recolección de basura
description: Servicio municipal de recolección de basura.
steps:
  - Coloque su basura en la bolsa oficial
  - Sáquela antes de las 6 a.m. el día de recolección
  - Verifique el horario de su barrio
documents:
  - No se requiere documento
fees: Gratis
---
```

6. Traduzca el cuerpo Markdown.
7. PR.

Si solo traduce parte, está bien — fallback automático al inglés.

> **Importante:** mantenga los **nombres de campos** (`title`, `description`…) en inglés. Solo traduzca los **valores**.

[↑ Volver arriba](#índice)

---

## Agregar una noticia

Archivos MDX en [`src/content/news/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content/news).

Nombre: `YYYY-MM-DD-{slug}.mdx`.

### Ejemplo: preparación huracán, mayo 2026

1. `src/content/news/` → **Add file → Create new file**.
2. Nombre: `2026-05-20-prep-huracan.es.mdx`.
3. Pegue:

```mdx
---
date: "20 de mayo de 2026"
dateISO: "2026-05-20"
title: "Preparación para la temporada de huracanes"
description: "Lo que cada familia debe hacer antes del 1 de junio."
---

La temporada de huracanes haitiana empieza el 1 de junio. La oficina del alcalde insta a cada hogar a preparar un kit de emergencia para 72 horas:

- Agua potable (4 litros por persona y día)
- Alimentos no perecederos
- Linterna y pilas de repuesto
- Radio a pilas
- Botiquín de primeros auxilios
- Copias de documentos de identidad en bolsa impermeable

Los refugios públicos se activarán según necesidad. Lista en /directory.
```

4. PR.

Para otros idiomas: repita con `.mdx`, `.fr.mdx`, `.ht.mdx`.

> **Tip:** fechas `YYYY-MM-DD` exactas, ordenamiento automático.

[↑ Volver arriba](#índice)

---

## Editar una página estática

Páginas en la raíz de [`src/content/`](https://github.com/haitiansintech/HaitiCityPortal/tree/main/src/content). Mismo formato.

| Página | Archivo |
|---|---|
| Acerca | `about.mdx` (+ `.fr.mdx`, `.ht.mdx`, `.es.mdx`) |
| Privacidad | `privacy.mdx` |
| Términos | `terms.mdx` |
| Tech | `tech.mdx` |

[↑ Volver arriba](#índice)

---

## Bases de Markdown

| Sintaxis | Renderiza |
|---|---|
| `# Título 1` | Título grande |
| `## Título 2` | Título de sección |
| `### Título 3` | Subsección |
| `**negrita**` | **negrita** |
| `*cursiva*` | *cursiva* |
| `- item` | lista con viñetas |
| `1. item` | lista numerada |
| `[texto](https://ejemplo.com)` | [texto](https://ejemplo.com) |
| `![alt](imagen.jpg)` | imagen |
| `> cita` | cita |
| ` `código` ` | código en línea |

[↑ Volver arriba](#índice)

---

## Cheat sheet de frontmatter

YAML entre dos `---`.

### Servicio

```yaml
---
title: Nombre del servicio
description: Descripción de una línea
steps:
  - Paso 1
  - Paso 2
documents:
  - Documento requerido
fees: Tarifa (texto)
---
```

### Noticia

```yaml
---
date: "DD de mes de AAAA"
dateISO: "AAAA-MM-DD"
title: "Título"
description: "Resumen corto."
---
```

### Página estática

```yaml
---
title: Título
description: Descripción corta
---
```

> **YAML:** strings con dos puntos entre comillas. Listas con `- `. Indentación: 2 espacios, nunca tabulación.

[↑ Volver arriba](#índice)

---

## Errores frecuentes

| Error | Resultado | Solución |
|---|---|---|
| Renombrar clave JSON | `MISSING_MESSAGE` | Volver a la clave original |
| Falta `---` de cierre del frontmatter | Página vacía / error | Agregar `---` |
| Nombre incorrecto de traducción | Ignorada | Respetar `slug.es.mdx`… |
| `dateISO` mal formateado | Noticia desaparece | `YYYY-MM-DD` estricto |
| Indentación YAML rota | Error | 2 espacios |
| Cursiva con `_underscore_` | Comportamiento variable | Preferir `*` |
| Coma extra en JSON | Archivo no parsea | Eliminar |

Falla CI en PR: lea el mensaje al fondo del PR, indica la línea.

[↑ Volver arriba](#índice)

---

## Obtener ayuda

- ¿Bloqueado en una traducción? Abra el PR con "necesita revisión nativa" en la descripción.
- ¿Bloqueado en Git/GitHub? Issue: <https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose>.
- Pregunta general: `info@haiticity.org`.

Las contribuciones de contenido son de las más importantes — código bonito sin buenos textos no sirve a nadie.

[↑ Volver arriba](#índice)

---

[← Índice de documentación](README.es.md) · [Manual de Administración](ADMIN_MANUAL.es.md) · [Arquitectura →](ARCHITECTURE.es.md)
