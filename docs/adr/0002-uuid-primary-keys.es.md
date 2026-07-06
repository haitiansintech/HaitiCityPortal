**Idiomas:** [English](0002-uuid-primary-keys.md) · [Français](0002-uuid-primary-keys.fr.md) · [Kreyòl Ayisyen](0002-uuid-primary-keys.ht.md) · **Español**

[← Índice de ADR](README.es.md) · [Arquitectura](../ARCHITECTURE.es.md)

---

# 0002 — Claves primarias UUID en todas las tablas

- **Estado:** Aceptado
- **Fecha:** 2025-09-01
- **Decisores:** mantenedores del proyecto

## Contexto

Cada tabla necesita PK. Opciones: enteros secuenciales o UUID.

Restricciones: modo offline (generación sin colisión); multi-tenant (IDs secuenciales revelan volumen); URLs uniformes entre comunas.

## Decisión

Cada PK es `uuid("id").defaultRandom().primaryKey()`. Sin excepción. Las FK referencian estos UUID.

## Consecuencias

**Positivas:** generación offline segura; aislamiento tenant preservado; URLs uniformes.

**Negativas:** tamaño (16 vs 4–8 bytes); no legibles (mitigado con códigos memo `JAC-TAX-8821`); fragmentación B-tree a escala (UUIDv7 opción futura).

**Neutras:** regla a conocer por cada nuevo colaborador.

## Alternativas consideradas

- **Enteros secuenciales**: violan requisitos offline y de aislamiento.
- **UUIDv7 / ULID**: ruta de migración aceptable a futuro.

[↑ Volver arriba](#0002--claves-primarias-uuid-en-todas-las-tablas) · [← Anterior: 0001](0001-multi-tenant-via-subdomain.es.md) · [Índice de ADR](README.es.md) · [Siguiente: 0003 →](0003-mdx-content-vs-database.es.md)
