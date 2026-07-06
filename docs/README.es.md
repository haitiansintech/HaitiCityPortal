<!--
Idiomas: English (README.md) | Français (README.fr.md) | Kreyòl (README.ht.md) | Español (este archivo)
-->

**Idiomas:** [English](README.md) · [Français](README.fr.md) · [Kreyòl Ayisyen](README.ht.md) · **Español**

[← Volver al README del proyecto](../README.md)

---

# Haiti City Portal — Documentación

Bienvenido/a. Este índice es la puerta de entrada a todos los documentos del proyecto. Elija el documento que corresponda a su rol — no necesita leerlo todo.

## Índice

- [Empiece aquí según su rol](#empiece-aquí-según-su-rol)
- [Todos los documentos](#todos-los-documentos)
- [Orden de lectura para un nuevo colaborador](#orden-de-lectura-para-un-nuevo-colaborador)
- [Orden de lectura para una municipalidad](#orden-de-lectura-para-una-municipalidad)
- [Cómo proponer un cambio](#cómo-proponer-un-cambio)
- [Sobre las traducciones](#sobre-las-traducciones)

---

## Empiece aquí según su rol

| Si usted es… | Comience por |
|---|---|
| **Alcalde, concejal o personal municipal** evaluando esto para su municipalidad | [Para Municipalidades](FOR_MUNICIPALITIES.es.md) |
| **Desarrollador** que quiere contribuir código | [Arquitectura](ARCHITECTURE.es.md) → [Notas técnicas](technical-notes.md) → [Contribuir](../CONTRIBUTING.md) |
| **Administrador de sistemas / informático** que debe desplegar esto | [Despliegue](DEPLOYMENT.es.md) → [Alta de Municipio](TENANT_ONBOARDING.es.md) |
| **Personal municipal** que usará el panel de administración | [Manual de Administración](ADMIN_MANUAL.es.md) |
| **Traductor o editor de contenido** (sin programar) | [Guía de Contenido](CONTENT_GUIDE.es.md) |
| **Ciudadano** con curiosidad sobre qué es el proyecto | [Para Municipalidades](FOR_MUNICIPALITIES.es.md) (sección "Qué es") |
| **No entiende una palabra** en algún documento | [Glosario](GLOSSARY.es.md) |

---

## Todos los documentos

### Visiones generales en lenguaje claro

| Documento | Propósito |
|---|---|
| [Para Municipalidades](FOR_MUNICIPALITIES.es.md) | No técnico: qué es, qué necesita, cuánto cuesta, a quién contactar |
| [Glosario](GLOSSARY.es.md) | Definiciones claras de cada término técnico y cívico haitiano usado |
| [Código de Conducta](../CODE_OF_CONDUCT.es.md) | Conducta esperada de colaboradores y miembros de la comunidad |

### Operaciones (desplegar y operar el portal)

| Documento | Propósito |
|---|---|
| [Despliegue](DEPLOYMENT.es.md) | Paso a paso: dominio, DNS, hosting, base de datos, variables, primer despliegue |
| [Alta de Municipio](TENANT_ONBOARDING.es.md) | Cómo agregar una ciudad: crear el tenant, subdominio, marca, oficiales, primer admin |
| [Manual de Administración](ADMIN_MANUAL.es.md) | Cómo el personal usa el panel día a día |
| [Guía de Contenido](CONTENT_GUIDE.es.md) | Traducir o editar contenido vía la web de GitHub (sin Git ni código) |
| [Protección de Rama](BRANCH_PROTECTION.md) | Configuración de la rama `main` para administradores del repositorio |

### Ingeniería

| Documento | Propósito |
|---|---|
| [Arquitectura](ARCHITECTURE.es.md) | Vista general de una página con diagrama |
| [Notas técnicas](technical-notes.md) | Detalle: tenants, contenido, autenticación, pagos, mapas |
| [Requisitos de Producto (PRD)](haiti-city-portal-prd.md) | Lista completa de funciones y usuarios objetivo |
| [Estado de Implementación](v0.1-implementation-plan.md) | Inventario marcable de lo construido y lo pendiente |
| [Registros de Decisiones de Arquitectura (ADR)](adr/README.es.md) | El "por qué" detrás de las decisiones técnicas mayores |
| [Instrucciones Copilot](../copilot-instructions.md) | Reglas estrictas para asistentes de IA y colaboradores |

### Política

| Documento | Propósito |
|---|---|
| [Política de Seguridad](../SECURITY.md) | Cómo reportar una vulnerabilidad y el modelo de seguridad |
| [Contribuir](../CONTRIBUTING.md) | Cómo hacer fork, contribuir código y traducir |
| [Licencia](../LICENSE.md) | Business Source License 1.1 (se convierte en Apache 2.0 el 31 de diciembre de 2028) |

---

## Orden de lectura para un nuevo colaborador

Si quiere escribir código en este proyecto:

1. [README del proyecto](../README.md) — qué es el producto, cómo correrlo localmente
2. [Arquitectura](ARCHITECTURE.es.md) — el diagrama y las 6 reglas estrictas
3. [Glosario](GLOSSARY.es.md) — manténgalo abierto en otra pestaña
4. [Notas técnicas](technical-notes.md) — profundice
5. [Instrucciones Copilot](../copilot-instructions.md) — reglas de codificación
6. [Contribuir](../CONTRIBUTING.md) — fork, rama, PR, CLA

---

## Orden de lectura para una municipalidad

Si es un funcionario municipal o líder de TI evaluando esto:

1. [Para Municipalidades](FOR_MUNICIPALITIES.es.md) — **comience aquí**
2. [Glosario](GLOSSARY.es.md) — guárdelo a mano
3. [Despliegue](DEPLOYMENT.es.md) — comparta con su informático
4. [Alta de Municipio](TENANT_ONBOARDING.es.md) — comparta con su informático
5. [Manual de Administración](ADMIN_MANUAL.es.md) — distribúyalo al personal que usará el portal
6. [Guía de Contenido](CONTENT_GUIDE.es.md) — distribúyala a sus traductores y equipo de comunicación

---

## Cómo proponer un cambio

No necesita instalar nada. Desde cualquier documento en GitHub:

1. Haga clic en el **icono de lápiz** arriba a la derecha del archivo.
2. Edite el texto directamente en su navegador.
3. Baje, escriba un mensaje breve describiendo el cambio, haga clic en **Propose changes**.
4. Haga clic en **Create pull request**.

Eso es todo. Un mantenedor revisará y fusionará.

Si una frase no está clara, una traducción es incorrecta, un enlace está roto o falta una sección — abra una Pull Request o [un issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose).

---

## Sobre las traducciones

Cada documento de esta carpeta está disponible en cuatro idiomas: inglés (`.md`), francés (`.fr.md`), criollo haitiano (`.ht.md`), español (`.es.md`). La versión en inglés es la fuente de verdad — cuando cambie un dato en inglés, actualice también las otras tres versiones, o abra un issue indicando qué traducciones necesitan actualizarse.

Las traducciones de este conjunto inicial fueron producidas por colaboradores y se beneficiarán de revisión por hablantes nativos. Si nota una frase forzada o una mala traducción, abra un PR o un issue — las correcciones son muy bienvenidas.

---

[↑ Volver arriba](#haiti-city-portal--documentación) · [README del proyecto](../README.md)
