const RESULTS_KEY = 'eduquest_resultados'
const CUSTOM_TRIVIAS_KEY = 'eduquest_trivias_docente'
const CUSTOM_LECCIONES_KEY = 'eduquest_lecciones_docente'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignorar */
  }
  return fallback
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* sin almacenamiento disponible */
  }
}

/* ---------- Resultados ---------- */

export function getResultados() {
  return read(RESULTS_KEY, [])
}

export const RESULTADOS_EVENT = 'eduquest:resultados'

export function addResultado(resultado) {
  const list = getResultados()
  list.push({
    ...resultado,
    fecha: resultado.fecha || new Date().toISOString(),
  })
  write(RESULTS_KEY, list)
  window.dispatchEvent(new Event(RESULTADOS_EVENT))
  return list
}

export function getPuntosUsuario(usuario) {
  return getResultados()
    .filter((r) => r.usuario === usuario)
    .reduce((acc, r) => acc + (r.puntaje || 0), 0)
}

export function getMejorPuntaje(usuario) {
  const puntajes = getResultados()
    .filter((r) => r.usuario === usuario)
    .map((r) => r.puntaje || 0)
  return puntajes.length ? Math.max(...puntajes) : 0
}

export function clearResultados() {
  write(RESULTS_KEY, [])
  window.dispatchEvent(new Event(RESULTADOS_EVENT))
}

/* ---------- Trivias del docente ---------- */

export function getTriviasDocente() {
  return read(CUSTOM_TRIVIAS_KEY, [])
}

export function saveTriviasDocente(trivias) {
  write(CUSTOM_TRIVIAS_KEY, trivias)
  return trivias
}

/* ---------- Lecciones del docente ---------- */

export function getLeccionesDocente() {
  return read(CUSTOM_LECCIONES_KEY, [])
}

export function saveLeccionesDocente(lecciones) {
  write(CUSTOM_LECCIONES_KEY, lecciones)
  return lecciones
}

/* ---------- Progreso de lecciones por estudiante ---------- */

export const PROGRESO_EVENT = 'eduquest:progreso'

const PROGRESO_KEY = 'eduquest_progreso_lecciones'

export function getProgresoLecciones(usuario) {
  const all = read(PROGRESO_KEY, {})
  return all[usuario] || {}
}

export function setEstadoLeccion(usuario, leccionKey, estado) {
  const all = read(PROGRESO_KEY, {})
  const usuarioProgreso = all[usuario] || {}
  if (estado === null) delete usuarioProgreso[leccionKey]
  else usuarioProgreso[leccionKey] = estado
  all[usuario] = usuarioProgreso
  write(PROGRESO_KEY, all)
  window.dispatchEvent(new Event(PROGRESO_EVENT))
  return usuarioProgreso
}