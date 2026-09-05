# EduQuest — Resumen Técnico y Especificación de Tecnologías para Defensa (PF)

> Documento de estudio preparado para la defensa del Proyecto Final.
> Cubre: qué es el proyecto, arquitectura, cada tecnología usada y por qué, y
> preguntas frecuentes de jurado con respuestas listas.

---

## 1. ¿Qué es EduQuest?

**EduQuest** es una **plataforma educativa gamificada** para estudiantes de
secundaria y docentes, inspirada en **Kahoot**. Convierte el aprendizaje en
juego: los estudiantes responden trivias (quizzes) de temas educativos
(igualdad de género, derechos de la mujer, mujeres en la historia) y ganan
puntos y estrellas.

### Propósito
- Motivación del estudiante mediante mecánicas de juego (puntos, estrellas,
  contrarreloj).
- Herramienta para que el **docente** cree y publique trivias.
- Seguimiento del **progreso** de cada estudiante.

### Roles del sistema
| Rol | Funciones |
|---|---|
| **Admin** | Gestión completa de usuarios, contenido y configuración. |
| **Profesor / Educador** | Creación de quizzes, gestión de grupos y seguimiento. |
| **Estudiante / Jugador** | Participación en quizzes, ranking y modo en vivo. |

---

## 2. Arquitectura general

EduQuest usa una arquitectura **cliente–servidor** (frontend y backend
separados):

```
┌───────────────────┐        HTTP/JSON        ┌────────────────────┐
│   FRONTEND (SPA)  │  ────────────────────►  │   BACKEND          │
│   React + Vite    │                         │   Django (+SQLite) │
│   + Tailwind      │  ◄────────────────────  │   + FastAPI (API)  │
└───────────────────┘                         └────────────────────┘
        │                                             │
        └─ localStorage (sesión local)                └─ Base de datos
```

- **SPA (Single Page Application)**: el frontend carga una sola página HTML y
  el resto se renderiza en el navegador sin recargar.
- **Backend con Django**: lógica de autenticación, roles, trivias y modo en
  vivo (vistas + templates).
- **API REST (FastAPI, en `backend/`)**: capa de servicios expuesta por
  endpoints JSON, con migraciones (Alembic) y base de datos SQLAlchemy.
- La sesión del frontend React se maneja de forma **local** (localStorage)
  con usuarios de demostración.

### Estructura de carpetas (root)
```
eduquest/
├── accounts/           # App Django de autenticación y roles (User personalizado)
├── quizzes/            # App Django de trivias y modo en vivo (Kahoot)
├── backend/            # API REST con FastAPI (SQLAlchemy, JWT, Alembic)
├── eduquest_project/   # Configuración de Django (settings, urls, wsgi)
├── frontend/           # Aplicación React + Vite + Tailwind
│   └── src/
│       ├── pages/       # Inicio, Juegos, Lecciones, Perfil, Login, Register, Trivia, TriviaTimer
│       ├── components/  # Navbar, Footer
│       ├── context/     # AuthContext (sesión local)
│       ├── data/        # trivia.js (datos de las trivias)
│       └── assets/      # imágenes (logos, mascota)
├── database/           # Esquemas / migraciones
├── docs/               # Documentación
├── manage.py           # Punto de entrada de Django
├── seed_trivias.py     # Script: carga trivias de demostración
└── setup_demo_users.py # Script: crea usuarios de prueba
```

---

## 3. Tecnologías por capa

### 3.1 Frontend (lo que se ve y se juega)

#### React 18 (`react`, `react-dom` ^18.3)
Biblioteca de JavaScript para construir **interfaces de usuario por
componentes**. En EduQuest se usa para renderizar cada pantalla.

**Conceptos clave para defender:**
- **Componentes**: bloques reutilizables (ej. `Navbar`, `Footer`, `Trivia`).
- **JSX**: sintaxis que mezcla HTML y JavaScript (`const el = <h1>Hola</h1>`).
- **Props**: datos que el padre pasa al hijo.
- **Estado (state)**: datos que cambian y redibujan la pantalla.
- **Hooks**: funciones de React:
  - `useState` → guardar estado (puntaje, pregunta actual).
  - `useEffect` → efectos secundarios (el cronómetro de la trivia).
  - `useParams` → leer parámetro de la URL (ej. el `id` de la trivia).
- **Context API** (`AuthContext`): estado global compartido (usuario logueado)
  accesible desde cualquier componente con `useAuth()`.

#### Vite 5 (bundler / dev server)
Herramienta de compilación y servidor de desarrollo.
- **Dev server con HMR** (Hot Module Replacement): al guardar un archivo, el
  navegador se actualiza al instante sin recargar la página.
- **Build de producción**: genera archivos estáticos optimizados en `dist/`
  (JS/CSS minificados, imágenes con hash).

#### React Router DOM 6 (`react-router-dom`)
Enrutador de React para **SPA**.
- Define rutas como `/`, `/juegos`, `/login`, `/juegos/trivia-dignidad`.
- `Link` para navegar sin recargar la página.
- `useParams` para rutas dinámicas (`/juegos/trivia-igualdad`).
- Rutas protegidas: `RequireGuest` redirige al inicio si ya hay sesión.

#### Tailwind CSS 3
Framework de estilos **utility-first**: en lugar de escribir CSS suelto, se
usan clases directamente en el HTML/JSX.
```jsx
<button className="px-10 py-3 rounded-full bg-primary text-white font-bold">
```
- Clases utilitarias (flex, grid, p-4, rounded-3xl...).
- Configuración de la marca en `tailwind.config.js` (colores: `primary`,
  `secondary`, `accent-yellow`, etc.).

#### Diseño / Identidad visual
- Paleta: `primary` `#4c35de` (violeta), `secondary`, `eduyellow` `#ffdc04`,
  `accent-yellow` `#ffc107`, `accent-orange` `#ff9800`, `accent-green`
  `#4caf50`, `eduprimary` `#634897`, `edusecondary` `#1d71b8`, `eduorange`
  `#f7a82d`; la pantalla de lecciones usa azul `#0054cd`.
- Iconos: **Phosphor** (`ph ph-*`, `ph-fill ph-*`), **Font Awesome**
  (`fa-solid fa-*`) y **Material Symbols**.
- Mascota "Edu" e imágenes en `src/assets/` (importadas, no desde carpeta
  pública).

#### Páginas implementadas (frontend React)
| Página | Archivo | Qué hace |
|---|---|---|
| Inicio | `Inicio.jsx` | Landing page con hero y características. |
| Juegos | `Juegos.jsx` | Grilla de tarjetas de juegos/trivias. |
| Lecciones | `Lecciones.jsx` | Contenido de lecciones (diseño Pantalla 2). |
| Perfil | `Perfil.jsx` | Datos del usuario, materias, nivel, logros. |
| Login / Registro | `Login.jsx`, `Register.jsx` | Autenticación con sesión local. |
| Trivia normal | `Trivia.jsx` | Quiz clásico con puntos fijos y estrellas. |
| Trivia contrarreloj | `TriviaTimer.jsx` | Quiz **cronometrado**: puntos por velocidad. |

#### Mecánica del modo contrarreloj (TriviaTimer)
- **15 segundos** por pregunta (cronómetro con barra de progreso).
- Colores de la barra: verde > amarillo > rojo según el tiempo restante.
- **Puntos por tiempo**: `bonus = ceil(tiempo_restante / 15 * 100)`.
- Si se agota el tiempo, la pregunta se marca como fallida y se muestra la
  respuesta correcta con explicación.
- Resultado final: estrellas (0–3), aciertos, precisión y total de bonus.

#### Datos de trivias (`src/data/trivia.js`)
Estructura:
```js
{ id, title, icon, description,
  questions: [
    { text, options[4], correct, points, explanation }
  ] }
```
Trivias actuales:
1. **Derechos y Dignidad de la Mujer** (5 preguntas).
2. **Mujeres que Transformaron la Historia** (3 preguntas).
3. **Igualdad de Género y Dignidad de la Mujer** (10 preguntas).

Las respuestas correctas están **distribuidas en posiciones distintas**
(no siempre la primera opción).

#### Autenticación local (frontend)
`AuthContext.jsx` maneja la sesión **sin backend**:
- Usuarios demo en `localStorage` (clave `eduquest_users`).
- Sesión activa en `localStorage` (clave `eduquest_session`).
- Funciones: `login`, `register`, `logout`.
- Usuarios demo: `admin/admin123`, `profemaria/profe123`,
  `estudiantesofia/estudiante123`.

---

### 3.2 Backend (Django)

#### Django
Framework web de Python **full-stack** (vistas + templates + ORM + admin).
- **ORM** (Object Relational Mapper): las tablas se definen como clases Python
  y Django genera el SQL.
- **Panel de administración** (`/admin/`): interfaz ya hecha para gestionar
  usuarios y trivias.
- **Migraciones**: `python manage.py migrate` sincroniza el esquema.

#### Modelo de Usuario personalizado (`accounts/models.py`)
`User(AbstractUser)` (extiende el usuario estándar de Django) agregando:
- `role` → `ADMIN`, `PROFESOR`, `ESTUDIANTE`.
- `institution` → escuela/institución.
- Métodos helper: `is_profesor()`, `is_estudiante()`, `is_admin_role()`.
- Configurado con `AUTH_USER_MODEL = 'accounts.User'` en settings.

#### App `quizzes` (módulo de trivias en Django)
Modelos: `Trivia`, `Question`, `Attempt`, `Answer`, `LiveSession`,
`LiveParticipant`, `LiveAnswer`.
- **CRUD de trivias** (profesor).
- **Modo individual** con puntaje y revisión.
- **Modo en vivo estilo Kahoot** con PIN (sincronización por polling).

#### Base de datos
| Entorno | Motor | Driver |
|---|---|---|
| Desarrollo | **SQLite** (archivo `db.sqlite3`) | nativo de Django |
| Producción (previsto) | **PostgreSQL** | `psycopg2` |

- SQLite: base ligera, sin servidor, ideal para desarrollo y demostración.

---

### 3.3 API REST (FastAPI — `backend/`)

Capa de servicios planificada/parcial para exponer el sistema como API JSON.

| Paquete | Función |
|---|---|
| `fastapi` 0.115 | Framework web moderno y rápido para APIs (async). |
| `uvicorn` | Servidor ASGI que ejecuta FastAPI. |
| `sqlalchemy` 2.0 | ORM de Python para la base de datos. |
| `alembic` | Sistema de migraciones de SQLAlchemy. |
| `python-jose[cryptography]` | Generación/validación de **tokens JWT** (JSON Web Token). |
| `passlib[bcrypt]` | **Hash de contraseñas** (bcrypt). |
| `python-dotenv` | Variables de entorno desde archivo `.env`. |
| `python-multipart` | Procesar formularios/multipart en la API. |
| `websockets` | Comunicación en tiempo real (modo en vivo, Fase 2). |
| `psycopg2-binary` | Driver de PostgreSQL. |
| `pydantic-settings` | Configuración tipada con validación. |

**Conceptos clave:**
- **REST**: arquitectura con recursos y verbos HTTP (GET/POST/PUT/DELETE).
- **JWT**: token firmado que el cliente envía para autenticarse.
- **bcrypt**: algoritmo de hash para almacenar contraseñas de forma segura.

---

## 4. Glosario rápido para la defensa

| Término | Qué significa |
|---|---|
| **SPA** | Single Page Application: una sola página que se actualiza sin recargar. |
| **Bundler** | Programa que combina y optimiza el código fuente (Vite). |
| **HMR** | Hot Module Replacement: recarga solo lo que cambió en desarrollo. |
| **JSX** | Extensión de JS que permite escribir HTML dentro de React. |
| **Componente** | Pieza de UI reutilizable (función que devuelve JSX). |
| **Hook** | Función especial de React para estado y efectos. |
| **Context API** | Forma de compartir estado global sin pasar props una a una. |
| **Props** | Parámetros de entrada de un componente. |
| **Estado (state)** | Dato que, al cambiar, vuelve a dibujar la UI. |
| **Ruta dinámica** | Ruta con parámetro, ej. `/juegos/trivia-igualdad`. |
| **ORM** | Mapeo objeto-relacional: tablas ↔ clases Python. |
| **Migración** | Script que aplica cambios al esquema de la base de datos. |
| **Modelo** | Clase que representa una tabla en el ORM. |
| **REST / API REST** | Estilo de API basado en recursos y verbos HTTP. |
| **JWT** | Token firmado para autenticación sin estado en servidor. |
| **bcrypt** | Función de hash para guardar contraseñas de forma segura. |
| **Polling** | El cliente pregunta al servidor periódicamente por novedades. |
| **Gamificación** | Aplicar mecánicas de juego (puntos, estrellas) al aprendizaje. |

---

## 5. Preguntas frecuentes de jurado (con respuesta)

**Q: ¿Por qué React y no HTML/CSS/JS puro?**
R: React permite construir componentes reutilizables, manejar estado de forma
declarativa y actualizar la UI de forma eficiente (Virtual DOM) sin recargar la
página, ideal para una experiencia tipo Kahoot.

**Q: ¿Qué es Vite y qué aporta?**
R: Es el servidor de desarrollo y empaquetador (bundler). Da HMR (recarga en
caliente) en desarrollo y genera una build optimizada para producción.

**Q: ¿Qué es un componente en React?**
R: Una función (o clase) que recibe `props` y devuelve JSX. Ejemplo: `Navbar`,
`Trivia`. Se reutilizan para mantener el código ordenado.

**Q: ¿Qué diferencia hay entre estado y props?**
R: Las `props` las pasa el padre y son de solo lectura; el `state` es interno
del componente y puede cambiar, provocando que se redibuje.

**Q: ¿Qué hace `useEffect` en la trivia contrarreloj?**
R: Maneja el cronómetro: cada segundo reduce el tiempo restante; cuando llega a
0, pasa a la retroalimentación. Se limpia el intervalo al cambiar de pregunta
para no acumular temporizadores.

**Q: ¿Cómo se calculan los puntos por tiempo?**
R: Cada pregunta da 100 puntos base más un bonus según la rapidez:
`bonus = ceil(tiempo_restante / 15 * 100)`, es decir, hasta 200 puntos si se
responde al instante.

**Q: ¿Qué es la Context API y dónde se usa?**
R: Es un estado global. `AuthContext` guarda al usuario logueado y expone
`login`, `register` y `logout`; cualquier página lo consume con `useAuth()`.

**Q: ¿Cómo funciona la autenticación?**
R: En el frontend React usamos sesión local con `localStorage`. En el backend
Django se usa la autenticación por sesiones con roles (Admin/Profesor/
Estudiante). La API FastAPI prevé tokens JWT.

**Q: ¿Por qué SQLite?**
R: Porque es una base de archivo ligera, sin servidor, que basta para
desarrollar y demostrar el sistema; para producción se prevé PostgreSQL.

**Q: ¿Qué es el ORM de Django?**
R: Permite trabajar con la base de datos usando objetos Python en vez de SQL.
Ejemplo: `User.objects.filter(role='PROFESOR')`.

**Q: ¿Qué es una migración?**
R: Un archivo generado por Django que describe cambios al esquema (crear
tablas, columnas) y se aplica con `python manage.py migrate`.

**Q: ¿Qué roles maneja el sistema?**
R: Administrador, Profesor/Educador y Estudiante/Jugador. El modelo `User`
extiende a Django agregando el campo `role`.

**Q: ¿Qué es un JWT?**
R: JSON Web Token: un token firmado que el cliente envía en cada petición para
demostrar quién es, sin que el servidor guarde sesión.

**Q: ¿Cómo se protegen las contraseñas?**
R: Con **hash** (bcrypt en la API): se guarda el hash, nunca la contraseña en
texto plano.

**Q: ¿Qué es la gamificación aplicada aquí?**
R: Uso de puntos, estrellas, aciertos, contrarreloj y bonus por rapidez para
motivar el aprendizaje, como en Kahoot.

---

## 6. Comandos útiles (para la demostración)

```bash
# Frontend
cd frontend
npm install        # instala dependencias
npm run dev        # dev server en http://localhost:5173
npm run build      # build de producción en frontend/dist

# Backend Django
python manage.py migrate            # aplicar migraciones
python manage.py runserver 8000     # servidor en http://localhost:8000
python manage.py createsuperuser    # crear admin de Django
python setup_demo_users.py          # usuarios demo
python seed_trivias.py              # cargar trivias de ejemplo

# API FastAPI (backend/)
# (usando el venv de backend) uvicorn main:app --reload
```
