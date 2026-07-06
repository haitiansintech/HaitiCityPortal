**Idiomas:** [English](0003-mdx-content-vs-database.md) · [Français](0003-mdx-content-vs-database.fr.md) · [Kreyòl Ayisyen](0003-mdx-content-vs-database.ht.md) · **Español**

[← Índice de ADR](README.es.md) · [Arquitectura](../ARCHITECTURE.es.md)

---

# 0003 — Contenido de prosa en archivos MDX, no en la base

- **Estado:** Aceptado
- **Fecha:** 2025-09-01
- **Decisores:** mantenedores del proyecto

## Contexto

El portal necesita prosa en cuatro idiomas: descripciones de servicios, noticias, páginas legales. Tres opciones: todo en base, CMS headless de terceros (Sanity, Contentful…), archivos MDX en el repo.

Restricciones: traducción por no-desarrolladores; historial auditable; sin suscripciones SaaS recurrentes que bloqueen comunas con pocos recursos; revisión tipo código (PR + diff).

## Decisión

Prosa en `src/content/**/*.mdx`. Etiquetas cortas en `messages/{locale}.json`. Campos dinámicos admin en columnas JSONB.

Traductores editan vía web de GitHub; vea [Guía de Contenido](../CONTENT_GUIDE.es.md).

## Consecuencias

**Positivas:** gratis; historial Git completo; PR para contenido como para código; fallback de locale = simple lectura de archivo; contenido portátil.

**Negativas:** cambios en producción requieren redespliegue (Vercel lo hace instantáneo); traductores deben aprender GitHub (~30 min); ediciones masivas vía múltiples PR o imports CSV.

**Neutras:** UI admin para editar MDX en navegador en hoja de ruta; almacenamiento igual.

## Alternativas consideradas

- **Todo en base**: traducción difícil sin CMS; sin historial.
- **CMS headless**: costo recurrente; bloqueo de proveedor; otro login para editores.
- **Decap CMS** (Git, open-source): adición futura que *complementa* MDX en lugar de reemplazarlo.

[↑ Volver arriba](#0003--contenido-de-prosa-en-archivos-mdx-no-en-la-base) · [← Anterior: 0002](0002-uuid-primary-keys.es.md) · [Índice de ADR](README.es.md)
