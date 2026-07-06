<!--
Idiomas: English (ADMIN_MANUAL.md) | Français (ADMIN_MANUAL.fr.md) | Kreyòl (ADMIN_MANUAL.ht.md) | Español (este archivo)
-->

**Idiomas:** [English](ADMIN_MANUAL.md) · [Français](ADMIN_MANUAL.fr.md) · [Kreyòl Ayisyen](ADMIN_MANUAL.ht.md) · **Español**

[← Índice de documentación](README.es.md) · [README del proyecto](../README.md) · [Glosario](GLOSSARY.es.md)

---

# Manual de Administración

Guía práctica de uso diario para personal municipal del panel de administración. No requiere formación técnica.

## Índice

- [Antes de empezar](#antes-de-empezar)
- [Iniciar sesión](#iniciar-sesión)
- [El tablero](#el-tablero)
- [Solicitudes de servicio](#solicitudes-de-servicio)
- [Verificar pagos](#verificar-pagos)
- [Publicar noticias](#publicar-noticias)
- [Publicar una alerta de emergencia](#publicar-una-alerta-de-emergencia)
- [Gestionar oficiales](#gestionar-oficiales)
- [Gestionar instalaciones](#gestionar-instalaciones)
- [Revisar sugerencias](#revisar-sugerencias)
- [Reportes de campo](#reportes-de-campo)
- [Manual de gobernanza](#manual-de-gobernanza)
- [Revisión de auditoría financiera](#revisión-de-auditoría-financiera)
- [Roles de usuario y acceso](#roles-de-usuario-y-acceso)
- [Cierre de sesión y traspaso](#cierre-de-sesión-y-traspaso)
- [Solución de problemas](#solución-de-problemas)

---

## Antes de empezar

Necesita:

- Un navegador (Chrome, Edge, Safari, Firefox).
- Sus credenciales admin (las da su líder de TI).
- Internet.

Recomendado: una segunda pantalla/pestaña para notas; lectura del [Glosario](GLOSSARY.es.md).

[↑ Volver arriba](#índice)

---

## Iniciar sesión

1. Vaya a `https://{su-subdominio}.portal.ht`.
2. Clic en **Login** o vaya a `/login`.
3. Ingrese email y contraseña.
4. Aterrizará en `/admin`.

Si la contraseña no funciona, pida a su líder TI que la resetee. Nunca comparta su contraseña.

[↑ Volver arriba](#índice)

---

## El tablero

`/admin` es su punto de partida cada día:

- **Solicitudes abiertas**.
- **Pagos pendientes**.
- **Actividad reciente**.
- **Accesos rápidos** a cada sección.

Abra el tablero al iniciar la jornada.

[↑ Volver arriba](#índice)

---

## Solicitudes de servicio

### Leer una solicitud

1. **Requests** o `/admin/requests`.
2. La lista muestra: fecha, tipo, estado, resumen.
3. Clic en una fila para ver `/admin/requests/[id]`: nombre, contacto, descripción, foto, GPS, historial.

### Actualizar estado

| Estado | Significado |
|---|---|
| **Open** | Recién enviada, sin atender |
| **In progress** | Un agente está trabajando |
| **Resolved** | Resuelta |
| **Closed** | Resuelta y reconocida por el residente |
| **Rejected** | No procede (fuera de alcance, duplicado, malicioso) — incluya razón |

Clic **Update Status**, agregue una nota interna corta.

### Buenas prácticas

- Actualice antes de **48 h**, aunque sea un acuse.
- Casos complejos: **In progress**, actualice de nuevo al final.
- Rechazos: razón clara — protección legal.

[↑ Volver arriba](#índice)

---

## Verificar pagos

Hoy: reconciliación manual.

### Procedimiento

1. `/admin/finance`.
2. Filtre estado **Pending Upload**.
3. Abra: código memo, monto, método, contacto.
4. Cruce contra extracto banco/MonCash.
5. Si encuentra: **Mark Verified**, fecha real, captura opcional.
6. Si no aparece tras 5 días hábiles: **Failed** con razón.

> **Crítico:** nunca valide sin prueba independiente.

[↑ Volver arriba](#índice)

---

## Publicar noticias

Vea [Guía de Contenido](CONTENT_GUIDE.es.md) para el flujo GitHub web (recomendado). Un editor admin web está en hoja de ruta.

[↑ Volver arriba](#índice)

---

## Publicar una alerta de emergencia

1. `/admin/emergency` → **New Alert**.
2. Título en los 4 idiomas, cuerpo, severidad (`info`/`warning`/`critical`), inicio, fin.
3. Guardar.

La alerta aparece de inmediato.

> Duplique alertas críticas vía WhatsApp, radio, altavoces municipales. El portal complementa, no reemplaza.

Para terminar antes: edite el fin o **Deactivate**.

[↑ Volver arriba](#índice)

---

## Gestionar oficiales

`/admin/officials`. Nuevo: nombre, rol, sección comunal, foto, WhatsApp, perfil Vwa. Inactivar en lugar de borrar.

En cada elección, programe 2 h en los 7 días siguientes a la investidura.

[↑ Volver arriba](#índice)

---

## Gestionar instalaciones

`/admin/facilities`. Categorías: hospital, escuela, policía, bomberos, iglesia, mercado, gobierno, otra.

GPS por teléfono o Google Maps (clic derecho → "¿Qué hay aquí?").

[↑ Volver arriba](#índice)

---

## Revisar sugerencias

`/admin/facility-suggestions`. Aceptar o rechazar con razón. Limpieza semanal.

[↑ Volver arriba](#índice)

---

## Reportes de campo

`/admin/field-reports`. Tipo, lugar, descripción, foto, severidad. Alimenta el mapa `/map`.

[↑ Volver arriba](#índice)

---

## Manual de gobernanza

`/admin/handbook`. Lectura: todos los admins según rol. Edición: `superadmin` vía `/admin/handbook/editor`. Lectura registrada — útil para onboarding.

[↑ Volver arriba](#índice)

---

## Revisión de auditoría financiera

`/admin/finance/audit-review`. Snapshots automáticos. Compare mes actual / anterior. Anomalía → escale al tesorero. Página de solo lectura.

[↑ Volver arriba](#índice)

---

## Roles de usuario y acceso

| Rol | Puede |
|---|---|
| `user` | Enviar solicitudes, pagar |
| `admin` | Solicitudes, pagos, oficiales/instalaciones, noticias/alertas |
| `superadmin` | Todo admin + handbook + crear/desactivar admins |

Al menos **dos `superadmin`** por comuna.

Nuevo admin: `/admin/users` o Drizzle Studio. Nunca cuenta compartida.

[↑ Volver arriba](#índice)

---

## Cierre de sesión y traspaso

Fin de turno:
1. Nota en **Open requests**.
2. Mensaje Slack/WhatsApp al siguiente turno: urgencias, pagos, alertas activas.
3. Avatar → **Logout**.
4. Cierre la pestaña (dispositivos compartidos).

[↑ Volver arriba](#índice)

---

## Solución de problemas

| Problema | Acción |
|---|---|
| Contraseña olvidada | Reset por el líder TI |
| No veo el panel admin | Cuenta no admin — pida a un superadmin |
| Pago verificado por error | **Reverse Verification** + razón |
| Errata en noticia/alerta | Editar MDX/alerta |
| Sitio caído | `/api/health`, si no avise al líder TI |
| Veo datos de otra comuna | **Incidente crítico**: `security@haiticity.org` ya |

[↑ Volver arriba](#índice)

---

[← Índice de documentación](README.es.md) · [Alta de Municipio](TENANT_ONBOARDING.es.md) · [Guía de Contenido →](CONTENT_GUIDE.es.md)
