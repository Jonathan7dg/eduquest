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

const otherMaterias = [
  { to: '/juegos', label: 'Derechos y Dignidad', icon: 'fa-solid fa-scale-balanced' },
  { to: '/juegos/lengua', label: 'Lengua y Lectura', icon: 'fa-solid fa-book-open', active: true },
  { to: '/juegos', label: 'Matemáticas', icon: 'fa-solid fa-calculator' },
  { to: '/juegos', label: 'Ciencias', icon: 'fa-solid fa-flask' },
  { to: '/juegos', label: 'Historia y Sociedad', icon: 'fa-solid fa-earth-americas' },
]

const subcategories = [
  { icon: 'fa-solid fa-gamepad', label: 'Todos los juegos', active: true, to: '/juegos/lengua' },
  { icon: 'Aa', label: 'Ortografía y Acentuación', text: true, to: '/juegos/trivia-acentos' },
  { icon: 'fa-solid fa-book-open', label: 'Gramática', to: '/juegos/trivia-gramatica' },
  { icon: 'fa-solid fa-font', label: 'Vocabulario', to: '/juegos/trivia-vocabulario' },
  { icon: 'fa-solid fa-music', label: 'Rimas y Poesía', to: '/juegos/trivia-rima' },
  { icon: 'fa-solid fa-landmark', label: 'Literatura', to: '/juegos/trivia-literatura' },
]

export default function JuegosLengua() {
  const [showOther, setShowOther] = useState(false)
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
            {subcategories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to || '/juegos/lengua'}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                  cat.active ? 'bg-white/20 font-semibold' : 'font-medium hover:bg-white/10'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center bg-white/30 rounded-md text-xs">
                  {cat.text ? cat.label.slice(0, 2) : <i className={cat.icon}></i>}
                </div>
                {cat.label}
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
                  {otherMaterias.map((cat) => (
                    <Link
                      key={cat.label}
                      to={cat.to}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                        cat.active ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
                      }`}
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
              <h1 className="text-3xl font-bold text-text mb-1">Juegos de Lengua</h1>
              <p className="text-muted text-sm">Ortografía, gramática, vocabulario y literatura para aprender jugando.</p>
            </div>
          </div>

          {/* Lengua banner */}
          <div className="bg-gradient-to-r from-[#1d71b8] via-[#0284c7] to-[#0ea5e9] rounded-3xl p-6 relative overflow-hidden text-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-sm"></div>
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 z-10">
              <i className="fa-solid fa-book-open text-2xl text-amber-300"></i>
            </div>
            <div className="flex-1 z-10">
              <h2 className="text-xl font-extrabold mb-1">Lengua y Literatura</h2>
              <p className="text-white/85 text-sm">
                Practica acentuación, ortografía, sinónimos, gramática y comprensión de lectura con estos juegos.
              </p>
            </div>
            <Link
              to="/lecciones"
              className="bg-white text-primary px-5 py-2.5 rounded-full font-bold text-sm hover:bg-amber-50 transition-all duration-200 hover:scale-105 active:scale-95 z-10 whitespace-nowrap flex items-center gap-2"
            >
              Ver lecciones <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Acentos en acción */}
            <Link
              to="/juegos/trivia-acentos"
              className="bg-blue-50/50 border-2 border-primary rounded-3xl p-5 relative overflow-hidden flex flex-col min-h-[220px] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white absolute top-5 left-5 shadow-sm z-10">
                <i className="fa-solid fa-trophy text-sm"></i>
              </div>
              <div className="mt-8 z-10 relative">
                <h3 className="text-xl font-bold text-primary leading-tight mb-2 w-1/2">
                  Acentos
                  <br />
                  en acción
                </h3>
                <p className="text-xs text-muted w-1/2 mb-4 leading-relaxed">Clasifica palabras agudas, graves y esdrújulas.</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="flex items-center gap-1 text-sm font-bold text-text">
                    <i className="fa-solid fa-star text-secondary"></i> 1250
                  </span>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">Nivel 2</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-white border border-green-200 text-green-600 text-xs font-bold px-3 py-1 rounded-lg shadow-sm z-10 rotate-3">
                canción
              </div>
              <div className="absolute top-16 right-2 bg-white border border-blue-200 text-blue-600 text-xs font-bold px-3 py-1 rounded-lg shadow-sm z-10 -rotate-3">
                árbol
              </div>
              <div className="absolute top-28 right-8 bg-white border border-orange-200 text-orange-600 text-xs font-bold px-3 py-1 rounded-lg shadow-sm z-10 rotate-6">
                lápiz
              </div>
            </Link>

            {/* Palabras voladoras */}
            <Link
              to="/juegos/trivia-ortografia"
              className="bg-[#e0f2fe] rounded-3xl p-5 relative overflow-hidden flex flex-col min-h-[220px] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div className="z-10 relative">
                <h3 className="text-xl font-bold text-[#0284c7] leading-tight mb-2 w-1/2">
                  Palabras
                  <br />
                  voladoras
                </h3>
                <p className="text-xs text-muted w-[55%] mb-4 leading-relaxed">Atrapa y escribe correctamente las palabras de ortografía.</p>
                <div className="flex items-center gap-2 mt-auto pt-8">
                  <span className="flex items-center gap-1 text-sm font-bold text-text">
                    <i className="fa-solid fa-star text-secondary"></i> 980
                  </span>
                  <span className="text-xs font-semibold text-[#0284c7] bg-[#0284c7]/10 px-2 py-0.5 rounded-md">Nivel 1</span>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-3/5 h-full flex justify-end items-end">
                <img alt="Edu Mascot in Airplane" className="h-[120%] object-contain object-right-bottom -rotate-6" src={mascotAirplane} />
              </div>
              <div className="absolute bottom-2 left-1/4 w-12 h-4 bg-white/40 rounded-full blur-sm"></div>
              <div className="absolute bottom-8 right-1/4 w-16 h-5 bg-white/40 rounded-full blur-sm"></div>
            </Link>

            {/* Sopa de letras */}
            <Link
              to="/juegos/trivia-vocabulario"
              className="bg-[#fef3c7] rounded-3xl p-5 relative overflow-hidden flex min-h-[180px] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div className="w-1/2 flex flex-col z-10 pr-2">
                <h3 className="text-xl font-bold text-[#b45309] leading-tight mb-2">
                  Sopa de
                  <br />
                  letras
                </h3>
                <p className="text-xs text-muted mb-4">Encuentra sinónimos, antónimos y significados.</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="flex items-center gap-1 text-sm font-bold text-text">
                    <i className="fa-solid fa-star text-secondary"></i> 860
                  </span>
                  <span className="text-xs font-semibold text-[#b45309] bg-[#b45309]/10 px-2 py-0.5 rounded-md">Nivel 1</span>
                </div>
              </div>
              <div className="w-1/2 flex items-center justify-center relative">
                <div className="bg-[#fffbeb] p-2 rounded-xl border-2 border-white shadow-sm font-mono text-[10px] sm:text-xs font-bold text-gray-700 leading-tight grid grid-cols-6 gap-x-2 gap-y-1 text-center w-full max-w-[150px]">
                  <span>C</span><span>A</span><span>S</span><span>A</span><span>D</span><span>F</span>
                  <span>O</span><span>M</span><span className="bg-secondary/30 rounded text-[#b45309]">Ú</span><span className="bg-secondary/30 rounded text-[#b45309]">S</span><span className="bg-secondary/30 rounded text-[#b45309]">I</span><span>C</span>
                  <span>P</span><span>A</span><span>J</span><span>Á</span><span>R</span><span>O</span>
                  <span>L</span><span>Á</span><span>P</span><span>I</span><span>Z</span><span>Q</span>
                  <span>B</span><span>T</span><span>T</span><span>E</span><span>C</span><span>E</span>
                  <span>E</span><span>É</span><span>F</span><span>O</span><span>N</span><span>O</span>
                </div>
              </div>
            </Link>

            {/* Ordena y aprende */}
            <Link
              to="/juegos/trivia-gramatica"
              className="bg-[#dcfce7] rounded-3xl p-5 relative overflow-hidden flex min-h-[180px] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div className="w-1/2 flex flex-col z-10 pr-2">
                <h3 className="text-xl font-bold text-[#15803d] leading-tight mb-2">
                  Ordena y
                  <br />
                  aprende
                </h3>
                <p className="text-xs text-muted mb-4 leading-relaxed">Reconoce sustantivos, verbos, adjetivos y partes de la oración.</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="flex items-center gap-1 text-sm font-bold text-text">
                    <i className="fa-solid fa-star text-secondary"></i> 750
                  </span>
                  <span className="text-xs font-semibold text-[#15803d] bg-[#15803d]/10 px-2 py-0.5 rounded-md">Nivel 1</span>
                </div>
              </div>
              <div className="w-1/2 flex items-center justify-center gap-2">
                <div className="bg-white border-2 border-gray-200 rounded-lg w-10 h-10 flex items-center justify-center font-bold text-lg text-text shadow-sm">
                  ár
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg w-10 h-10 flex items-center justify-center font-bold text-lg text-text shadow-sm">
                  bol
                </div>
                <div className="bg-transparent border-2 border-dashed border-gray-300 rounded-lg w-10 h-10"></div>
              </div>
            </Link>

            {/* Rima y gana */}
            <Link
              to="/juegos/trivia-rima"
              className="bg-[#f3e8ff] rounded-3xl p-5 relative overflow-hidden flex min-h-[180px] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div className="w-2/5 flex flex-col z-10 pr-2">
                <h3 className="text-xl font-bold text-[#7e22ce] leading-tight mb-2">
                  Rima y
                  <br />
                  gana
                </h3>
                <p className="text-xs text-muted mb-4">Encuentra la palabra que rima.</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="flex items-center gap-1 text-sm font-bold text-text">
                    <i className="fa-solid fa-star text-secondary"></i> 650
                  </span>
                  <span className="text-xs font-semibold text-[#7e22ce] bg-[#7e22ce]/10 px-2 py-0.5 rounded-md">Nivel 1</span>
                </div>
              </div>
              <div className="w-3/5 flex items-center justify-center relative">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 w-16 h-20 flex items-center justify-center font-bold text-orange-600 text-sm absolute z-30 -rotate-12 -ml-16">
                  casa
                </div>
                <div className="bg-white/80 rounded-xl shadow-sm border border-gray-100 p-2 w-16 h-20 flex items-center justify-center font-bold text-blue-400 text-2xl absolute z-20 rotate-6 ml-4">
                  ?
                </div>
                <div className="bg-white/60 rounded-xl shadow-sm border border-gray-100 p-2 w-16 h-20 flex items-center justify-center font-bold text-purple-400 text-2xl absolute z-10 rotate-12 ml-24 mt-4">
                  ?
                </div>
              </div>
            </Link>

            {/* Aventura histórica */}
            <Link
              to="/juegos/trivia-literatura"
              className="bg-[#ffedd5] rounded-3xl p-5 relative overflow-hidden flex min-h-[180px] cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              <div className="w-1/2 flex flex-col z-10 pr-2">
                <h3 className="text-xl font-bold text-[#c2410c] leading-tight mb-2">
                  Aventura
                  <br />
                  literaria
                </h3>
                <p className="text-xs text-muted mb-4 leading-relaxed">Recorre géneros, autores y grandes obras de la literatura.</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="flex items-center gap-1 text-sm font-bold text-text">
                    <i className="fa-solid fa-star text-secondary"></i> 1100
                  </span>
                  <span className="text-xs font-semibold text-[#c2410c] bg-[#c2410c]/10 px-2 py-0.5 rounded-md">Nivel 2</span>
                </div>
              </div>
              <div className="w-3/5 absolute right-0 bottom-0 h-full flex justify-end items-end">
                <div className="absolute inset-0 bg-[#fed7aa] rounded-br-3xl" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                <img alt="Edu Explorer" className="h-full object-contain object-right-bottom z-10 relative" src={explorer} />
              </div>
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-4">
          {/* Featured Game Card */}
          <Link to="/juegos/trivia-acentos" className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
            <div className="bg-primary text-white p-4 rounded-t-3xl flex items-center gap-2">
              <i className="fa-solid fa-star text-secondary"></i>
              <span className="font-bold text-sm">Juego destacado</span>
            </div>
            <div className="p-6 relative flex-1 flex flex-col">
              <div className="flex justify-between items-start z-10 relative">
                <div className="w-1/2">
                  <h2 className="text-2xl font-bold text-primary leading-tight mb-2">
                    Acentos en
                    <br />
                    acción
                  </h2>
                  <p className="text-xs text-muted mb-4">Clasifica las palabras según su acentuación.</p>
                </div>
              </div>
              <div className="relative h-16 w-full mb-4 z-10 flex flex-col items-end pr-8 gap-1 mt-10">
                <div className="bg-white border border-green-200 text-green-600 text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                  canción
                </div>
                <div className="flex gap-2">
                  <div className="bg-white border border-blue-200 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    árbol
                  </div>
                  <div className="bg-white border border-orange-200 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                    lápiz
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
              <div className="font-bold text-text text-sm">Lengua</div>
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
