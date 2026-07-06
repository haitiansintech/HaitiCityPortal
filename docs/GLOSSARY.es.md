<!--
Idiomas: English (GLOSSARY.md) | Français (GLOSSARY.fr.md) | Kreyòl (GLOSSARY.ht.md) | Español (este archivo)
-->

**Idiomas:** [English](GLOSSARY.md) · [Français](GLOSSARY.fr.md) · [Kreyòl Ayisyen](GLOSSARY.ht.md) · **Español**

[← Índice de documentación](README.es.md) · [README del proyecto](../README.md)

---

# Glosario

Definiciones en lenguaje claro de cada término técnico, cívico y específico de Haití usado en esta documentación. Si una palabra le bloquea, búsquela aquí. Si falta un término, [abra una Pull Request](https://github.com/haitiansintech/HaitiCityPortal/edit/main/docs/GLOSSARY.es.md) o [un issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose).

## Índice

- [Términos cívicos y haitianos](#términos-cívicos-y-haitianos)
- [Términos técnicos](#términos-técnicos)
- [Términos de operación](#términos-de-operación)
- [Términos específicos del proyecto](#términos-específicos-del-proyecto)
- [Siglas](#siglas)

---

## Términos cívicos y haitianos

| Término | Significado |
|---|---|
| **CASEC** | *Conseil d'Administration de la Section Communale*. Consejo electo de tres personas que gobierna una *sección comunal*. |
| **ASEC** | *Assemblée de la Section Communale*. Asamblea legislativa electa de una sección comunal, junto al CASEC. |
| **Comuna** | Municipalidad en Haití — equivalente a una ciudad o pueblo. Cada comuna tiene un alcalde; es el nivel al que sirve este portal. |
| **Sección comunal** | Subunidad geográfica de una comuna, gobernada por un CASEC + ASEC. |
| **Alcalde** | Cabeza electa de una comuna. |
| **Delegado de Ciudad** | Representante del gobierno central nombrado en una comuna. |
| **MonCash** | Servicio de dinero móvil más usado en Haití, operado por Digicel. Muchos residentes pagan facturas con MonCash. |
| **NIF** | *Numéro d'Identification Fiscale*. Identificación fiscal haitiana — requerida para la mayoría de trámites oficiales. |
| **CIN** | *Carte d'Identification Nationale*. La cédula de identidad nacional haitiana. |
| **Quittance** (fr/kreyòl) | Recibo o comprobante de pago. El portal emite una *quittance* cuando un pago se verifica. |
| **Open311** | Estándar internacional abierto para que ciudadanos reporten problemas no urgentes (baches, basura, alumbrado) a una municipalidad. El formulario `/report` del portal sigue este estándar. |

---

## Términos técnicos

| Término | Significado |
|---|---|
| **Frontend** | Parte de una aplicación que corre en el navegador del usuario (páginas, formularios, botones). |
| **Backend** | Parte que corre en un servidor: login, base de datos, pagos. El usuario nunca ve el código backend. |
| **Full-stack** | Aplicación que contiene tanto frontend como backend en el mismo proyecto. Haiti City Portal es full-stack. |
| **Next.js** | El framework web sobre el que está construido el proyecto. Produce páginas (frontend) y lógica de servidor (backend) desde un único código. |
| **App Router** | El sistema de rutas moderno de Next.js 13+ donde cada carpeta bajo `src/app/` se convierte en una URL. |
| **React** | La biblioteca JavaScript que usa Next.js para construir interfaces. |
| **Server Component** | Página o componente que corre en el servidor y envía HTML ya listo al navegador. Más rápido, mejor para SEO, puede leer la base de datos directamente. |
| **Client Component** | Componente que corre en el navegador. Necesario para cosas interactivas (mapas, formularios, animaciones). Marcado con `"use client"` arriba del archivo. |
| **Server Action** | Función backend invocable directamente desde un formulario. Definida en `src/app/actions/`. |
| **API route** | Endpoint backend en una URL como `/api/health`. |
| **Middleware** | Código que corre en el servidor *antes* de renderizar la página. Este proyecto lo usa para detectar idioma, identificar la ciudad (tenant) y proteger páginas admin. |
| **Base de datos** | Donde se almacenan datos dinámicos: ciudades, usuarios, solicitudes, pagos, eventos. |
| **PostgreSQL (Postgres)** | El motor de base de datos usado. Gratuito, open source, muy usado. |
| **Drizzle ORM** | Herramienta que permite escribir consultas en TypeScript en vez de SQL puro. Esquema en `src/db/schema.ts`. |
| **Esquema** | Plano de la base: qué tablas existen, qué columnas, qué tipos. |
| **Migración** | Archivo que actualiza el esquema (agrega columna, renombra tabla). Drizzle los genera. |
| **Seeding** | Insertar datos iniciales en una base vacía (ej. una ciudad demo). Se corre con `npm run db:seed`. |
| **TypeScript** | Versión de JavaScript con verificación de tipos — atrapa muchos errores antes de ejecutar. |
| **Tailwind CSS** | Sistema de estilos donde se escriben pequeñas clases (`bg-blue-500 p-4`) directamente en HTML. El proyecto usa Tailwind v4. |
| **shadcn/ui** | Biblioteca de componentes UI accesibles y personalizables (botones, diálogos, inputs) sobre Tailwind. |
| **MDX** | Markdown con componentes React embebidos. Las descripciones de servicios y noticias están en MDX. |
| **Frontmatter** | El bloque YAML arriba de un archivo MDX (entre `---`) con metadatos (título, fecha, tarifas). |
| **MapLibre GL** | Biblioteca de mapas open source usada en `/map`. |
| **Leaflet** | Biblioteca de mapas más simple, usada en el directorio de instalaciones. |
| **NextAuth (Auth.js)** | Biblioteca que maneja login, sesiones y roles. |
| **bcryptjs** | Biblioteca para hashear contraseñas de forma segura. La contraseña original nunca se almacena. |
| **Zod** | Biblioteca para validar entradas de usuario en formularios. |
| **next-intl** | Biblioteca que maneja los cuatro idiomas y las URLs con prefijo de idioma (`/ht/`, `/fr/`, `/en/`, `/es/`). |

---

## Términos de operación

| Término | Significado |
|---|---|
| **Dominio** | Dirección web de un sitio, ej. `portal.ht`. Se compra a un registrador (Namecheap, Cloudflare, GoDaddy…). |
| **Subdominio** | Nombre delante del dominio, ej. `jacmel.portal.ht`. Así identifica el portal a cada ciudad. |
| **DNS comodín (wildcard)** | Registro DNS como `*.portal.ht` que coincide con *cualquier* subdominio. Esencial para añadir una ciudad sin tocar el DNS. |
| **DNS** | La libreta de direcciones de internet. Asocia `jacmel.portal.ht` a la IP del servidor. |
| **SSL / TLS / HTTPS** | El candado del navegador. Cifra el tráfico. Vercel lo provee gratis. |
| **Hosting** | El servidor que corre el sitio en producción. El proyecto está pensado para Vercel (recomendado) pero corre donde sea que corra Node.js. |
| **Vercel** | Plataforma de hosting de la empresa que hace Next.js. Plan gratuito disponible; planes pagos desde ~$20/mes. |
| **Neon** | Servicio gestionado de PostgreSQL frecuentemente combinado con Vercel. Plan gratuito disponible. |
| **Variable de entorno** | Valor de configuración (contraseña de la base, etc.) provisto a la app — nunca escrito en el código. Guardado en `.env.local` localmente, en el panel del hosting en producción. |
| **CI / CD** | Integración Continua / Despliegue Continuo. Comprobaciones automáticas (lint, typecheck, build, tests) en cada PR. Definidas en `.github/workflows/ci.yml`. |
| **Pull Request (PR)** | Propuesta de cambio de código, abierta en GitHub para revisión antes de fusionar. |
| **Protección de rama** | Reglas de GitHub que impiden push directo a `main` y exigen revisiones en los PR. |
| **Firma GPG** | Firmar criptográficamente tus commits para probar que vienen de ti. La protección de rama lo exige. |

---

## Términos específicos del proyecto

| Término | Significado |
|---|---|
| **Tenant (inquilino)** | Una sola municipalidad/ciudad servida por el portal. Todo el proyecto está construido para que una sola app sirva muchos tenants. |
| **SaaS multi-tenant** | Patrón donde una app sirve a muchas organizaciones distintas, con datos aislados. Haiti City Portal es multi-tenant: un mismo servidor puede servir Jacmel, Cap-Haïtien y Pétion-Ville a la vez. |
| **`tenant_id`** | Columna UUID en cada fila de la base que dice a qué ciudad pertenece. Toda consulta debe filtrar por `tenant_id`. |
| **Cabecera `x-tenant-subdomain`** | Cabecera HTTP interna que el middleware fija e indica al resto de la app de qué subdominio viene la petición. |
| **UUID** | Identificador aleatorio de 128 bits, ej. `550e8400-e29b-41d4-a716-446655440000`. Clave primaria en todas las tablas — nunca enteros secuenciales. |
| **Locale (configuración regional)** | Código de idioma: `en`, `fr`, `ht`, `es`. El default es `ht`. |
| **Prefijo de locale** | La parte `/ht/` o `/en/` de una URL. Toda página pública vive bajo un prefijo. |
| **Fallback de locale** | Si falta un archivo en francés, el portal usa silenciosamente el inglés. Permite traducir un idioma a la vez. |
| **Código memo** | Código corto legible (ej. `JAC-TAX-8821`) mostrado al residente tras una solicitud de pago. Lo incluye como referencia en MonCash o transferencia para que un admin pueda conciliar. |
| **Pending upload** | Estado de un pago cuyo código memo se emitió pero cuya recepción aún no fue confirmada por un admin. |
| **Reconciliación manual** | Proceso actual donde un admin compara extractos bancarios/MonCash contra los pagos pendientes y los marca verificados. Se reemplazará luego con webhooks. |
| **Solicitud de servicio** | Reporte o solicitud ciudadana — compatible con Open311. Almacenada en `service_requests`. |
| **Reporte de campo** | Observación enviada por el personal desde el terreno. Distinta de una solicitud ciudadana. |
| **Sección comunal** (término BD) | Fila en la tabla `communal_sections` que representa una subunidad geográfica; oficiales CASEC/ASEC se enlazan a una. |
| **Handbook** | Artículos del manual de gobernanza interno (`handbook_articles`), visibles solo para admins con el rol correcto. |
| **Snapshot de auditoría** | Copia congelada de cifras financieras en un momento para detectar manipulación posterior. |
| **Alerta de emergencia** | Mensaje difundido a nivel de tenant (huracán, toque de queda, corte de agua). |

---

## Siglas

| Sigla | Significa |
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

[↑ Volver arriba](#glosario) · [← Índice de documentación](README.es.md) · [README del proyecto →](../README.md)
