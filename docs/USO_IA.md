# Uso de Inteligencia Artificial en EduQuest

## Asistente utilizado
**OpenCode** (modelo `opencode/big-pickle`) — agente de codigo basado en IA integrado en el entorno de desarrollo.

## Actividades realizadas con IA

### 1. Revision del proyecto
Se solicito a la IA que explorara y analizara la estructura completa del proyecto. La IA identifico:

- Stack tecnologico real vs. el descrito en el README
- Errores de sintaxis en `backend/app/core/config.py` (`ndef` en vez de `def`)
- Archivos placeholder o vacios (`database/`, `docs/`)
- Desconexion entre el frontend React y el backend Django
- Falta de tests, quizzes, y funcionalidades core prometidas
- Problemas de configuracion (puertos duplicados, `.gitignore`)

### 2. Correccion de errores
- Se corrigio el error de sintaxis en `backend/app/core/config.py:` linea 17 cambiando `ndef` a `def`

### 3. Alineacion del README
- Se reescribio el `README.md` completo para reflejar el stack real del proyecto (Django + SQLite + sesiones) en lugar del stack planeado (FastAPI + PostgreSQL + JWT)
- Se actualizaron las instrucciones de instalacion y ejecucion
- Se agregaron los usuarios de prueba y el checklist de caracteristicas

### 4. Gestion del repositorio GitHub
- Se vacio el repositorio `Jonathan7dg/eduquest` en GitHub
- Se inicializo Git localmente, se agrego el remoto, y se subio el proyecto con `git push -f`

## Limitaciones
- La IA no implemento funcionalidades nuevas (quizzes, ranking, API REST)
- El frontend React sigue siendo un scaffold sin conexion al backend
- No se generaron tests automatizados
