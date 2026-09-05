import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getTriviasDocente, saveTriviasDocente, getLeccionesDocente, saveLeccionesDocente, getResultados, clearResultados } from '../data/store'
import { getAllTrivias } from '../data/trivia'

const LETTERS = ['A', 'B', 'C', 'D']

const TAB_R = { icon: 'fa-solid fa-chart-pie', label: 'Resultados' }
const TAB_T = { icon: 'fa-solid fa-list-check', label: 'Trivias' }
const TAB_L = { icon: 'fa-solid fa-book-open', label: 'Lecciones' }

const emptyTrivia = () => ({
  title: '',
  icon: 'ph-fill ph-medal',
  description: '',
  questions: [{ text: '', options: ['', '', '', ''], correct: 0, points: 100, explanation: '' }],
})

export default function Docente() {
  const { user, roleLabel } = useAuth()
  const [tab, setTab] = useState('resultados')

  return (
    <div className="flex flex-1 w-full max-w-[1440px] mx-auto px-container-padding py-6 gap-card-gap">
      <aside className="hidden md:flex flex-col w-[280px] bg-primary rounded-[24px] p-6 text-on-primary flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 left-4 opacity-10"><i className="fa-solid fa-graduation-cap text-6xl"></i></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-lg">
            {(user.firstName?.[0] || 'D').toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-bold leading-tight">{user.firstName} {user.lastName}</div>
            <div className="text-[10px] text-white/70 leading-tight">{roleLabel}</div>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { key: 'resultados', ...TAB_R, active: tab === 'resultados' },
            { key: 'trivias', ...TAB_T, active: tab === 'trivias' },
            { key: 'lecciones', ...TAB_L, active: tab === 'lecciones' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                item.active ? 'bg-white/20 font-semibold' : 'font-medium hover:bg-white/10'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center rounded-md text-xs bg-white/30">
                <i className={item.icon}></i>
              </div>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto bg-amber-400 p-4 rounded-xl text-sm font-semibold">
          <i className="fa-solid fa-lightbulb mr-2"></i> Tu panel docente
        </div>
      </aside>

      <main className="flex-1 flex flex-col gap-6 min-w-0">
        {tab === 'resultados' ? (
          <ResultadosTab />
        ) : tab === 'trivias' ? (
          <TriviasTab />
        ) : (
          <LeccionesTab />
        )}
      </main>
    </div>
  )
}

/* ============================================================
   RESULTADOS
   ============================================================ */

function ResultadosTab() {
  const resultados = getResultados()

  const porEstudiante = {}
  let maxPuntaje = 0
  let totalAciertos = 0
  let totalPreguntas = 0
  ;(resultados.length ? resultados : []).forEach((r) => {
    maxPuntaje = Math.max(maxPuntaje, r.puntaje)
    totalAciertos += r.aciertos
    totalPreguntas += r.total
    const key = r.usuario
    if (!porEstudiante[key]) {
      porEstudiante[key] = { nombre: r.nombre, partidas: 0, puntos: 0, aciertos: 0, total: 0 }
    }
    porEstudiante[key].partidas += 1
    porEstudiante[key].puntos += r.puntaje
    porEstudiante[key].aciertos += r.aciertos
    porEstudiante[key].total += r.total
  })
  const estudiantes = Object.values(porEstudiante).sort((a, b) => b.puntos - a.puntos)

  return (
    <>
      <header>
        <h1 className="text-display font-display text-primary mb-1">Resultados</h1>
        <p className="text-on-surface-variant text-body-md font-body-md">
          Desempeño de tus estudiantes en trivias y contrarrelojes.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon="fa-solid fa-user-graduate" label="Estudiantes" value={resultados.length ? Object.keys(porEstudiante).length : 0} color="text-primary" bg="bg-primary/10" />
        <StatCard icon="fa-solid fa-gamepad" label="Partidas" value={resultados.length} color="text-orange-600" bg="bg-orange-50" />
        <StatCard icon="fa-solid fa-trophy" label="Mejor puntaje" value={maxPuntaje} color="text-amber-600" bg="bg-amber-50" />
      </div>

      {resultados.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 text-center">
          <i className="fa-solid fa-chart-line text-5xl text-slate-300"></i>
          <h3 className="text-lg font-bold text-slate-600 mt-4">Aún no hay resultados</h3>
          <p className="text-sm text-slate-500 mt-1">Cuando los estudiantes jueguen trivias, verás sus resultados aquí.</p>
        </div>
      ) : (
        <>
          <SectionTitle title="Ranking por estudiante" />
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="text-left px-4 py-3">#</th>
                  <th className="text-left px-4 py-3">Estudiante</th>
                  <th className="text-center px-4 py-3">Partidas</th>
                  <th className="text-center px-4 py-3">Aciertos</th>
                  <th className="text-center px-4 py-3">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((e, i) => {
                  const pct = e.total ? Math.round((e.aciertos / e.total) * 100) : 0
                  return (
                    <tr key={e.nombre} className={`${i % 2 ? 'bg-surface-dim' : 'bg-surface-container-lowest'} border-b border-outline-variant/20`}>
                      <td className="px-4 py-3 font-bold text-primary">{i === 0 ? '1º' : i === 1 ? '2º' : i === 2 ? '3º' : i + 1}</td>
                      <td className="px-4 py-3 font-semibold text-slate-700">{e.nombre}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{e.partidas}</td>
                      <td className="px-4 py-3 text-center text-slate-600">{e.aciertos}/{e.total} <span className="text-xs text-slate-400">({pct}%)</span></td>
                      <td className="px-4 py-3 text-center font-bold text-primary">{e.puntos} pts</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <SectionTitle title="Historial detallado" />
          <div className="flex flex-col gap-3">
            {resultados.slice().reverse().map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">{r.nombre?.[0] || '?'}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-700 truncate">{r.nombre} · {r.triviaTitulo}</div>
                  <div className="text-xs text-slate-500">{new Date(r.fecha).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })} · {r.tipo}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-extrabold text-primary">{r.puntaje}</div>
                  <div className="text-[10px] text-slate-400">pts</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-bold text-slate-600">{r.aciertos}/{r.total}</div>
                  <div className="text-[10px] text-slate-400">aciertos</div>
                </div>
                <div className={`text-sm font-bold ${r.precision >= 80 ? 'text-green-600' : r.precision >= 50 ? 'text-amber-600' : 'text-red-500'}`}>{r.precision}%</div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => { if (confirm('¿Eliminar todos los resultados?')) clearResultados(); location.reload() }}
              className="px-5 py-2.5 rounded-full border-2 border-red-400 text-red-600 font-bold text-sm hover:bg-red-50 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <i className="fa-solid fa-trash-can mr-2"></i> Limpiar resultados
            </button>
          </div>
        </>
      )}
    </>
  )
}

/* ============================================================
   TRIVIAS
   ============================================================ */

function TriviasTab() {
  const [trivias, setTrivias] = useState(getAllTrivias())
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState(emptyTrivia())

  const refresh = () => {
    setTrivias(getAllTrivias())
  }

  const startNew = () => {
    setDraft({ ...emptyTrivia(), title: '', questions: [emptyTrivia().questions[0]] })
    setEditing('nueva')
  }

  const save = () => {
    if (!draft.title.trim()) { alert('Escribe un título para la trivia.'); return }
    const cleaned = {
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim() || 'Trivia creada por el docente.',
      questions: draft.questions
        .filter((q) => q.text.trim() && q.options.some((o) => o.trim()))
        .map((q) => ({
          text: q.text.trim(),
          options: q.options,
          correct: q.correct,
          points: Number(q.points) || 100,
          explanation: q.explanation ? q.explanation.trim() : 'Respuesta correcta.',
        })),
    }
    if (cleaned.questions.length === 0) { alert('Agrega al menos una pregunta con opciones.'); return }

    const existing = getTriviasDocente()
    if (editing.startsWith('custom-')) {
      const list = existing.map((t) => (t.id === editing ? cleaned : t))
      saveTriviasDocente(list)
    } else {
      saveTriviasDocente([...existing, { ...cleaned, id: `custom-${Date.now()}` }])
    }
    setEditing(null)
    refresh()
  }

  const remove = (id) => {
    if (!confirm('¿Eliminar esta trivia?')) return
    saveTriviasDocente(getTriviasDocente().filter((t) => t.id !== id))
    refresh()
  }

  const addQuestion = () => {
    setDraft({ ...draft, questions: [...draft.questions, { text: '', options: ['', '', '', ''], correct: 0, points: 100, explanation: '' }] })
  }

  if (editing) {
    return (
      <TriviaEditor
        draft={draft}
        setDraft={setDraft}
        onCancel={() => setEditing(null)}
        onSave={save}
        addQuestion={addQuestion}
      />
    )
  }

  return (
    <>
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display font-display text-primary mb-1">Trivias</h1>
          <p className="text-on-surface-variant text-body-md font-body-md">
            Crea y administra trivias para tus estudiantes. Las tuyas aparecen con la etiqueta "Docente".
          </p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <i className="fa-solid fa-plus"></i> Nueva trivia
        </button>
      </header>

      <div className="flex flex-col gap-4">
        {trivias.map((t) => {
          const isDocente = t.id.startsWith('custom-')
          const ruta = isDocente ? `/juegos/trivia/${t.id}` : `/juegos/${t.id}`
          return (
            <div key={t.id} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
                <i className={t.icon}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-headline-sm font-bold text-slate-700 truncate">{t.title}</h3>
                  {isDocente && <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">Docente</span>}
                </div>
                <p className="text-xs text-slate-500 truncate">{t.description}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 px-2 py-1 rounded-full bg-surface-dim">
                <i className="fa-solid fa-list-ul"></i> {t.questions.length}
              </div>
              {isDocente && (
                <button
                  onClick={() => { setDraft(t); setEditing(t.id) }}
                  className="w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 hover:scale-110 active:scale-95"
                  title="Editar"
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              )}
              {isDocente && (
                <button
                  onClick={() => remove(t.id)}
                  className="w-9 h-9 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 hover:scale-110 active:scale-95"
                  title="Eliminar"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              )}
              <Link
                to={ruta}
                className="px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <i className="fa-solid fa-play mr-2"></i> Jugar
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

function TriviaEditor({ draft, setDraft, onCancel, onSave, addQuestion }) {
  const optsFor = (qi) => draft.questions[qi].options

  return (
    <>
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-display font-display text-primary mb-1">Editor de trivia</h1>
          <p className="text-on-surface-variant text-body-md font-body-md">Completa los datos y las preguntas.</p>
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <Label>Título de la trivia</Label>
        <Input value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} placeholder="Ej: Historia de las mujeres en la ciencia" />
        <Label>Descripción</Label>
        <Textarea value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} placeholder="¿Sobre qué trata esta trivia?" />

        <div className="mt-6">
          <SectionTitle title={`Preguntas (${draft.questions.length})`} />
          {draft.questions.map((q, qi) => (
            <div key={qi} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-4 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-slate-400">Pregunta {qi + 1}</span>
                <button
                  onClick={() => setDraft({ ...draft, questions: draft.questions.filter((_, x) => x !== qi) })}
                  disabled={draft.questions.length === 1}
                  className="text-xs text-red-500 hover:text-red-600 disabled:opacity-30"
                >
                  <i className="fa-solid fa-xmark mr-1"></i> Quitar
                </button>
              </div>
              <Input value={q.text} onChange={(v) => {
                const qs = [...draft.questions]; qs[qi] = { ...qs[qi], text: v }; setDraft({ ...draft, questions: qs })
              }} placeholder="Escribe la pregunta..." />
              {optsFor(qi).map((opt, oi) => (
                <div key={oi} className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${q.correct === oi ? 'bg-green-500 text-white' : 'bg-surface text-slate-500'}`}>{LETTERS[oi]}</span>
                  <Input value={opt} onChange={(v) => {
                    const qs = [...draft.questions]; qs[qi] = { ...qs[qi], options: qs[qi].options.map((x, idx) => (idx === oi ? v : x)) }; setDraft({ ...draft, questions: qs })
                  }} placeholder={`Opción ${LETTERS[oi]}`}
                    extra={(
                      <button
                        onClick={() => { const qs = [...draft.questions]; qs[qi] = { ...qs[qi], correct: oi }; setDraft({ ...draft, questions: qs }) }}
                        className={`text-xs ${q.correct === oi ? 'text-green-600 font-bold' : 'text-slate-400'}`}
                      >
                        {q.correct === oi ? '✓ Correcta' : 'Marcar'}
                      </button>
                    )}
                  />
                </div>
              ))}
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-400">Puntos:</span>
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={q.points}
                  onChange={(e) => { const qs = [...draft.questions]; qs[qi] = { ...qs[qi], points: e.target.value }; setDraft({ ...draft, questions: qs }) }}
                  className="w-24 px-3 py-1.5 rounded-lg border border-outline-variant text-sm"
                />
                <span className="text-xs text-slate-400 mx-1">Explicación (opcional):</span>
                <Input value={q.explanation || ''} onChange={(v) => {
                  const qs = [...draft.questions]; qs[qi] = { ...qs[qi], explanation: v }; setDraft({ ...draft, questions: qs })
                }} placeholder="¿Por qué es correcta?" className="flex-1" />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addQuestion}
          className="mt-4 flex items-center gap-2 text-primary font-bold text-sm hover:scale-105 transition-all duration-200"
        >
          <i className="fa-solid fa-plus-circle"></i> Agregar pregunta
        </button>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 rounded-full border-2 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all duration-200"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="px-8 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <i className="fa-solid fa-check-circle mr-2"></i> Guardar trivia
        </button>
      </div>
    </>
  )
}

/* ============================================================
   LECCIONES DEL DOCENTE
   ============================================================ */

function LeccionesTab() {
  const [lecciones, setLecciones] = useState(getLeccionesDocente())
  const [draft, setDraft] = useState({ title: '', desc: '' })
  const [editing, setEditing] = useState(null)

  const refresh = () => setLecciones(getLeccionesDocente())

  const save = () => {
    if (!draft.title.trim()) { alert('Escribe un título para la lección.'); return }
    const item = { title: draft.title.trim(), desc: draft.desc.trim() || 'Lección creada por el docente.' }
    if (editing) {
      saveLeccionesDocente(getLeccionesDocente().map((l) => (l.id === editing ? { ...item, id: editing } : l)))
    } else {
      saveLeccionesDocente([...getLeccionesDocente(), { ...item, id: `leccion-${Date.now()}`, numero: getLeccionesDocente().length + 1 }])
    }
    setDraft({ title: '', desc: '' })
    setEditing(null)
    refresh()
  }

  const remove = (id) => {
    if (!confirm('¿Eliminar esta lección?')) return
    saveLeccionesDocente(getLeccionesDocente().filter((l) => l.id !== id))
    refresh()
  }

  return (
    <>
      <header>
        <h1 className="text-display font-display text-primary mb-1">Lecciones</h1>
        <p className="text-on-surface-variant text-body-md font-body-md">
          Crea lecciones personalizadas que se mostrarán en el módulo de Lecciones.
        </p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <Label>{editing ? 'Editar lección' : 'Nueva lección'}</Label>
        <Input value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} placeholder="Título de la lección (ej: Derechos laborales de la mujer)" />
        <Label>Descripción</Label>
        <Textarea value={draft.desc} onChange={(v) => setDraft({ ...draft, desc: v })} placeholder="Breve descripción de lo que se verá en la lección." />
        <button
          onClick={save}
          className="mt-2 flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <i className="fa-solid fa-floppy-disk"></i> {editing ? 'Guardar cambios' : 'Guardar lección'}
        </button>
      </div>

      <SectionTitle title={lecciones.length ? `Tus lecciones (${lecciones.length})` : 'Tus lecciones'} />
      {lecciones.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center">
          <i className="fa-solid fa-books text-4xl text-slate-300"></i>
          <p className="text-sm text-slate-500 mt-3">Aún no has creado lecciones. Usa el formulario de arriba.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {lecciones.map((l) => (
            <div key={l.id} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                {l.numero || '•'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-700 truncate">{l.title}</h3>
                <p className="text-xs text-slate-500 truncate">{l.desc}</p>
              </div>
              <button
                onClick={() => { setDraft({ title: l.title, desc: l.desc }); setEditing(l.id) }}
                className="w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200 hover:scale-110 active:scale-95"
                title="Editar"
              >
                <i className="fa-solid fa-pen"></i>
              </button>
              <button
                onClick={() => remove(l.id)}
                className="w-9 h-9 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 hover:scale-110 active:scale-95"
                title="Eliminar"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

/* ============================================================
   COMPONENTES de apoyo
   ============================================================ */

function StatCard({ icon, label, value, color, bg }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-5 flex flex-col gap-2">
      <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center text-xl`}>
        <i className={icon}></i>
      </div>
      <div className="text-3xl font-extrabold text-slate-800">{value}</div>
      <div className="text-xs text-slate-500 font-medium">{label}</div>
    </div>
  )
}

function SectionTitle({ title }) {
  return <h2 className="text-lg font-extrabold text-slate-700">{title}</h2>
}

function Label({ children }) {
  return <label className="block text-sm font-bold text-slate-600 mt-4 mb-1">{children}</label>
}

function Input({ value, onChange, placeholder, extra, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white"
      />
      {extra}
    </div>
  )
}

function Textarea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={2}
      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm bg-white"
    ></textarea>
  )
}