import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMejorPuntaje, getPuntosUsuario, RESULTADOS_EVENT } from '../data/store'

const mascotGreeting =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDTumxtcCz48NnNVkjJLmGc31zQJZ8LBXSLKH6peAlOFebh60bUTB21_e9aeqF4Vyy-44mKf3E9jESt9iZUhx02hQD_F3u-PgoUeg8I-ASzaK7uOr3Ilqc3IZ-MU7AMKOxFdBcG8XKgUux2ONq0u0-gD1l1tmnU9NanCvskSSGeUBrcP-YbE4mrldVEOmoWZ5bUTjEedovkXGKO4Z5grV-UvmEgrLbgrspuHCggzUFZmNCRqfumlvTyAkmDSp-OOPjxzILWYxKld-84'
const mascotAirplane =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBXAtPjBcpRSPzfjZujvAxT-eSUGKrCKLpiIlvWy7vF7bkW-OWGCvwgV8cskRvrdJ2ApAEGc0MpdldrnOJtgJQ7-dLzYemmzIMmBmnnlfj-XZmn82vFYc1Hun7BvZYw9GBRvGBIZuTGTxV_-XZZ3piSvJP3810_xMB2mBSCkoH2DssoeGBPIzyGyAw8fjqM69115H-rpLN7flkFvzboW4hZ1o9zNvNa-ODqRAy2PiffmOfDYCrTqI6ppacM_hEIm2r5eumLAbeWgfyv'
const explorer =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmZf9-bRPOm5hJ0JrrlviG2rwZWkUD1BVZrilAvwVh9u2sMfg4ak5jbQGoCXYzf-JBMX9JHjeiIOF_6biea9OcHa7B7YJE97UrylhN3kC6ZGwp0SLwEcW5HlMd140SCLjjf8yVM_TuXtuiuNf5yhDggG0nQNTU2VP7H1BKW2C6KIDXHfkYeIZ-gK7P8rehX2iNl4K0lariDiIPEYJpVAgRqZahPqDHLQoAq8ZMdiVOBg9XSt6VyS8sz8_iNkSJheBR-w3B8NjMd4tG'
const happyStar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDoUFAzIZ_TXl-MVO__PtTSr4WyGbEUpkJlw1Mgr8Uu6LYGCeLmi5yiYkqOcNRseBI5v59jo-k-PAKHvF4LHba_R3bh4JnD6rYlK27ykr-MVl9uMH47DT3kklA90DhVt_1qZ92UC-do2bY-hLQiMg4aweEOYNPCJCAq88GkAACg-82cDsJ225auKYjvwcx3q6EIQ7VkQ3EilofOJK_IWOgaMrCgm6A73oTdwHzFNQmuDkKLPO1jVq8'

const categories = [
  { icon: 'fa-solid fa-gamepad', label: 'Todos los juegos', active: true },
  { icon: 'fa-solid fa-scale-balanced', label: 'Derechos y Dignidad', spotlight: true, to: '/juegos/trivia-dignidad' },
  { icon: 'fa-solid fa-venus-mars', label: 'Igualdad de Género', spotlight: true, to: '/juegos/trivia-igualdad' },
]

const otherCategories = [
  { to: '/juegos/lengua', label: 'Lengua y Lectura', icon: 'fa-solid fa-book-open' },
  { to: '/juegos', label: 'Matemáticas', icon: 'fa-solid fa-calculator' },
  { to: '/juegos', label: 'Ciencias', icon: 'fa-solid fa-flask' },
  { to: '/juegos', label: 'Arte y Creatividad', icon: 'fa-solid fa-palette' },
  { to: '/juegos', label: 'Historia y Sociedad', icon: 'fa-solid fa-earth-americas' },
]

const gameData = [
  {
    to: '/juegos/trivia-dignidad',
    badge: 'Destacado',
    badgeClass: 'bg-secondary',
    titleLine1: 'Dignidad de',
    titleLine2: 'la mujer',
    titleClass: 'text-primary',
    desc: 'Trivia sobre derechos humanos, igualdad de género y vida libre de violencia.',
    icon: 'fa-solid fa-dove',
    points: 500,
    pointsClass: 'fa-solid fa-star text-secondary',
    tag: 'Nuevo',
    tagClass: 'text-pink-600 bg-pink-100',
    cardClass: 'bg-[#fce7f3] border-2 border-[#ec4899]/30',
    deco: 'fa-solid fa-heart',
    decoClass: 'text-pink-500',
    decoBg: 'bg-pink-200/60',
  },
  {
    to: '/juegos/trivia-igualdad',
    badge: 'Destacado',
    badgeClass: 'bg-[#4c35de]',
    titleLine1: 'Igualdad de',
    titleLine2: 'género',
    titleClass: 'text-[#4c35de]',
    desc: 'Trivia sobre igualdad, dignidad, estereotipos y prevención de la violencia.',
    icon: 'fa-solid fa-scale-balanced',
    points: 1000,
    pointsClass: 'fa-solid fa-star text-secondary',
    tag: 'Nuevo',
    tagClass: 'text-[#4c35de] bg-primary/10',
    cardClass: 'bg-[#ede9fe] border-2 border-[#4c35de]/30',
    deco: 'ph-fill ph-gender-female',
    decoClass: 'text-primary',
    decoBg: 'bg-primary/20',
  },
  {
    to: '/juegos/trivia-igualdad-tiempo',
    badge: '',
    badgeClass: '',
    titleLine1: 'Contrarreloj',
    titleLine2: 'de la igualdad',
    titleClass: 'text-[#b45309]',
    desc: 'Preguntas cronometradas sobre igualdad de género: gana más puntos respondiendo rápido.',
    icon: 'ph-fill ph-timer',
    points: 2000,
    pointsClass: 'ph-fill ph-lightning text-accent-yellow',
    tag: 'Prueba',
    tagClass: 'text-[#b45309] bg-accent-orange/10',
    cardClass: 'bg-[#fef3c7]',
    deco: 'ph-fill ph-timer',
    decoClass: 'text-[#b45309]',
    decoBg: 'bg-accent-yellow/30',
  },
  {
    to: '/juegos/trivia-dignidad-tiempo',
    badge: '',
    badgeClass: '',
    titleLine1: 'Contrarreloj',
    titleLine2: 'de la dignidad',
    titleClass: 'text-[#075985]',
    desc: 'Derechos y dignidad de la mujer con preguntas cronometradas: responde rápido y gana más.',
    icon: 'ph-fill ph-graduation-cap',
    points: 1000,
    pointsClass: 'ph-fill ph-lightning text-accent-yellow',
    tag: 'Prueba',
    tagClass: 'text-[#075985] bg-accent-yellow/20',
    cardClass: 'bg-[#e0f2fe]',
    deco: 'ph-fill ph-graduation-cap',
    decoClass: 'text-[#075985]',
    decoBg: 'bg-sky-200/60',
  },
]

function Juegos() {
  const [showOther, setShowOther] = useState(false)
  const [filter, setFilter] = useState('todos')
  const { user } = useAuth()
  const usuario = user ? user.username : 'invitado'
  const [puntos, setPuntos] = useState(() => getPuntosUsuario(usuario))
  const [mejor, setMejor] = useState(() => getMejorPuntaje(usuario))

  useEffect(() => {
    const actualizar = () => {
      setPuntos(getPuntosUsuario(usuario))
      setMejor(getMejorPuntaje(usuario))
    }
    actualizar()
    window.addEventListener(RESULTADOS_EVENT, actualizar)
    return () => window.removeEventListener(RESULTADOS_EVENT, actualizar)
  }, [usuario])

  let games = [...gameData]
  if (filter === 'popular') games = games.sort((a, b) => b.points - a.points)
  if (filter === 'nuevos') games = games.filter((g) => g.tag === 'Nuevo')
  if (filter === 'nivel') games = games.sort((a, b) => a.points - b.points)

  return (
    <>
      <main className="flex-1 flex flex-col lg:flex-row p-4 gap-6 bg-surface rounded-tl-3xl rounded-tr-3xl mx-2 md:mx-4 lg:mx-6 mb-6">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 bg-primary text-white rounded-3xl p-6 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-10 left-4 opacity-10">
            <i className="fa-solid fa-star text-3xl"></i>
          </div>
          <div className="absolute top-32 right-6 opacity-10">
            <i className="fa-solid fa-star text-xl"></i>
          </div>
          <div className="relative flex justify-center mt-4">
            <img alt="Edu Mascot Greeting" className="w-48 h-auto object-contain z-10 animate-float" src={mascotGreeting} />
          </div>
          <nav className="flex flex-col gap-2 relative z-10 mt-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to || '/juegos'}
                onClick={() => cat.to && setFilter('todos')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                  cat.active ? 'bg-white/20 font-semibold' : 'font-medium hover:bg-white/10'
                } ${cat.spotlight ? 'bg-white/15 border border-amber-300/40' : ''}`}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-md text-xs ${cat.spotlight && !cat.active ? 'bg-amber-400/30 text-amber-200' : 'bg-white/30'}`}>
                  <i className={cat.icon}></i>
                </div>
                {cat.label}
                {cat.spotlight && <i className="ph-fill ph-star text-amber-300 text-xs ml-auto"></i>}
              </Link>
            ))}

            {/* Otras materias (opcional) */}
            <div className="mt-2 border-t border-white/20 pt-2">
              <button
                onClick={() => setShowOther((s) => !s)}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded-2xl text-xs text-white/70 hover:bg-white/10 font-medium transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-layer-group text-xs"></i> Otras materias
                  <span className="text-[9px] uppercase text-white/40 font-bold">opcional</span>
                </span>
                <i className={`fa-solid ${showOther ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]`}></i>
              </button>
              {showOther && (
                <div className="flex flex-col gap-1 mt-1">
                  {otherCategories.map((cat) => (
                    <Link
                      key={cat.label}
                      to={cat.to}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm text-white/80 font-medium hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    >
                      <div className="w-6 h-6 flex items-center justify-center bg-white/25 rounded-md text-xs">
                        <i className={cat.icon}></i>
                      </div>
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <div className="mt-auto pt-6"></div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6 w-full lg:max-w-4xl min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4">
            <div>
              <h1 className="text-3xl font-bold text-text mb-1">Juegos educativos</h1>
              <p className="text-muted text-sm">Trivias y contrarrelojes para aprender sobre los derechos y la dignidad de la mujer.</p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
              <button
                onClick={() => setFilter('todos')}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-transform duration-200 hover:scale-105 active:scale-95 ${filter === 'todos' ? 'bg-primary text-white' : 'bg-white text-muted border border-gray-100 shadow-sm'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilter('popular')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-transform duration-200 hover:scale-105 active:scale-95 ${filter === 'popular' ? 'bg-primary text-white' : 'bg-white text-muted border border-gray-100 shadow-sm'}`}
              >
                Popular
              </button>
              <button
                onClick={() => setFilter('nuevos')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-transform duration-200 hover:scale-105 active:scale-95 ${filter === 'nuevos' ? 'bg-primary text-white' : 'bg-white text-muted border border-gray-100 shadow-sm'}`}
              >
                Nuevos
              </button>
              <button
                onClick={() => setFilter('nivel')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-transform duration-200 hover:scale-105 active:scale-95 ${filter === 'nivel' ? 'bg-primary text-white' : 'bg-white text-muted border border-gray-100 shadow-sm'}`}
              >
                Nivel <i className={`fa-solid ${filter === 'nivel' ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
              </button>
            </div>
          </div>

          {/* Derechos y Dignidad banner */}
          <div className="bg-gradient-to-r from-[#4c35de] via-[#6d28d9] to-[#1d71b8] rounded-3xl p-6 relative overflow-hidden text-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-sm"></div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 z-10">
              <i className="fa-solid fa-scale-balanced text-2xl text-amber-300"></i>
            </div>
            <div className="flex-1 z-10">
              <h2 className="text-xl font-extrabold mb-1 flex items-center gap-2">
                Derechos y Dignidad de la Mujer
                <i className="ph-fill ph-star text-amber-300 text-sm"></i>
              </h2>
              <p className="text-white/85 text-sm">
                Trivias y contrarrelojes sobre derechos humanos, dignidad, igualdad de género y mujeres que hicieron historia.
              </p>
            </div>
            <Link
              to="/derecho-dignidad"
              className="bg-white text-primary px-5 py-2.5 rounded-full font-bold text-sm hover:bg-amber-50 transition-all duration-200 hover:scale-105 active:scale-95 z-10 whitespace-nowrap flex items-center gap-2"
            >
              Explorar tema <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {games.map((g) => (
              <Link
                key={g.to}
                to={g.to}
                className={`${g.cardClass} rounded-3xl p-5 relative overflow-hidden flex flex-col min-h-[220px] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95`}
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white absolute top-5 left-5 shadow-sm z-10">
                  <i className={`${g.icon} text-sm`}></i>
                </div>
                {g.badge && (
                  <span className={`absolute top-5 right-5 text-[10px] font-bold ${g.badgeClass} text-white px-2 py-1 rounded-full shadow-sm z-10`}>
                    <i className="ph-fill ph-star text-amber-300 text-[10px] mr-0.5"></i> {g.badge}
                  </span>
                )}
                <div className="mt-8 z-10 relative">
                  <h3 className={`text-xl font-bold ${g.titleClass} leading-tight mb-2 w-2/3`}>
                    {g.titleLine1}
                    <br />
                    {g.titleLine2}
                  </h3>
                  <p className="text-xs text-muted w-2/3 mb-4 leading-relaxed">{g.desc}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <span className="flex items-center gap-1 text-sm font-bold text-text">
                      <i className={g.pointsClass}></i> {g.points}
                    </span>
                    <span className={`text-xs font-semibold ${g.tagClass} px-2 py-0.5 rounded-md`}>{g.tag}</span>
                  </div>
                </div>
                <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full ${g.decoBg} flex items-center justify-center`}>
                  <i className={`${g.deco} ${g.decoClass} text-3xl`}></i>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-4">
          {/* Featured Game Card */}
          <Link to="/juegos/trivia-dignidad" className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
            <div className="bg-primary text-white p-4 rounded-t-3xl flex items-center gap-2">
              <i className="fa-solid fa-star text-secondary"></i>
              <span className="font-bold text-sm">Juego destacado</span>
            </div>
            <div className="p-6 relative flex-1 flex flex-col">
              <div className="flex justify-between items-start z-10 relative">
                <div className="w-1/2">
                  <h2 className="text-2xl font-bold text-primary leading-tight mb-2">
                    Dignidad de
                    <br />
                    la mujer
                  </h2>
                  <p className="text-xs text-muted mb-4">Trivia sobre derechos humanos e igualdad de género.</p>
                </div>
              </div>
              <div className="relative h-16 w-full mb-4 z-10 flex flex-col items-end pr-8 gap-1 mt-10">
                <div className="bg-pink-50 border border-pink-200 text-pink-600 text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                  CEDAW
                </div>
                <div className="flex gap-2">
                  <div className="bg-white border border-blue-200 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    DUDH
                  </div>
                  <div className="bg-white border border-orange-200 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    ODS 5
                  </div>
                </div>
              </div>
              <div className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 mt-auto transition-transform duration-200 hover:scale-105 active:scale-95 z-10 relative">
                Jugar ahora <i className="fa-solid fa-play text-sm"></i>
              </div>
            </div>
          </Link>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 mb-1">
                <i className="fa-solid fa-graduation-cap text-primary text-xl"></i>
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Nivel recomendado</span>
              </div>
              <div className="font-bold text-text text-sm">2° - 5° grado</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 mb-1">
                <i className="fa-solid fa-puzzle-piece text-primary text-xl"></i>
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Tipo de juego</span>
              </div>
              <div className="font-bold text-text text-sm">Clasificación</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Tu mejor puntaje</span>
              <div className="flex items-center gap-2 font-bold text-text text-lg">
                <i className="fa-solid fa-trophy text-secondary"></i> {mejor.toLocaleString('es')}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">Estrellas ganadas</span>
              <div className="flex items-center gap-1 font-bold text-text text-lg">
                <i className="fa-solid fa-star text-secondary"></i> {puntos.toLocaleString('es')}
              </div>
            </div>
          </div>

          {/* Motivation Card */}
          <div className="bg-[#f3e8ff] rounded-3xl p-5 relative overflow-hidden mt-2 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
            <h3 className="text-lg font-bold text-[#7e22ce] mb-1">¡Sigue aprendiendo!</h3>
            <p className="text-xs text-text/80 w-3/4">Juega todos los días y completa retos para ganar más estrellas.</p>
            <div className="absolute right-[-10px] bottom-[-10px] text-6xl rotate-12">
              <img alt="Happy Star" className="w-16 h-16 object-contain rounded-full bg-secondary animate-float" src={happyStar} />
            </div>
          </div>
        </aside>
      </main>
    </>
  )
}

export default Juegos
