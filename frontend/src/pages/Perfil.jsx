import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const mascotSidebar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZmix6rSV0ddexrvPA0pw12T0v93NFNVaYQzsTUThKv8k6P5zhI3Zj8O4x16j8ISTEqa9vpI6lgLLlfiquAGBdmyzLFcTlaSR8w9XvM70otDL-sZUOPrsVK-WFLeSyBY-ZHncRI6Ll9zaNtlwjnr9Xv_kDrixiQa4teY1thi4eEm8JtECI1jzcfFjLgjxMHLI7FAVipoCp0BMLU4zS1eyyqwdl0f18OnWMqrlN-Nn1Dez5j_7ZGs3Mrpya2Edk00oE'

const navItems = [
  { icon: 'ph-fill ph-user', label: 'Mi perfil', active: true },
  { icon: 'ph ph-trophy', label: 'Mis logros' },
  { icon: 'ph ph-gear', label: 'Configuración' },
  { icon: 'ph ph-bell', label: 'Notificaciones' },
  { icon: 'ph ph-shield-check', label: 'Seguridad' },
  { icon: 'ph ph-question', label: 'Ayuda' },
  { icon: 'ph ph-sign-out', label: 'Cerrar sesión', last: true, logout: true },
]

const subjects = [
  { box: 'á', boxClass: 'bg-primary', name: 'Acentuación', desc: 'Agudas, graves y esdrújulas', pct: 60, fill: 'bg-primary' },
  { box: 'Aa', boxClass: 'bg-blue-600', name: 'Ortografía', desc: 'Reglas y escritura correcta', pct: 45, fill: 'bg-blue-600' },
  { box: 'ph-fill ph-chat-teardrop-dots', boxClass: 'bg-orange-500', name: 'Gramática', desc: 'Estructura de oraciones e idiomas', pct: 70, fill: 'bg-orange-500', icon: true },
  { box: 'ph-fill ph-book-open', boxClass: 'bg-green-500', name: 'Vocabulario', desc: 'Palabras y su significado', pct: 35, fill: 'bg-green-500', icon: true },
  { box: 'ph-fill ph-scale-balanced', boxClass: 'bg-purple-500', name: 'Derechos y Dignidad', desc: 'Derechos de la mujer e igualdad', pct: 80, fill: 'bg-purple-500', icon: true },
  { box: '✚', boxClass: 'bg-rose-500', name: 'Matemáticas', desc: 'Números y operaciones', pct: 50, fill: 'bg-rose-500' },
  { box: 'ph-fill ph-flask', boxClass: 'bg-cyan-600', name: 'Ciencias', desc: 'Naturaleza y experimentos', pct: 40, fill: 'bg-cyan-600', icon: true },
  { box: 'ph-fill ph-palette', boxClass: 'bg-pink-500', name: 'Arte', desc: 'Creatividad y expresión', pct: 65, fill: 'bg-pink-500', icon: true },
]

const visibleSubjects = subjects.filter((s) => !['Derechos y Dignidad', 'Matemáticas', 'Ciencias', 'Arte'].includes(s.name))

const stats = [
  { icon: 'ph-fill ph-game-controller', circle: 'bg-blue-100 text-blue-600', value: '28', label: 'Juegos jugados', valueColor: 'text-blue-600' },
  { icon: 'ph-fill ph-book-open', circle: 'bg-primary/10 text-primary', value: '15', label: 'Lecciones completadas', valueColor: 'text-primary' },
  { icon: 'ph-fill ph-star', circle: 'bg-orange-100 text-accent-orange', value: '1250', label: 'Estrellas ganadas', valueColor: 'text-accent-orange' },
  { icon: 'ph-fill ph-target', circle: 'bg-green-100 text-accent-green', value: '92%', label: 'Puntaje promedio', valueColor: 'text-accent-green' },
]

const badges = [
  { box: 'bg-primary', icon: 'ph-fill ph-pencil-simple', title: 'Escritor novato', date: '10/05/2024', extra: null },
  { box: 'bg-blue-500', icon: 'ph-fill ph-compass', title: 'Explorador de palabras', date: '12/05/2024', extra: null },
  { box: 'bg-accent-yellow', icon: 'ph-fill ph-trophy', title: '¡Primera estrella!', date: '15/05/2024', extra: null },
  { box: 'bg-teal-500', icon: 'ph-fill ph-calendar', title: 'Constante', subtitle: '7 días seguidos', date: '18/05/2024', extra: '7' },
]

const activities = [
  { icon: 'ph-fill ph-book-open', circle: 'bg-primary/20 text-primary', text: 'Completaste la lección "Palabras graves"', time: 'Hoy, 10:30 a.m.' },
  { icon: 'ph-fill ph-game-controller', circle: 'bg-blue-100 text-blue-600', text: 'Jugaste "Acentos en acción"', time: 'Hoy, 09:15 a.m.' },
  { icon: 'ph-fill ph-star', circle: 'bg-orange-100 text-accent-orange', text: 'Ganaste 20 estrellas', time: 'Ayer, 04:45 p.m.' },
  { icon: 'ph-bold ph-check', circle: 'bg-green-100 text-accent-green', text: 'Completaste la lección "Palabras agudas"', time: 'Ayer, 03:20 p.m.' },
]

export default function Perfil() {
  const { user, roleLabel, logout } = useAuth()
  const navigate = useNavigate()
  const displayName = user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username : 'Visitante'
  const initials = user ? (user.firstName || user.username)[0].toUpperCase() : 'E'
  const roleShort = user ? (user.role === 'PROFESOR' ? 'Profesor' : user.role === 'ADMIN' ? 'Administrador' : 'Estudiante') : 'Estudiante'
  const email = user?.email || 'usuario@eduquest.com'
  const institution = user?.institution || 'Sin institución'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState(displayName)
  const [showAllSubjects, setShowAllSubjects] = useState(false)
  const [showGoals, setShowGoals] = useState(false)
  const [infoMsg, setInfoMsg] = useState('')

  const startEdit = () => {
    setNameInput(displayName)
    setEditing(true)
    setInfoMsg('')
  }

  const saveName = () => {
    setEditing(false)
    setInfoMsg('Nombre actualizado correctamente.')
  }

  const handleNav = (item) => {
    if (item.logout) return handleLogout()
    setInfoMsg(`Sección "${item.label}" próximamente disponible.`)
  }

  const shownSubjects = showAllSubjects ? subjects : visibleSubjects

  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="sidebar-bg w-72 text-white p-6 flex flex-col gap-6 shrink-0 overflow-y-auto hidden md:flex">
          {/* Profile Widget */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-3xl bg-primary-light border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative mb-4 transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 opacity-20 bg-[#634897] rounded-full blur-xl"></div>
              <span className="text-5xl font-extrabold text-white z-10">{initials}</span>
            </div>
            <h2 className="text-xl font-bold">{displayName}</h2>
            <p className="text-white/80 text-sm mb-3">{roleShort}</p>
            <div className="bg-primary-dark/50 px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-semibold transition-transform duration-200 hover:scale-105">
              <i className="ph-fill ph-star text-accent-yellow"></i> Nivel 5
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex flex-col gap-1 mt-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(item)
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                  item.active
                    ? 'bg-white text-primary font-bold shadow-sm'
                    : 'text-white/90 hover:bg-white/10 font-semibold'
                } ${item.last ? 'mt-auto' : ''} ${item.logout ? '!text-red-300 hover:!bg-red-500/20' : ''}`}
              >
                <i className={`${item.icon} text-lg`}></i> {item.label}
              </a>
            ))}
          </nav>
          {/* Motivation Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mt-auto border border-white/20 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative z-10 w-2/3">
              <h4 className="font-bold text-white mb-1">¡Sigue así!</h4>
              <p className="text-xs text-white/80 leading-tight">Cada día aprendes algo nuevo.</p>
            </div>
            <i className="ph-fill ph-star absolute right-2 bottom-2 text-accent-yellow text-5xl opacity-90 rotate-12"></i>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-surface">
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column */}
              <div className="flex flex-col gap-6 w-full lg:w-[45%]">
                {/* Profile Card */}
                <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <h1 className="text-3xl font-extrabold text-primary mb-1">Mi perfil</h1>
                  <p className="text-slate-500 text-sm mb-6">Gestiona tu información y sigue tu aprendizaje.</p>
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div className="w-28 h-28 shrink-0 rounded-full bg-primary/10 border-4 border-primary/20 overflow-hidden flex items-center justify-center">
                      <span className="text-5xl font-extrabold text-primary animate-float">{initials}</span>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex items-center gap-2">
                        {editing ? (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              saveName()
                            }}
                            className="flex items-center gap-2"
                          >
                            <input
                              value={nameInput}
                              onChange={(e) => setNameInput(e.target.value)}
                              className="w-44 text-sm font-bold text-slate-800 border-b-2 border-primary focus:outline-none"
                              aria-label="Nombre"
                            />
                            <button type="submit" className="text-primary hover:text-primary-dark transition-colors" title="Guardar">
                              <i className="ph-fill ph-check text-sm"></i>
                            </button>
                            <button type="button" onClick={() => setEditing(false)} className="text-slate-400 hover:text-slate-500 transition-colors" title="Cancelar">
                              <i className="ph-fill ph-x text-sm"></i>
                            </button>
                          </form>
                        ) : (
                          <>
                            <h2 className="text-xl font-bold text-slate-800">{displayName}</h2>
                            <button onClick={startEdit} className="text-slate-400 hover:text-primary transition-colors" title="Editar nombre">
                              <i className="ph ph-pencil-simple text-sm"></i>
                            </button>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <i className="ph ph-envelope-simple text-slate-400 text-lg"></i> {email}
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ph ph-student text-slate-400 text-lg"></i> {roleShort} · {institution}
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ph ph-calendar-blank text-slate-400 text-lg"></i> Miembro desde: 12/03/2024
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={startEdit}
                    className="w-full sm:w-auto mt-6 px-6 py-2.5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto sm:mx-0"
                  >
                    <i className="ph ph-pencil-simple text-lg"></i> {editing ? 'Editando...' : 'Editar perfil'}
                  </button>
                  {infoMsg && (
                    <div className="mt-4 w-full bg-primary/10 text-primary text-sm font-semibold px-4 py-2.5 rounded-2xl flex items-center gap-2 animate-pulse">
                      <i className="ph-fill ph-info text-base"></i> {infoMsg}
                    </div>
                  )}
                </section>

                {/* Subjects Card */}
                <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-6">Mis materias</h3>
                  <div className="flex flex-col gap-5">
                    {shownSubjects.map((subject) => (
                      <Link
                        key={subject.name}
                        to="/lecciones"
                        className="flex items-center gap-4 transition-transform duration-200 hover:translate-x-2 cursor-pointer"
                      >
                        <div className={`w-12 h-12 rounded-2xl ${subject.boxClass} text-white flex items-center justify-center text-xl font-bold shrink-0 shadow-md`}>
                          {subject.icon ? <i className={subject.box}></i> : subject.box}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 text-sm">{subject.name}</h4>
                          <p className="text-xs text-slate-500">{subject.desc}</p>
                        </div>
                        <div className="w-24 progress-bar-track h-2">
                          <div className={`progress-bar-fill ${subject.fill}`} style={{ width: `${subject.pct}%` }}></div>
                        </div>
                        <div className="font-bold text-primary text-sm w-10 text-right">{subject.pct}%</div>
                        <i className="ph ph-caret-right text-slate-400"></i>
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllSubjects((s) => !s)}
                    className="mt-6 text-primary font-bold text-sm flex items-center gap-1 hover:underline transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    {showAllSubjects ? 'Ver menos materias' : `Ver todas las materias (${subjects.length})`} <i className={`ph ${showAllSubjects ? 'ph-caret-up' : 'ph-caret-right'}`}></i>
                  </button>
                </section>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6 w-full lg:w-[55%]">
                {/* Level Card */}
                <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden flex items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex-1 z-10 relative">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-primary">Mi nivel</h3>
                      <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Nivel 5</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-6">¡Vas por un excelente camino!</p>
                    <div className="flex items-center gap-3 mb-2 pr-32">
                      <i className="ph-fill ph-star text-accent-yellow text-3xl shrink-0"></i>
                      <div className="flex-1 progress-bar-track h-4 relative">
                        <div className="progress-bar-fill bg-primary" style={{ width: '70%' }}></div>
                      </div>
                      <span className="font-bold text-slate-800 text-sm shrink-0">850 / 1200 XP</span>
                    </div>
                    <p className="text-xs text-slate-500 ml-11">Siguiente nivel: 350 XP más</p>
                  </div>
                  <div className="w-32 h-32 absolute right-0 bottom-0 z-0 opacity-20 bg-primary rounded-full blur-3xl"></div>
                  <img alt="Mascot" className="w-24 h-24 object-contain absolute right-3 bottom-2 z-10 opacity-90 animate-float" src={mascotSidebar} />
                </section>

                {/* Stats Row */}
                <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default"
                    >
                      <div className={`w-12 h-12 rounded-full ${stat.circle} flex items-center justify-center text-2xl mb-2`}>
                        <i className={stat.icon}></i>
                      </div>
                      <span className={`text-2xl font-extrabold ${stat.valueColor}`}>{stat.value}</span>
                      <span className="text-xs text-slate-500 font-medium mt-1">{stat.label}</span>
                    </div>
                  ))}
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Achievements */}
                  <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-primary">Mis logros recientes</h3>
                      <button onClick={() => setInfoMsg('Galería completa de logros próximamente.')} className="text-xs text-primary font-bold hover:underline flex items-center gap-1 transition-transform duration-200 hover:scale-105 active:scale-95">
                        Ver todos <i className="ph ph-caret-right"></i>
                      </button>
                    </div>
                    <div className="flex justify-between gap-2">
                      {badges.map((badge) => (
                        <div key={badge.title} className="flex flex-col items-center text-center w-1/4 transition-transform duration-200 hover:scale-110 cursor-default">
                          <div className={`w-12 h-14 ${badge.box} rounded-t-lg rounded-b-xl flex items-center justify-center relative mb-2 shadow-md`}>
                            {badge.extra && (
                              <i className="ph-fill ph-sparkle text-eduyellow absolute -top-1 -left-1 text-[10px]"></i>
                            )}
                            <i className={`${badge.icon} text-white text-xl`}></i>
                            {badge.extra && (
                              <span className="absolute text-white font-bold text-xs mt-1">{badge.extra}</span>
                            )}
                          </div>
                          <span className="text-[10px] font-bold text-slate-700 leading-tight">{badge.title}</span>
                          <span className="text-[9px] text-slate-400 mt-1">{badge.date}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Recent Activity */}
                  <section className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-primary">Actividad reciente</h3>
                      <button onClick={() => setInfoMsg('Historial completo de actividad próximamente.')} className="text-xs text-primary font-bold hover:underline flex items-center gap-1 transition-transform duration-200 hover:scale-105 active:scale-95">
                        Ver todas <i className="ph ph-caret-right"></i>
                      </button>
                    </div>
                    <div className="flex flex-col gap-3 flex-1 justify-center">
                      {activities.map((act) => (
                        <div key={act.text} className="flex items-center gap-3 transition-transform duration-200 hover:translate-x-1 cursor-default">
                          <div className={`w-6 h-6 rounded-full ${act.circle} flex items-center justify-center text-xs shrink-0`}>
                            <i className={act.icon}></i>
                          </div>
                          <p className="text-xs text-slate-700 flex-1 truncate">{act.text}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{act.time}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Goals Banner */}
            <section className="bg-[#fff8e1] rounded-3xl p-4 border border-orange-200 flex items-center justify-between relative overflow-hidden mt-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <i className="ph-fill ph-trophy text-accent-yellow text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-orange-900 text-sm">¡Meta personal!</h4>
                  <p className="text-xs text-orange-800">Completa 5 lecciones esta semana.</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8 z-10 relative">
                <span className="font-bold text-orange-900 text-sm">3 / 5</span>
                <div className="flex-1 progress-bar-track h-2 bg-orange-200">
                  <div className="progress-bar-fill bg-accent-orange" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="flex items-center gap-4 z-10 relative">
<button
                    onClick={() => setShowGoals((s) => !s)}
                    className="bg-white text-orange-600 font-bold text-xs px-4 py-2 rounded-full border border-orange-200 hover:bg-orange-50 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    {showGoals ? 'Ocultar metas' : 'Ver mis metas'}
                  </button>
                </div>
                {showGoals && (
                  <div className="mt-3 bg-white/90 rounded-2xl p-3 shadow-sm z-10 relative">
                    <p className="text-xs font-bold text-orange-900 mb-1">Tu meta de la semana</p>
                    <ul className="list-disc pl-4 text-xs text-orange-800 space-y-1">
                      <li>Completa 5 lecciones esta semana. <span className="font-bold">3 / 5</span></li>
                      <li>Gana 100 estrellas en juegos.</li>
                      <li>Alcanza el logro "Constante" (7 días seguidos).</li>
                    </ul>
                  </div>
                )}
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
