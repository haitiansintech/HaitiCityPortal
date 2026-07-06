<!--
Idiomas: English (TENANT_ONBOARDING.md) | Français (TENANT_ONBOARDING.fr.md) | Kreyòl (TENANT_ONBOARDING.ht.md) | Español (este archivo)
-->

**Idiomas:** [English](TENANT_ONBOARDING.md) · [Français](TENANT_ONBOARDING.fr.md) · [Kreyòl Ayisyen](TENANT_ONBOARDING.ht.md) · **Español**

[← Índice de documentación](README.es.md) · [README del proyecto](../README.md) · [Glosario](GLOSSARY.es.md)

---

# Alta de Municipio (tenant onboarding)

Cómo agregar una nueva comuna (un "tenant") a un despliegue de Haiti City Portal en marcha. Este documento continúa donde termina [Despliegue](DEPLOYMENT.es.md).

## Índice

- [¿Qué es un tenant?](#qué-es-un-tenant)
- [Prerrequisitos](#prerrequisitos)
- [Lista de chequeo](#lista-de-chequeo)
- [Paso 1 — Elegir un subdominio](#paso-1--elegir-un-subdominio)
- [Paso 2 — Crear la fila tenant](#paso-2--crear-la-fila-tenant)
- [Paso 3 — Verificar que el subdominio responde](#paso-3--verificar-que-el-subdominio-responde)
- [Paso 4 — Crear el primer usuario admin](#paso-4--crear-el-primer-usuario-admin)
- [Paso 5 — Cargar oficiales y secciones comunales](#paso-5--cargar-oficiales-y-secciones-comunales)
- [Paso 6 — Cargar instalaciones](#paso-6--cargar-instalaciones)
- [Paso 7 — Cargar servicios y noticias](#paso-7--cargar-servicios-y-noticias)
- [Paso 8 — Personalizar el tenant](#paso-8--personalizar-el-tenant)
- [Paso 9 — Capacitar al personal y lanzar](#paso-9--capacitar-al-personal-y-lanzar)
- [Renombrar o eliminar un tenant](#renombrar-o-eliminar-un-tenant)
- [Errores frecuentes](#errores-frecuentes)

---

## ¿Qué es un tenant?

Un **tenant** es una comuna. Cada registro en la base (oficiales, solicitudes, pagos, noticias) pertenece a un solo tenant. El portal sirve a cualquier número de tenants desde una sola aplicación — cada uno se accede por su subdominio.

Una fila en la tabla `tenants` es la fuente de verdad. Su columna `subdomain` controla el ruteo. Si `tenants.subdomain = "jacmel"`, entonces `https://jacmel.portal.ht` es el portal de esa comuna.

Más en [Arquitectura](ARCHITECTURE.es.md).

[↑ Volver arriba](#índice)

---

## Prerrequisitos

Antes de agregar un tenant nuevo:

- Despliegue de producción funcionando ([Despliegue](DEPLOYMENT.es.md)).
- DNS comodín configurado (`*.portal.ht`).
- Dominio comodín agregado en Vercel (**Settings → Domains**).
- Acceso a la base (`DATABASE_URL`).

Identifique el **sponsor del tenant** (alcalde o jefe de gabinete) y el **líder del tenant** (personal a cargo del contenido y la admin).

[↑ Volver arriba](#índice)

---

## Lista de chequeo

Para cada nueva comuna:

- [ ] Subdominio elegido
- [ ] Fila tenant creada
- [ ] Subdominio responde con HTTPS
- [ ] Primer admin creado
- [ ] Secciones comunales cargadas
- [ ] Oficiales cargados
- [ ] Instalaciones agregadas (o importadas)
- [ ] Servicios descritos en MDX (o fallback inglés al inicio)
- [ ] Al menos una noticia publicada
- [ ] Logo, colores, foto del alcalde configurados
- [ ] Al menos dos miembros del personal capacitados
- [ ] Lanzamiento restringido
- [ ] Lanzamiento público

[↑ Volver arriba](#índice)

---

## Paso 1 — Elegir un subdominio

Identificador corto, memorable, en minúsculas, sin espacios ni caracteres especiales.

| Comuna | Subdominio sugerido |
|---|---|
| Jacmel | `jacmel` |
| Cap-Haïtien | `cap` o `capha` |
| Port-au-Prince | `pap` |
| Pétion-Ville | `petionville` |
| Les Cayes | `cayes` |
| Croix-des-Bouquets | `croix` |

URL final: `https://{subdomain}.portal.ht`.

**Palabras reservadas a evitar:** `www`, `admin`, `api`, `static`, `assets`, `cdn`, `mail`, `email`, `app`, `staging`, `dev`, `test`, `localhost`, `demo`.

[↑ Volver arriba](#índice)

---

## Paso 2 — Crear la fila tenant

Dos métodos.

### Opción A — Script seed (recomendado para el primer tenant)

Vea [Despliegue, paso 6.2](DEPLOYMENT.es.md#paso-6--esquema-inicial-y-seed). Crea fila tenant y superadmin de una vez.

### Opción B — Drizzle Studio (para comunas siguientes)

```bash
npm run db:studio
```

1. Tabla `tenants` → **+ Add Record**.
2. `name`: `Ville du Cap-Haïtien`. `subdomain`: `cap`.
3. Guardar. Anote el `id` (UUID).

### Opción C — SQL directo

```sql
INSERT INTO tenants (name, subdomain)
VALUES ('Ville du Cap-Haïtien', 'cap')
RETURNING id;
```

[↑ Volver arriba](#índice)

---

## Paso 3 — Verificar que el subdominio responde

Abra `https://cap.portal.ht`. Debe ver la home con el nombre de la comuna.

Si "DB unavailable":
- CNAME comodín DNS.
- `*.portal.ht` en Vercel **Settings → Domains**.
- `subdomain` coincide con la URL (sensible a mayúsculas, minúsculas).
- SSL provisionado (hasta 10 minutos la primera vez).

[↑ Volver arriba](#índice)

---

## Paso 4 — Crear el primer usuario admin

### Opción A — Drizzle Studio

1. Tabla `users` → **+ Add Record**.
2. `tenant_id`: UUID del paso 2. `email`: `admin@cap.portal.ht`.
3. `password_hash`: hash bcrypt **no la contraseña en texto**:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('SU_CONTRASEÑA', 10))"
   ```
4. `role`: `superadmin`. `name`: `Admin Cap-Haïtien`.
5. Guardar.

### Opción B — SQL

```sql
INSERT INTO users (tenant_id, email, password_hash, role, name)
VALUES ('<UUID>', 'admin@cap.portal.ht', '$2a$10$...', 'superadmin', 'Admin Cap-Haïtien');
```

Pruebe en `https://cap.portal.ht/login`.

[↑ Volver arriba](#índice)

---

## Paso 5 — Cargar oficiales y secciones comunales

### 5.1 Secciones comunales

Para cada sección, fila en `communal_sections`: `tenant_id`, `name` ("1ère Section Bas Limbé"), `code` (`cap-1`).

### 5.2 Oficiales

Para cada electo, fila en `officials`: `tenant_id`, `name`, `role` (`casec`/`asec`/`mayor`/`town_delegate`), `communal_section_id`, `whatsapp`, `vwa_profile_url`, `photo_url`.

[↑ Volver arriba](#índice)

---

## Paso 6 — Cargar instalaciones

Filas en `facilities`: `tenant_id`, `name`, `category` (hospital/school/police/church/market/other), `latitude`, `longitude`, `address`, `phone`.

Tip: residentes pueden sugerir correcciones; llegan a `facility_suggestions`.

[↑ Volver arriba](#índice)

---

## Paso 7 — Cargar servicios y noticias

Servicios y noticias son **archivos de contenido**, no filas BD. Vea [Guía de Contenido](CONTENT_GUIDE.es.md). Los ocho servicios por defecto bastan para la mayoría al lanzamiento.

[↑ Volver arriba](#índice)

---

## Paso 8 — Personalizar el tenant

Hoy personalizable por tenant:
- `name` en la navbar.
- `subdomain`.
- Fotos vía `officials.photo_url`.

Logo y colores propios en hoja de ruta. Mientras tanto: ponga sus visuales en `public/tenants/{subdomain}/`.

[↑ Volver arriba](#índice)

---

## Paso 9 — Capacitar al personal y lanzar

Distribuya [Manual de Administración](ADMIN_MANUAL.es.md). Sesión de 1–2 h: login, solicitudes, verificación de pago, noticia, alerta, traspaso. Luego lanzamiento restringido y público.

[↑ Volver arriba](#índice)

---

## Renombrar o eliminar un tenant

### Renombrar

`name` puede cambiar. `subdomain` debe permanecer estable. Si debe cambiarlo: cree el nuevo, redirija el antiguo, comunique 90 días.

### Eliminar

Respalde primero. Borre filas dependientes antes de `tenants`:

```sql
DELETE FROM payment_records WHERE tenant_id = '<UUID>';
DELETE FROM service_requests WHERE tenant_id = '<UUID>';
DELETE FROM facilities WHERE tenant_id = '<UUID>';
-- ... para cada tabla de entidad ...
DELETE FROM tenants WHERE id = '<UUID>';
```

Mejor: archivar en lugar de borrar.

[↑ Volver arriba](#índice)

---

## Errores frecuentes

| Error | Síntoma | Solución |
|---|---|---|
| `*.portal.ht` no agregado a Vercel | 404 | Settings → Domains |
| Subdominio en mayúsculas | No encuentra tenant | Solo minúsculas |
| Contraseña en texto plano en `password_hash` | Login siempre falla | Generar hash bcrypt |
| `tenant_id` olvidado | Fila invisible | Actualizar fila |
| Dos tenants con mismo `subdomain` | Ruteo indefinido | Restricción de unicidad |
| Palabra reservada como subdominio | Conflicto | Elegir otra |

[↑ Volver arriba](#índice)

---

[← Índice de documentación](README.es.md) · [Despliegue](DEPLOYMENT.es.md) · [Manual de Administración →](ADMIN_MANUAL.es.md)
