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
│   └── dashboards/
├── database/           # Migraciones y esquemas
├── docs/               # Documentación y diagramas
├── manage.py           # Punto de entrada de Django
├── setup_demo_users.py # Script para crear usuarios de prueba
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

Ejecuta el script para crear usuarios de prueba:

```bash
python setup_demo_users.py
```

Esto creará:
- Admin: `admin` / `admin123`
- Profesor: `profesor1` / `profesor123`
- Estudiante: `estudiante1` / `estudiante123`

## Características del Proyecto (Primer Entregable)

- [x] Autenticación de usuarios (registro, login, logout)
- [x] Sistema de roles (Admin, Profesor, Estudiante)
- [x] Dashboards personalizados por rol
- [x] Panel de administración de Django
- [ ] Modo quiz individual y modo en vivo (WebSockets) — *Fase 2*
- [ ] Sistema de puntos y ranking — *Fase 2*
- [ ] API REST — *Fase 2*
