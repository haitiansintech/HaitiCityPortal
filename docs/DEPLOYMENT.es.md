<!--
Idiomas: English (DEPLOYMENT.md) | Français (DEPLOYMENT.fr.md) | Kreyòl (DEPLOYMENT.ht.md) | Español (este archivo)
-->

**Idiomas:** [English](DEPLOYMENT.md) · [Français](DEPLOYMENT.fr.md) · [Kreyòl Ayisyen](DEPLOYMENT.ht.md) · **Español**

[← Índice de documentación](README.es.md) · [README del proyecto](../README.md) · [Glosario](GLOSSARY.es.md)

---

# Despliegue

Guía paso a paso para desplegar Haiti City Portal en producción. Documento dirigido al desarrollador o líder de TI que operará el servicio en vivo.

## Índice

- [Prerrequisitos](#prerrequisitos)
- [Vista general de la arquitectura](#vista-general-de-la-arquitectura)
- [Paso 1 — Dominio](#paso-1--dominio)
- [Paso 2 — DNS comodín](#paso-2--dns-comodín)
- [Paso 3 — Base de datos (Neon)](#paso-3--base-de-datos-neon)
- [Paso 4 — Hosting (Vercel)](#paso-4--hosting-vercel)
- [Paso 5 — Variables de entorno](#paso-5--variables-de-entorno)
- [Paso 6 — Esquema inicial y seed](#paso-6--esquema-inicial-y-seed)
- [Paso 7 — Conectar el dominio a Vercel](#paso-7--conectar-el-dominio-a-vercel)
- [Paso 8 — Verificar el despliegue](#paso-8--verificar-el-despliegue)
- [Paso 9 — Agregar su primer tenant](#paso-9--agregar-su-primer-tenant)
- [Actualizar la aplicación](#actualizar-la-aplicación)
- [Respaldos y recuperación](#respaldos-y-recuperación)
- [Monitoreo y logs](#monitoreo-y-logs)
- [Resumen de costos](#resumen-de-costos)
- [Plataformas alternativas](#plataformas-alternativas)
- [Solución de problemas](#solución-de-problemas)

---

## Prerrequisitos

En su computadora:

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [GitHub CLI](https://cli.github.com/) (`gh`) — opcional
- Editor (VS Code, Cursor)

Cuentas necesarias:

- [GitHub](https://github.com) — para forkear el repo
- Un registrador de dominio (Namecheap, Cloudflare, Porkbun…)
- [Vercel](https://vercel.com) — hosting
- [Neon](https://neon.tech) — base PostgreSQL

[↑ Volver arriba](#índice)

---

## Vista general de la arquitectura

En producción:

```
        Internet
           │
           ▼
   ┌───────────────┐       (cada comuna tiene su subdominio)
   │ Cloudflare/   │       ej.   jacmel.portal.ht
   │ Registrador   │             cap.portal.ht
   │ DNS comodín   │             demo.portal.ht
   │ *.portal.ht   │
   └───────┬───────┘
           │
           ▼
   ┌───────────────┐       App Next.js:
   │    Vercel     │       - middleware lee Host → tenant
   │  (Next.js 15) │       - server components consultan BD
   └───────┬───────┘       - HTTPS automático
           │
           ▼
   ┌───────────────┐       Postgres 16:
   │     Neon      │       - una base compartida
   │  (PostgreSQL) │       - filas filtradas por tenant_id
   └───────────────┘
```

Vea [Arquitectura](ARCHITECTURE.es.md) para el diagrama completo.

[↑ Volver arriba](#índice)

---

## Paso 1 — Dominio

Un solo dominio que todas las comunas compartirán como subdominios.

Recomendado: un `.ht` por identidad haitiana, pero cualquier TLD funciona.

| Registrador | Notas |
|---|---|
| Cloudflare | Renovaciones más baratas, DNS excelente, SSL gratis |
| Namecheap | Interfaz simple, buen soporte |
| Porkbun | Económico, moderno |

Tras la compra, **apunte los nameservers de su dominio a Cloudflare** si compró en otro lugar.

[↑ Volver arriba](#índice)

---

## Paso 2 — DNS comodín

Multi-tenant requiere un registro DNS comodín.

En su proveedor DNS (Cloudflare aquí), agregue **dos CNAME**:

| Tipo | Nombre | Destino | Proxy |
|---|---|---|---|
| CNAME | `@` (apex) | `cname.vercel-dns.com` | DNS only (nube gris) |
| CNAME | `*` | `cname.vercel-dns.com` | DNS only (nube gris) |

El `*` permite que `jacmel.portal.ht`, `cap.portal.ht` y cualquier comuna futura resuelvan automáticamente.

> **Importante:** en Cloudflare, ponga los registros en "DNS only" (nube gris) al inicio. Vercel debe emitir SSL para cada subdominio.

[↑ Volver arriba](#índice)

---

## Paso 3 — Base de datos (Neon)

1. Inicie sesión en [neon.tech](https://neon.tech).
2. Cree un **Proyecto** `haiti-city-portal-prod`.
3. Elija la región más cercana: **AWS US East 2 (Ohio)** o **US East 1 (N. Virginia)**.
4. Copie la **cadena de conexión**:
   ```
   postgresql://USER:PASSWORD@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
5. Será la variable `DATABASE_URL` en el paso 5.

> **Consejo:** el plan gratis de Neon es generoso. Empiece gratis y pase a "Launch" (~$19/mes) cuando crezca el uso.

[↑ Volver arriba](#índice)

---

## Paso 4 — Hosting (Vercel)

### 4.1 Forkear el repositorio

1. Vaya a [github.com/haitiansintech/HaitiCityPortal](https://github.com/haitiansintech/HaitiCityPortal).
2. Clic en **Fork** arriba a la derecha.
3. (Opcional) Renombre su fork (`mairie-jacmel-portal`).

### 4.2 Importar a Vercel

1. Inicie sesión en [vercel.com](https://vercel.com) con GitHub.
2. **Add New… → Project**.
3. Seleccione su fork.
4. **Framework preset**: Next.js (auto-detectado).
5. **Root directory**: por defecto.
6. **Build & output settings**: por defecto.
7. **No haga clic en Deploy** todavía — primero agregue las variables (paso 5).

[↑ Volver arriba](#índice)

---

## Paso 5 — Variables de entorno

En la configuración de Vercel:

| Variable | ¿Requerida? | Ejemplo |
|---|---|---|
| `DATABASE_URL` | **Sí** | `postgresql://USER:PASS@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `AUTH_SECRET` | **Sí** | Cadena aleatoria 32+ caracteres. `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **Sí** | `https://portal.ht` |
| `AUTH_TRUST_HOST` | Recomendada | `true` |
| `NEXT_PUBLIC_BASE_URL` | Opcional | `https://portal.ht` |
| `ENABLE_LOCAL_MODE` | Debe estar **sin definir o `false`** en producción | (no definir) |

Plantilla anotada completa: [`.env.production.example`](../.env.production.example).

> **Atención:** nunca commitee secretos a GitHub. Vercel cifra las variables.

Clic en **Deploy**.

[↑ Volver arriba](#índice)

---

## Paso 6 — Esquema inicial y seed

El primer despliegue arranca la app, pero la base está vacía.

### 6.1 Empujar el esquema

Desde su computadora:

```bash
git clone https://github.com/SU-ORG/HaitiCityPortal.git
cd HaitiCityPortal
npm install
echo 'DATABASE_URL="<su cadena Neon>"' > .env.local
npm run db:push
```

### 6.2 Seed del primer tenant

```bash
$env:CONFIRM_PRODUCTION_SEED="yes"
$env:SEED_ADMIN_EMAIL="admin@su-dominio.ht"
$env:SEED_ADMIN_PASSWORD="<contraseña fuerte y única>"
$env:SEED_TENANT_NAME="Ville de Jacmel"
$env:SEED_TENANT_SUBDOMAIN="jacmel"

npm run db:seed:prod
```

(En macOS/Linux: `export VAR=valor`.)

Crea:
- Una fila `tenants` con su subdominio.
- Una fila `users` superadmin con el correo y contraseña hasheada.

Inicie sesión en `https://jacmel.portal.ht/login` cuando el DNS resuelva (paso 7).

Para agregar más comunas: [Alta de Municipio](TENANT_ONBOARDING.es.md).

[↑ Volver arriba](#índice)

---

## Paso 7 — Conectar el dominio a Vercel

En Vercel:

1. **Settings → Domains**.
2. Agregue `portal.ht`.
3. Agregue `*.portal.ht` (el comodín).
4. Vercel verifica el DNS (paso 2) y emite SSL automáticamente.

Después:
- `https://portal.ht` → llega a la app.
- `https://jacmel.portal.ht` → llega a su tenant Jacmel.

> **Dominio apex:** si su registrador no soporta CNAME en el apex, use los registros A recomendados por Vercel. Cloudflare y Porkbun manejan CNAME-flattening.

[↑ Volver arriba](#índice)

---

## Paso 8 — Verificar el despliegue

Lista de chequeo:

- [ ] `https://portal.ht` responde.
- [ ] `https://jacmel.portal.ht` responde.
- [ ] `https://jacmel.portal.ht/api/health` retorna OK.
- [ ] Cambio de idioma: `/en/`, `/fr/`, `/ht/`, `/es/`.
- [ ] Login en `/login` con su admin.
- [ ] Acceso a una página admin (`/admin`).
- [ ] Candado HTTPS válido.

Si algo falla: [Solución de problemas](#solución-de-problemas).

[↑ Volver arriba](#índice)

---

## Paso 9 — Agregar su primer tenant

Si seedeó un tenant en el paso 6, está listo. Pase a cargar datos vía admin — vea [Manual de Administración](ADMIN_MANUAL.es.md).

Para más comunas: [Alta de Municipio](TENANT_ONBOARDING.es.md).

[↑ Volver arriba](#índice)

---

## Actualizar la aplicación

Cuando llegue código nuevo del upstream:

1. Sincronice su fork: GitHub → su fork → botón **Sync fork**.
2. Vercel redespliega automáticamente en cada push a `main`.
3. Si hay cambio de esquema, ejecute `npm run db:push` contra producción (o automatice en CI).

Recomendado: un entorno `staging` en Vercel con base Neon separada para probar primero.

[↑ Volver arriba](#índice)

---

## Respaldos y recuperación

| Riesgo | Mitigación |
|---|---|
| Pérdida de base | Snapshots automáticos Neon. Planes pagos: 30 días. |
| Bug aplicativo | Vercel guarda todos los despliegues. **Promote to Production** = rollback instantáneo. |
| Secuestro de DNS | 2FA en registrador y proveedor DNS. |
| Contraseña admin perdida | Resetear vía Drizzle Studio o re-seed. |
| `AUTH_SECRET` perdido | Rotar = cierra todas las sesiones. Guardar en gestor de contraseñas. |

[↑ Volver arriba](#índice)

---

## Monitoreo y logs

- **Logs de Vercel**: Settings → Logs.
- **Panel Neon**: rendimiento y almacenamiento.
- Opcional: **Sentry** para errores aplicativos.
- Opcional: **Better Stack / Pingdom** sobre `/api/health`.

[↑ Volver arriba](#índice)

---

## Resumen de costos

| Componente | Gratis | Estándar pago |
|---|---|---|
| Vercel | $0 | $20/usuario/mes (Pro) |
| Neon | $0 | $19/mes (Launch) |
| Cloudflare DNS | $0 | $0 |
| Dominio `.ht` | n/a | ~$30/año |
| Total | **~$0/mes + $30/año** | **~$40/mes + $30/año** |

[↑ Volver arriba](#índice)

---

## Plataformas alternativas

Es Next.js 15 estándar; corre donde corra Node.js.

| Alternativa | Notas |
|---|---|
| VPS auto-hospedado (Hetzner, Linode, OVH) | Docker; ~$5–20/mes; usted maneja SSL y respaldos |
| Cloudflare Pages + Workers | Posible con adaptadores; algunas funciones limitadas |
| Fly.io | Bueno para Postgres + Next.js auto-hospedados |
| Railway | Experiencia similar a Vercel |
| Render | Experiencia similar a Vercel |
| AWS, GCP, Azure | Posible pero pesado; no recomendado para primer despliegue |

Auto-hospedado: usted maneja SSL, certificado wildcard, gestión de procesos, respaldos Postgres.

[↑ Volver arriba](#índice)

---

## Solución de problemas

### Subdominio retorna "404 Not Found"
- Verifique que el CNAME comodín exista.
- Verifique que `*.portal.ht` esté en Vercel **Settings → Domains**.
- La emisión SSL puede tardar 1–10 minutos la primera vez.

### "DB unavailable, using fallback tenant"
- `DATABASE_URL` faltante o incorrecta.
- Base Neon pausada (free tier se auto-pausa tras 5 min de inactividad).
- Cadena sin `?sslmode=require`.

### "MISSING_MESSAGE" o "FORMATTING_ERROR"
- Falta una clave en `messages/{locale}.json`. Verifique paridad de claves.

### Bucle de redirección al login
- `NEXTAUTH_URL` no coincide con la URL real.
- `AUTH_SECRET` sin definir o < 32 caracteres.
- `AUTH_TRUST_HOST` no es `true`.

### `npm run db:push` falla
- Pruebe primero la conexión `psql`.
- Verifique la región del proyecto Neon.

### Build de Vercel falla en primer despliegue
- Revise variables faltantes en el log.

[↑ Volver arriba](#índice)

---

[← Índice de documentación](README.es.md) · [Para Municipalidades](FOR_MUNICIPALITIES.es.md) · [Alta de Municipio →](TENANT_ONBOARDING.es.md)
