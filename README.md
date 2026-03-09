# Lab5 – Reto Banorte

CRUD de proyectos (Generador de Requerimientos): frontend en React y API en Node.js con base de datos PostgreSQL.

---

## Requisitos

- **Node.js** (v16 o superior)
- **PostgreSQL** instalado y corriendo
- **npm** (incluido con Node)

---

## 1. Setup de base de datos (PostgreSQL local)

### 1.1 Crear la base de datos

Abre una terminal y conéctate a PostgreSQL con el usuario que uses (por ejemplo `postgres`):

```bash
psql -U postgres
```

Dentro de `psql`, crea la base de datos:

```sql
CREATE DATABASE acme;
\q
```

(Si ya tienes la base `acme`, omite este paso.)

### 1.2 Crear la tabla e insertar datos

Ejecuta el script `init.sql` contra la base `acme`. Ajusta `-U` (usuario) y `-p` (puerto) según tu instalación:

```bash
psql -U postgres -d acme -f project-api-postgres/init.sql
```

Si PostgreSQL usa otro puerto (por ejemplo 5445):

```bash
psql -U postgres -p 5445 -d acme -f project-api-postgres/init.sql
```

Eso crea la tabla `proyectos` (id, nombre, descripcion) e inserta datos por defecto.

### 1.3 Configurar variables de entorno de la API

En la carpeta `project-api-postgres` hay un archivo `.env`. Ajusta los valores a tu PostgreSQL local:

```env
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=acme
```

- **DB_PORT:** el puerto donde escucha PostgreSQL (por defecto `5432`).
- **DB_NAME:** debe ser la base donde ejecutaste `init.sql` (por ejemplo `acme`).

---

## 2. Correr la API

Desde la raíz del proyecto:

```bash
cd project-api-postgres
npm install
npm run dev
```

Deberías ver algo como:  
`API de proyectos (Lab5 - Banorte) en http://localhost:5001`

Para probar en el navegador:

- [http://localhost:5001/api](http://localhost:5001/api) — información de la API
- [http://localhost:5001/api/proyectos](http://localhost:5001/api/proyectos) — listado de proyectos (JSON)

Deja esta terminal abierta mientras usas la aplicación.

---

## 3. Correr la página (frontend)

En **otra** terminal, desde la raíz del proyecto:

```bash
npm install
npm start
```

Se abrirá el navegador en [http://localhost:3000](http://localhost:3000). La app consumirá la API en `http://localhost:5001/api` por defecto.

Si tu API corre en otra URL o puerto, crea un archivo `.env` en la **raíz del proyecto** (junto a `package.json`) con:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

Luego vuelve a ejecutar `npm start`.

---

## Resumen rápido

| Paso | Comando / acción |
|------|-------------------|
| 1. Crear BD | `psql -U postgres` → `CREATE DATABASE acme;` |
| 2. Ejecutar script | `psql -U postgres -d acme -f project-api-postgres/init.sql` |
| 3. Configurar API | Editar `project-api-postgres/.env` (DB_*, PORT) |
| 4. Iniciar API | `cd project-api-postgres && npm run dev` |
| 5. Iniciar frontend | Desde la raíz: `npm start` |

---

## Scripts del frontend (Create React App)

- **`npm start`** — modo desarrollo en [http://localhost:3000](http://localhost:3000)
- **`npm test`** — ejecutar tests
- **`npm run build`** — build de producción en la carpeta `build`
