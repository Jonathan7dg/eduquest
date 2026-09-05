# EduQuest 🎮

Plataforma educativa gamificada diseñada para estudiantes de secundaria y docentes. Inspirada en la dinámica de Kahoot, EduQuest transforma el aprendizaje en una experiencia interactiva y motivadora a través de mecánicas de juego. Este repositorio contiene el **primer entregable** del proyecto.

## Stack Tecnológico

| Componente | Tecnología |
|---|---|
| **Backend** | Python + Django 6.0 |
| **Base de datos** | SQLite (desarrollo) |
| **Autenticación** | Django Auth + sesiones + middleware de roles |
| **Frontend** | React + Vite + Tailwind CSS (en progreso) |
| **Estilos** | CSS personalizado + Tailwind |

## Estructura del Proyecto

```
eduquest/
├── accounts/           # App de autenticación y roles
│   ├── migrations/     # Migraciones de Django
│   ├── admin.py        # Configuración del admin
│   ├── forms.py        # Formularios de registro y login
│   ├── models.py       # Modelo User con roles
│   ├── urls.py         # Rutas de la app
│   └── views.py        # Vistas de autenticación y dashboard
├── quizzes/            # App de trivias y modo en vivo
│   ├── migrations/     # Migraciones de Django
│   ├── admin.py        # Registro de modelos en el admin
│   ├── forms.py        # Formularios de trivia, pregunta y PIN
│   ├── models.py       # Trivia, Question, Attempt, Answer, LiveSession, LiveParticipant, LiveAnswer
│   ├── urls.py         # Rutas de la app
│   └── views.py        # CRUD de trivias, modo individual y modo en vivo
├── backend/            # API REST con FastAPI (próximamente)
│   └── app/
│       ├── api/        # Endpoints
│       ├── models/     # Modelos de SQLAlchemy
│       └── core/       # Configuración y utilidades
├── eduquest_project/   # Configuración del proyecto Django
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── frontend/           # Aplicación React + Vite
│   ├── src/
│   ├── index.html
│   └── package.json
├── static/             # Archivos estáticos
│   └── css/
│       └── custom.css
├── templates/          # Templates Django
│   ├── auth/
│   ├── dashboards/
│   ├── includes/
│   └── quizzes/
├── database/           # Migraciones y esquemas
├── docs/               # Documentación y diagramas
├── manage.py           # Punto de entrada de Django
├── setup_demo_users.py # Script para crear usuarios de prueba
├── seed_trivias.py     # Script para crear trivias de demostración
└── README.md
```

## Roles del Sistema

- **Admin**: Gestión completa de usuarios, contenido y configuración.
- **Profesor**: Creación de quizzes, gestión de grupos y seguimiento.
- **Estudiante**: Participación en quizzes, ranking y modo en vivo.

## Instalación

### Requisitos Previos

- Python 3.10+
- Node.js 18+
- Git

### Backend (Django)

```bash
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar Django
pip install django

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Ejecución del Sistema

### Iniciar el Backend

```bash
python manage.py runserver 8000
```

El panel de administración estará disponible en: `http://localhost:8000/admin/`

### Iniciar el Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

## Usuarios de Prueba

Ejecuta los scripts para preparar el sistema:

```bash
python setup_demo_users.py   # Crea usuarios de prueba
python seed_trivias.py       # Crea trivias de demostración (requiere profemaria)
python manage.py migrate     # Aplica las migraciones (si no se ejecutaron)
```

Esto creará:
- Admin: `admin` / `admin123`
- Profesor: `profemaria` / `profe123`
- Estudiante: `estudiantesofia` / `estudiante123`
- Trivias de ejemplo: "Derechos y Dignidad de la Mujer" (5 preguntas) y "Mujeres que Transformaron la Historia" (3 preguntas)

## Rutas Principales del Módulo de Trivias

| Ruta | Rol | Descripción |
|---|---|---|
| `/quizzes/` | Profesor | Lista y gestión de trivias propias |
| `/quizzes/nueva/` | Profesor | Crear trivia |
| `/quizzes/3/` | Profesor | Detalle de trivia, preguntas, publicar y partida en vivo |
| `/quizzes/jugar/` | Estudiante | Trivias publicadas disponibles |
| `/quizzes/jugar/3/` | Estudiante | Jugar trivia individual |
| `/quizzes/vivo/` | Estudiante | Unirse a partida en vivo por PIN |

## Características del Proyecto (Primer Entregable)

- [x] Autenticación de usuarios (registro, login, logout)
- [x] Sistema de roles (Admin, Profesor, Estudiante)
- [x] Dashboards personalizados por rol
- [x] Panel de administración de Django
- [x] CRUD de trivias y preguntas (Profesor)
- [x] Publicación de trivias para estudiantes
- [x] Modo quiz individual con puntaje y revisión de respuestas
- [x] Modo en vivo con PIN estilo Kahoot (sincronización por polling)
- [x] Ranking y resultados de partidas en vivo
- [ ] Sistema de ranking global y medallas — *Fase 2*
- [ ] Modo en vivo con WebSockets (tiempo real estricto) — *Fase 2*
- [ ] API REST — *Fase 2*
