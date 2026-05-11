<!--
Idiomas: English (FOR_MUNICIPALITIES.md) | Français (FOR_MUNICIPALITIES.fr.md) | Kreyòl (FOR_MUNICIPALITIES.ht.md) | Español (este archivo)
-->

**Idiomas:** [English](FOR_MUNICIPALITIES.md) · [Français](FOR_MUNICIPALITIES.fr.md) · [Kreyòl Ayisyen](FOR_MUNICIPALITIES.ht.md) · **Español**

[← Índice de documentación](README.es.md) · [README del proyecto](../README.md) · [Glosario](GLOSSARY.es.md)

---

# Para Municipalidades

Guía no técnica para alcaldes, concejales y personal municipal que evalúan Haiti City Portal para su comuna.

## Índice

- [¿Qué es Haiti City Portal?](#qué-es-haiti-city-portal)
- [¿Qué pueden hacer sus residentes?](#qué-pueden-hacer-sus-residentes)
- [¿Qué puede hacer su personal?](#qué-puede-hacer-su-personal)
- [Lo que necesita para correrlo](#lo-que-necesita-para-correrlo)
- [Costos estimados](#costos-estimados)
- [Tiempo para lanzar](#tiempo-para-lanzar)
- [Roles requeridos en su lado](#roles-requeridos-en-su-lado)
- [Idiomas y accesibilidad](#idiomas-y-accesibilidad)
- [Datos, propiedad y privacidad](#datos-propiedad-y-privacidad)
- [Preguntas frecuentes](#preguntas-frecuentes)
- [Cómo empezar](#cómo-empezar)
- [A quién contactar](#a-quién-contactar)

---

## ¿Qué es Haiti City Portal?

Haiti City Portal es **software libre y gratuito** para comunas haitianas. Le da a sus residentes un sitio web único donde pueden:

- Consultar información sobre servicios municipales
- Enviar solicitudes y reportar problemas (baches, basura, alumbrado)
- Pagar tasas municipales por MonCash o transferencia bancaria
- Leer noticias oficiales y alertas de emergencia
- Encontrar hospitales, escuelas y comisarías
- Ver oficiales electos y contactarlos

También entrega a su personal un panel de administración para gestionar solicitudes, verificar pagos, publicar noticias y emitir alertas.

Está construido para que **un mismo sistema compartido pueda servir a cualquier número de comunas**. Cada comuna tiene su propio subdominio (ej. `jacmel.portal.ht`, `cap.portal.ht`) y sus propios datos — totalmente separados de las demás.

> **En una frase:** es el mismo tipo de sistema que usan ciudades como Boston o Lyon, pero diseñado específicamente para Haití — multilingüe por defecto, listo para conexiones lentas y adaptado a realidades locales (CASEC, ASEC, MonCash, NIF).

[↑ Volver arriba](#índice)

---

## ¿Qué pueden hacer sus residentes?

| Función ciudadana | Por qué importa |
|---|---|
| Encontrar un servicio y ver qué documentos se requieren | Reduce viajes innecesarios al ayuntamiento |
| Reportar un problema con foto y GPS | Los problemas dejan de perderse |
| Pagar en línea por MonCash o transferencia | Menos efectivo, menos filas |
| Recibir un recibo digital (quittance) | Menos papel, menos fraude |
| Ver todas las instalaciones públicas en un mapa | Ayuda más rápida en emergencias |
| Leer noticias y alertas oficiales | Información oficial reemplaza el rumor |
| Usar el sitio en criollo, francés, inglés o español | Acceso igualitario residentes y diáspora |
| Ver oficiales por sección comunal | Mayor rendición de cuentas democrática |

[↑ Volver arriba](#índice)

---

## ¿Qué puede hacer su personal?

| Función admin | Quién la usa |
|---|---|
| Ver solicitudes entrantes y cambiar su estado | Personal de atención |
| Verificar pagos pendientes contra extractos banco/MonCash | Oficial financiero |
| Publicar artículos de noticias y alertas | Oficial de comunicaciones |
| Gestionar la lista de oficiales y sus contactos | Jefe de gabinete del alcalde |
| Mantener el directorio de instalaciones y sus GPS | Líder GIS / engagement cívico |
| Ver tableros financieros y snapshots de auditoría | Alcalde / tesorero |
| Leer y reconocer artículos del manual de gobernanza | Todos los admins |
| Restringir quién hace qué (roles user/admin/superadmin) | TI / gabinete |

[↑ Volver arriba](#índice)

---

## Lo que necesita para correrlo

Solo tres cosas:

1. **Un nombre de dominio** — ejemplo `portal.ht` o el suyo (`jacmel-mairie.ht`). Aproximadamente $15–30 al año.
2. **Una cuenta de hosting** — recomendado: [Vercel](https://vercel.com) (gratis para comunas pequeñas, $20–40/mes para mayores).
3. **Una base PostgreSQL gestionada** — recomendado: [Neon](https://neon.tech) (gratis para comunas pequeñas, $19/mes el plan estándar pago).

**No** necesita servidor físico, sala de servidores ni hardware especial. Todo corre en la nube.

Con esos tres elementos, un desarrollador con experiencia puede desplegar el portal de su comuna **en menos de un día**.

Vea el detalle en [Despliegue](DEPLOYMENT.es.md) y [Alta de Municipio](TENANT_ONBOARDING.es.md).

[↑ Volver arriba](#índice)

---

## Costos estimados

Para una comuna de tamaño típico (50.000–200.000 habitantes):

| Ítem | Costo mensual indicativo |
|---|---|
| Nombre de dominio | ~$2/mes (pagado anual) |
| Hosting (Vercel) | $0–40 |
| Base de datos (Neon) | $0–19 |
| Servicio de email (opcional, ej. Resend) | $0–20 |
| Tiles de mapas (gratis con MapLibre por defecto) | $0 |
| **Total** | **~$20–80 / mes** |

Estos números cubren solo infraestructura. **No incluyen** personas: un desarrollador para desplegar, un editor para traducir, un admin para verificar pagos. La mayoría de comunas cubre estos roles con personal existente.

Una segunda, tercera o centésima comuna puede sumarse al mismo despliegue compartido a **costo adicional casi nulo**, gracias a la arquitectura multi-tenant.

[↑ Volver arriba](#índice)

---

## Tiempo para lanzar

Cronograma realista para una comuna:

| Etapa | Tiempo | Quién |
|---|---|---|
| Comprar dominio, crear cuentas hosting | 1 día | TI o desarrollador |
| Desplegar la aplicación | Medio día | Desarrollador |
| Configurar subdominio y crear el tenant | 1 hora | Desarrollador |
| Cargar oficiales, secciones, instalaciones | 1–3 días | Comunicaciones + registro |
| Traducir o redactar descripciones de servicios | 1–2 semanas | Equipo de comunicaciones |
| Capacitar al personal en el panel admin | Medio día | Gabinete |
| Lanzamiento restringido | 1 día | Comunicaciones |
| Lanzamiento público | 1 día | Gabinete del alcalde |

**Total: 2–4 semanas desde la decisión hasta el lanzamiento público**, sujeto a disponibilidad del personal.

[↑ Volver arriba](#índice)

---

## Roles requeridos en su lado

| Rol | Tiempo necesario | Habilidades |
|---|---|---|
| **Sponsor** (alcalde o jefe de gabinete) | Pocas horas en total | Autoridad de decisión, priorización |
| **Desarrollador / TI** | 2–5 días para setup, luego ocasional | Cómodo con Node.js, hosting web, DNS. Interno, voluntario o contratista. |
| **Oficial de comunicaciones** | Continuo | Redacta noticias, traduce servicios, publica alertas. Sin código. |
| **Oficial financiero** | Continuo | Verifica pagos contra extractos |
| **Personal de atención** | Continuo | Lee solicitudes y cambia su estado |

No necesita un equipo grande. Un miembro del personal con afinidad técnica más el equipo de comunicaciones del alcalde es suficiente para la mayoría de comunas.

[↑ Volver arriba](#índice)

---

## Idiomas y accesibilidad

El portal se entrega en cuatro idiomas:

- **Criollo haitiano (Kreyòl Ayisyen)** — por defecto, lengua materna de la gran mayoría de haitianos.
- **Francés** — lengua escrita oficial del gobierno.
- **Inglés** — para diáspora, ONG y socios.
- **Español** — accesibilidad transfronteriza (República Dominicana, socios regionales).

Los residentes cambian de idioma arriba en cada página. Si un contenido aún no está traducido, el portal muestra automáticamente la versión en inglés — sin páginas rotas.

El sitio está construido mobile-first, optimizado para conexiones lentas (2G/3G), y cumple con estándares de accesibilidad web habituales.

[↑ Volver arriba](#índice)

---

## Datos, propiedad y privacidad

- **Sus datos son suyos.** Los residentes, solicitudes, pagos, noticias y oficiales de su comuna se almacenan en *su* base. Otras comunas del despliegue compartido no pueden ver sus datos.
- **El software es open source** bajo Business Source License 1.1. Cualquier comuna puede usarlo libremente para fines no comerciales. Pasa a Apache 2.0 (totalmente libre) el 31 de diciembre de 2028. Vea [LICENSE.md](../LICENSE.md).
- **El aislamiento entre tenants se aplica a nivel de código.** Cada consulta filtra por `tenant_id`. Una fuga de datos entre comunas se trata como incidente de seguridad crítico.
- **Las contraseñas están hasheadas.** Ni los mantenedores pueden leerlas.
- **Sin tracking analítico por defecto.** Usted decide qué agrega.

Detalles en [Política de Seguridad](../SECURITY.md).

[↑ Volver arriba](#índice)

---

## Preguntas frecuentes

**P. ¿Hay que pagar por el software?**
R. No. El código es gratis. Solo paga la infraestructura (dominio, hosting, base) y su personal.

**P. No tenemos desarrollador. ¿Qué hacemos?**
R. Tres opciones: (1) Pedir a una universidad local — muchos estudiantes de informática saltarían sobre este proyecto. (2) Contactar la red Haitians in Tech para un voluntario o contratista económico. (3) Escribir a `info@haiticity.org`; ayudamos a conectarlos.

**P. ¿Podemos personalizar el sitio para nuestra comuna?**
R. Sí — nombre, logo, colores, fotos oficiales, secciones comunales, servicios y noticias son todos configurables por comuna. La base gráfica se comparte para que todas las comunas se vean como una infraestructura cívica nacional.

**P. ¿Podemos agregar un servicio propio de nuestra comuna?**
R. Sí. Los servicios se definen en archivos de contenido que cualquiera puede editar. Vea [Guía de Contenido](CONTENT_GUIDE.es.md).

**P. ¿Y si nuestra internet no es estable?**
R. El sitio está optimizado para baja velocidad. El envío offline está en la hoja de ruta ([Estado de Implementación](v0.1-implementation-plan.md)).

**P. ¿Si MonCash está caído?**
R. La transferencia bancaria sirve de respaldo. El sistema emite un código memo que el residente incluye, y un admin verifica manualmente. La integración por webhook de MonCash está en la hoja de ruta.

**P. Ya tenemos un sitio. ¿Por qué cambiar?**
R. No tiene que cambiar. Puede correr el portal en un subdominio (`servicios.su-mairie.ht`) y enlazarlo desde su sitio. O usarlo como sitio principal. Su elección.

**P. ¿Los residentes pueden crear cuenta?**
R. Hoy pueden enviar solicitudes anónimamente. La creación de cuenta para residentes (seguir sus solicitudes) está en la hoja de ruta.

**P. ¿Y la diáspora?**
R. El portal es multilingüe (inglés/francés/español) y soporta transferencias internacionales para proyectos comunitarios. Stripe (USD/EUR) está en la hoja de ruta.

**P. ¿Podemos integrar con sistemas existentes (ej. catastro)?**
R. Sí. El portal expone APIs y puede extenderse. Hable con su desarrollador.

[↑ Volver arriba](#índice)

---

## Cómo empezar

1. Lea este documento y el [Glosario](GLOSSARY.es.md) — comparta ambos con quienes deciden.
2. Identifique a su desarrollador / TI y comparta [Despliegue](DEPLOYMENT.es.md) y [Alta de Municipio](TENANT_ONBOARDING.es.md).
3. Identifique al líder de contenido (comunicaciones) y comparta [Guía de Contenido](CONTENT_GUIDE.es.md).
4. Decida un dominio (o subdominio).
5. Cree las cuentas de hosting y base de datos.
6. Despliegue.
7. Dé de alta su tenant (cree su comuna en el sistema).
8. Cargue oficiales, secciones, instalaciones, servicios, noticias.
9. Capacite al personal con [Manual de Administración](ADMIN_MANUAL.es.md).
10. Lance.

[↑ Volver arriba](#índice)

---

## A quién contactar

| Motivo | Contacto |
|---|---|
| Preguntas generales | `info@haiticity.org` |
| Encontrar desarrollador | `info@haiticity.org` |
| Seguridad o vulnerabilidad | `security@haiticity.org` |
| Licenciamiento para uso comercial | `licensing@haiticity.org` |
| Bug o solicitud de feature | [Abrir un issue](https://github.com/haitiansintech/HaitiCityPortal/issues/new/choose) |

Visite también el proyecto en [GitHub](https://github.com/haitiansintech/HaitiCityPortal).

[↑ Volver arriba](#índice)

---

[← Índice de documentación](README.es.md) · [Glosario](GLOSSARY.es.md) · [Despliegue →](DEPLOYMENT.es.md)
