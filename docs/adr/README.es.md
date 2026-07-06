<!--
Idiomas: English (README.md) | Français (README.fr.md) | Kreyòl (README.ht.md) | Español (este archivo)
-->

**Idiomas:** [English](README.md) · [Français](README.fr.md) · [Kreyòl Ayisyen](README.ht.md) · **Español**

[← Índice de documentación](../README.es.md) · [README del proyecto](../../README.md) · [Glosario](../GLOSSARY.es.md)

---

# Registros de Decisiones de Arquitectura (ADR)

Esta carpeta registra los *porqués* de las grandes decisiones técnicas de Haiti City Portal. Los ADR son documentos cortos e inmutables — una vez aceptados, describen historia. Si una decisión se revierte, escriba un nuevo ADR que reemplace al anterior.

## Índice

| # | Título | Estado |
|---|---|---|
| [0001](0001-multi-tenant-via-subdomain.es.md) | Multi-tenant vía subdominio + middleware | Aceptado |
| [0002](0002-uuid-primary-keys.es.md) | Claves primarias UUID en todas las tablas | Aceptado |
| [0003](0003-mdx-content-vs-database.es.md) | Contenido de prosa en MDX, no en la base | Aceptado |

## Agregar un nuevo ADR

1. Numere el archivo (`NNNN-título-corto.es.md`).
2. Use la plantilla abajo.
3. Envíe un PR. Discuta en el PR.
4. Una vez fusionado: estado "Aceptado".
5. Enlace el nuevo ADR desde este índice.

## Plantilla

```markdown
# NNNN — Título

- **Estado:** Propuesto | Aceptado | Reemplazado por ADR-XXXX | Obsoleto
- **Fecha:** AAAA-MM-DD
- **Decisores:** nombres o roles

## Contexto

¿Qué problema? ¿Qué restricciones?

## Decisión

¿Qué decidimos?

## Consecuencias

Positivas, negativas, neutras.

## Alternativas consideradas

¿Qué más miramos, y por qué lo rechazamos?
```

[↑ Volver arriba](#registros-de-decisiones-de-arquitectura-adr) · [← Índice de documentación](../README.es.md)
