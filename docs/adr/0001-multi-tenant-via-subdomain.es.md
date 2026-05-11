<!--
Idiomas: English (0001-multi-tenant-via-subdomain.md) | Français (...fr.md) | Kreyòl (...ht.md) | Español (este archivo)
-->

**Idiomas:** [English](0001-multi-tenant-via-subdomain.md) · [Français](0001-multi-tenant-via-subdomain.fr.md) · [Kreyòl Ayisyen](0001-multi-tenant-via-subdomain.ht.md) · **Español**

[← Índice de ADR](README.es.md) · [Arquitectura](../ARCHITECTURE.es.md)

---

# 0001 — Multi-tenant vía subdominio + middleware

- **Estado:** Aceptado
- **Fecha:** 2025-09-01
- **Decisores:** mantenedores del proyecto

## Contexto

El portal debe servir muchas comunas desde una sola aplicación, manteniendo aislados los datos. Tres patrones:

1. **Base por tenant**.
2. **Esquema por tenant** en una base compartida.
3. **Scoping por fila con `tenant_id`** — esquema compartido, cada fila marcada con su tenant.

Restricciones: agregar comuna sin redespliegue; costo Vercel + Neon; mayoría de consultas scoped.

## Decisión

**Scoping por fila con `tenant_id`**. Resolución de tenant en middleware: subdominio extraído de `Host` y escrito en cabecera de servidor `x-tenant-subdomain` que leen los Server Components.

Cada tabla (excepto `tenants`) tiene una columna `tenant_id uuid NOT NULL` con FK a `tenants.id`. Cada consulta filtra por ella.

## Consecuencias

**Positivas:** agregar una comuna = un INSERT + DNS comodín ya configurado; costo de base única; agregaciones nacionales triviales.

**Negativas:** olvidar `tenant_id` = incidente crítico (mitigado con revisión de código); respaldos globales; rendimiento afectado si una comuna domina.

**Neutras:** `x-tenant-subdomain` *nunca* se confía desde el cliente — middleware la escribe.

## Alternativas consideradas

- **Base por tenant**: demasiado caro, operacionalmente pesado.
- **Esquema por tenant**: migraciones Drizzle complicadas; beneficios marginales.
- **Tenant por path** (`/jacmel/services`): conflicto con prefijos de locale y URL menos profesional.

[↑ Volver arriba](#0001--multi-tenant-vía-subdominio--middleware) · [← Índice de ADR](README.es.md) · [Siguiente: 0002 →](0002-uuid-primary-keys.es.md)
