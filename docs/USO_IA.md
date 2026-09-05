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

### 5. Implementacion del modulo de Trivias y Modo en Vivo
Se creo la app Django `quizzes` con el flujo completo de trivias:

- **Modelos** (`quizzes/models.py`): `Trivia`, `Question` (4 opciones, respuesta correcta y puntos), `Attempt` y `Answer` (modo individual), `LiveSession`, `LiveParticipant` y `LiveAnswer` (modo en vivo con PIN).
- **Profesor / Educador**: CRUD de trivias y preguntas, publicar/despublicar trivias, iniciar partida en vivo con PIN de 6 digitos, panel de anfitrion (ver jugadores, controlar preguntas, revelar respuesta, finalizar) y tabla de resultados.
- **Estudiante / Jugador**: listado de trivias publicadas, jugar individualmente (una pregunta a la vez con barra de progreso y puntaje), resultados con revision de respuestas, y modo en vivo: unirse con PIN, responder en tiempo real (sincronizacion por polling JSON) y ver el ranking final.
- **Integracion**: links de navegacion por rol en `base.html`, estadisticas reales en los dashboards (trivias creadas/publicadas, puntos y trivias completadas del estudiante, metricas de trivias en el admin).
- **Datos demo**: script `seed_trivias.py` que crea dos trivias publicadas sobre "Derechos y Dignidad de la Mujer" (5 preguntas) y "Mujeres que Transformaron la Historia" (3 preguntas), ambas del usuario `profemaria`.
- **Verificacion**: se probaron ambos flujos (individual y en vivo con 2 jugadores) con el test client de Django y mediante peticiones HTTP reales al servidor.

## Limitaciones
- El modo en vivo usa polling (JSON cada 2.5s) en lugar de WebSockets; funciona bien para una sala de decenas de jugadores pero no es tiempo real estricto.
- No se generaron tests automatizados como archivos de pruebas formales; la verificacion se realizo mediante scripts de shell interactivos.
- El frontend React sigue siendo un scaffold sin conexion al backend; la aplicacion funcional vive en Django templates.

