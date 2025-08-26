# Escuela Culinaria Backend

## Fase 1 — Inducción + Esqueleto del proyecto

**Practicante:** Maximiliano Jesús Vergara Vega  
**Carrera:** Técnico en Programación y Análisis de Sistemas (AIEP)

### Objetivo principal
Crear la base técnica y metodológica del backend serverless usando Firebase Functions (2ª gen) + Express, Firestore (datos/seguridad), RBAC, offline readiness y tests.

### Objetivo global (al final del Día 9)
- Proyecto Firebase Functions (2ª gen) con Express y rutas /v1 para Users, Ingredients, Inventory Movements, Recipes, Classes, Deliveries y Reports.
- Autenticación con Firebase ID Token y RBAC por custom claims.
- Middlewares: authGuard, requireRole, validate (Zod), errorHandler, CORS seguro.
- Modelo Firestore con colecciones, reglas de seguridad por rol e índices compuestos.
- Estrategia offline & sync (updatedAt/clientUpdatedAt + soft delete).
- Colección Thunder/Postman y tests mínimos con Jest + Supertest.

---

## Problematización general
Desarrollar el backend de una PWA para una escuela culinaria que gestione recetas, clases, inventario y distribución de ingredientes, incluso en entornos con conectividad limitada.

### Retos clave
- **Autenticación y roles claros (RBAC):** Accesos específicos para admin, profesor, encargado y estudiante.
- **Sincronización offline y consistencia:** Funcionamiento offline, resolución de conflictos y soft delete.
- **Control de inventario robusto:** Movimientos reflejados en stock en tiempo real.
- **Estructura clara y escalable:** Código modular y backend serverless.
- **Seguridad desde el origen:** Firestore con reglas por rol y endpoints seguros.
- **Soporte técnico desde el modelo de datos:** Documentos bien diseñados, índices adecuados, triggers automáticos.

---

## Roadmap Fase 1

| Día | Problema central |
|-----|------------------|
| 1   | Setup de entorno Firebase y emuladores |
| 2   | Express en Functions + CORS seguro |
| 3   | Autenticación con ID Token |
| 4   | RBAC y reglas Firestore |
| 5   | Routing modular + errorHandler |
| 6   | Validación con Zod + paginación |
| 7   | Modelo Firestore + reglas + índices |
| 8   | Tests (Jest + Supertest) + colección Thunder/Postman |
| 9   | Offline & Sync + README + demo |

---

## Estructura inicial recomendada
- `functions/` — Código fuente principal
  - `routes/` — Rutas Express por dominio
  - `controllers/` — Lógica de negocio
  - `services/` — Servicios y utilidades
  - `middlewares/` — Middlewares (auth, roles, validación, error)
  - `validators/` — Esquemas Zod
  - `repositories/` — Acceso a Firestore
  - `tests/` — Pruebas Jest + Supertest
- `firestore.rules` — Reglas de seguridad
- `firestore.indexes.json` — Índices compuestos
- `firebase.json` — Configuración de emuladores y hosting

---

## Endpoints v1 (bosquejo)
- **Users/Auth:**
  - POST /v1/users
  - PATCH /v1/users/:id
  - GET /v1/users/:id
  - GET /v1/users?role=&q=&limit=&page=
- **Ingredients/Inventory:**
  - POST /v1/ingredients
  - PATCH /v1/ingredients/:id
  - GET /v1/ingredients
  - POST /v1/inventory/movements
  - GET /v1/inventory/movements
- **Recipes:**
  - POST|PATCH|GET /v1/recipes
- **Classes:**
  - POST|PATCH|GET /v1/classes
  - POST /v1/classes/:id/assign-recipe
- **Deliveries:**
  - POST|PATCH|GET /v1/deliveries
- **Reports:**
  - GET /v1/reports

---

## Seguridad y roles (RBAC)
- **Roles:** admin, profesor, encargado, estudiante
- **Asignación:** custom claims vía endpoint/script admin-only
- **Reglas Firestore:**
  - users: admin RW; usuario lee solo su doc
  - ingredients: admin RW/delete; encargado create+read; profesor/estudiante R
  - inventory_movements: admin/encargado create; ajuste solo admin; lectura para autenticados
  - recipes: admin/profesor RW; otros R
  - classes: admin/profesor/encargado RW; estudiante R
  - deliveries: admin/profesor/encargado RW; estudiante R de las suyas

---

## Offline & Sync
- Estrategia: updatedAt/clientUpdatedAt + soft delete
- Reconciliación: si clientUpdatedAt < updatedAt → { conflict: true }
- Habilitar persistence en el cliente web

---

## Testing
- Pruebas con Jest + Supertest
- Colección Thunder/Postman para flujos principales

---

## Troubleshooting
- Verifica emuladores activos y configuración de puertos
- Revisa logs en `firestore-debug.log` y npm
- Usa scripts npm para serve, test y lint

---

## Esquema de datos (resumen)
Ver anexos del documento para ejemplos JSON y reglas de oro del inventario.

---

## Recursos útiles
- [Firebase Functions](https://firebase.google.com/docs/functions)
- [Firestore Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Zod](https://zod.dev/)

---

## Contacto
Para dudas técnicas, contactar al equipo de desarrollo o revisar los recursos oficiales.
