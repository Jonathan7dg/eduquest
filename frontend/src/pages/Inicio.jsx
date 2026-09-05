import { Link } from 'react-router-dom'
import mascotStanding from '../assets/mascotStandingPencil.png'
import logoText from '../assets/logo_yellow_blue_transparent.png'

const trivias = [
  {
    title: 'Derechos y Dignidad de la Mujer',
    desc: 'DUDH, CEDAW, Belém do Pará y acciones que promueven la dignidad.',
    icon: 'fa-solid fa-scale-balanced',
    bg: 'bg-[#ede9fe]',
    color: 'text-primary',
    route: '/juegos/trivia-dignidad',
  },
  {
    title: 'Igualdad de Género',
    desc: 'Brecha salarial, estereotipos, empoderamiento y acoso.',
    icon: 'fa-solid fa-venus-mars',
    bg: 'bg-[#e0f2fe]',
    color: 'text-secondary',
    route: '/juegos/trivia-igualdad',
  },
  {
    title: 'Mujeres que Transformaron la Historia',
    desc: 'Marie Curie, Emmeline Pankhurst, Virginia Woolf y más.',
    icon: 'fa-solid fa-landmark',
    bg: 'bg-[#fef3c7]',
    color: 'text-[#b45309]',
    route: '/juegos/trivia-mujeres-historia',
  },
]

const conceptos = [
  { title: 'Dignidad', text: 'Valor intrínseco e inviolable de toda persona, sin distinción de sexo.', icon: 'fa-solid fa-hand-holding-heart', bg: 'bg-[#fce7f3]', color: 'text-[#be185d]' },
  { title: 'Igualdad de género', text: 'Derecho de las mujeres a los mismos derechos, oportunidades y trato.', icon: 'fa-solid fa-venus-mars', bg: 'bg-[#e0f2fe]', color: 'text-secondary' },
  { title: 'CEDAW', text: 'Convención que protege a las mujeres de toda forma de discriminación (1979).', icon: 'fa-solid fa-scale-balanced', bg: 'bg-[#ede9fe]', color: 'text-primary' },
  { title: 'DUDH Art. 1', text: 'Todos nacemos libres e iguales en dignidad y derechos.', icon: 'fa-solid fa-book-open', bg: 'bg-[#fef3c7]', color: 'text-[#92400e]' },
]

export default function Inicio() {
  return (
    <div className="flex-1 bg-gradient-to-br from-[#1d71b8] via-[#634897] to-[#f7a82d] relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-[15%] right-[5%] opacity-40 animate-bounce">
        <i className="ph-fill ph-star text-eduyellow text-3xl"></i>
      </div>
      <div className="absolute bottom-[18%] left-[6%] opacity-40 animate-bounce delay-300">
        <i className="ph-fill ph-confetti text-white text-3xl"></i>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col items-center">
        {/* Hero */}
        <div className="w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/40 transform transition-all duration-300 hover:scale-[1.01] text-center relative overflow-hidden">
          {/* Decorative corner blobs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-200 to-blue-100 opacity-40 blur-xl"></div>
          <div className="absolute -bottom-12 -left-10 w-44 h-44 rounded-full bg-gradient-to-tr from-amber-200 to-orange-100 opacity-40 blur-xl"></div>
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4c35de] via-[#634897] to-[#1d71b8]"></div>
          <div className="absolute top-3 right-5 opacity-50 animate-bounce">
            <i className="ph-fill ph-confetti text-eduyellow text-xl"></i>
          </div>
          <div className="absolute top-1/2 left-3 opacity-30 animate-pulse">
            <i className="ph-fill ph-graduation-cap text-[#634897] text-xl"></i>
          </div>

          {/* Top badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4c35de] to-[#1d71b8] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
            <i className="ph-fill ph-star text-eduyellow text-sm"></i>
            Nivel inicial · Bienvenidos
            <i className="ph-fill ph-star text-eduyellow text-sm"></i>
          </div>

          <div className="flex justify-center mt-4 mb-3">
            <img src={logoText} alt="EduQuest Logo" className="h-14 w-auto object-contain" />
          </div>
          <p className="font-handwritten text-2xl mb-4 bg-gradient-to-r from-[#f7a82d] to-[#634897] bg-clip-text text-transparent">
            Derechos, dignidad e igualdad — ¡a tu ritmo!
          </p>
          <div className="flex justify-center mb-5 relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-purple-100 to-blue-50 rounded-full flex items-center justify-center shadow-inner relative ring-2 ring-[#f7a82d]/30">
              <img src={mascotStanding} alt="Edu de pie con lápiz" className="h-44 sm:h-56 w-auto object-contain animate-float" />
            </div>
            {/* Floating badges around the mascot */}
            <span className="absolute top-2 right-8 text-xl animate-bounce text-eduyellow">
              <i className="ph-fill ph-sparkle"></i>
            </span>
            <span className="absolute top-2 left-10 text-2xl animate-bounce delay-150 opacity-70">
              <i className="ph-fill ph-confetti text-[#f7a82d]"></i>
            </span>
            <span className="absolute bottom-0 right-4 inline-flex items-center gap-1 bg-white/90 rounded-full px-3 py-1 text-xs font-bold text-[#1d71b8] shadow-md animate-float delay-300">
              <i className="ph-fill ph-graduation-cap text-sm"></i> 5 trivias
            </span>
            <span className="absolute bottom-2 left-1 inline-flex items-center gap-1 bg-white/90 rounded-full px-3 py-1 text-xs font-bold text-[#4c35de] shadow-md animate-float delay-500">
              <i className="ph-fill ph-star text-eduyellow text-sm"></i> +500 pts
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-[#634897] to-[#1d71b8] bg-clip-text text-transparent">
            Derechos y Dignidad de la Mujer
          </h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-xl mx-auto">
            Plataforma gamificada para estudiantes y docentes, enfocada en la promoción de la dignidad,
            los derechos de la mujer y la igualdad de género.
          </p>

          {/* Small feature bullets */}
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {[
              { icon: 'ph-fill ph-game-controller', label: 'Juegos', color: 'bg-[#4c35de]/10 text-[#4c35de]' },
              { icon: 'ph-fill ph-book-open', label: 'Lecciones', color: 'bg-[#1d71b8]/10 text-[#1d71b8]' },
              { icon: 'ph-fill ph-trophy', label: 'Logros', color: 'bg-[#f7a82d]/10 text-[#b45309]' },
              { icon: 'ph-fill ph-chart-bar', label: 'Progreso', color: 'bg-[#634897]/10 text-[#634897]' },
            ].map((b) => (
              <span key={b.label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${b.color}`}>
                <i className={`${b.icon} text-sm`}></i> {b.label}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/derecho-dignidad"
              className="bg-gradient-to-r from-[#4c35de] to-[#3b1bcf] hover:from-[#3b1bcf] hover:to-[#2d14a6] active:scale-[0.98] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-scale-balanced"></i> Derechos y Dignidad
            </Link>
            <Link
              to="/juegos"
              className="bg-gradient-to-r from-[#f7a82d] to-[#e0891f] hover:from-[#e89c24] hover:to-[#d07c18] active:scale-[0.98] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-gamepad"></i> Explorar juegos
            </Link>
            <Link
              to="/lecciones"
              className="bg-gradient-to-r from-[#1d71b8] to-[#155c97] hover:from-[#155c97] hover:to-[#0f4a7a] active:scale-[0.98] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-book-open"></i> Lecciones
            </Link>
          </div>

          {/* Bottom decorative divider */}
          <div className="mt-5 h-2 bg-gradient-to-r from-[#4c35de] via-[#f7a82d] to-[#1d71b8] rounded-full w-2/3 mx-auto opacity-60"></div>
        </div>

        {/* Stats */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Trivias', value: '5', icon: 'fa-solid fa-gamepad', bg: 'bg-white/20' },
            { label: 'Preguntas', value: '18', icon: 'fa-solid fa-circle-question', bg: 'bg-white/20' },
            { label: 'Conceptos', value: '4', icon: 'fa-solid fa-book-open', bg: 'bg-white/20' },
            { label: 'Valores', value: '100%', icon: 'fa-solid fa-heart', bg: 'bg-white/20' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/25 backdrop-blur rounded-2xl p-4 text-center border border-white/30">
              <div className="text-eduyellow text-2xl mb-1">
                <i className={stat.icon}></i>
              </div>
              <p className="text-white font-extrabold text-2xl">{stat.value}</p>
              <p className="text-white/80 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trivias de derechos */}
        <div className="w-full mt-8 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/40">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
              <i className="fa-solid fa-scale-balanced text-primary"></i> Aprende sobre derechos
            </h3>
            <Link to="/derecho-dignidad" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              Ver todo
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trivias.map((t) => (
              <Link
                key={t.title}
                to={t.route}
                className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${t.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <i className={`${t.icon} ${t.color} text-xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm">{t.title}</h4>
                  <p className="text-xs text-muted mt-1">{t.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Conceptos + otras materias */}
        <div className="w-full mt-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/40">
            <h3 className="text-lg font-extrabold text-gray-800 mb-5">Conceptos clave</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conceptos.map((c) => (
                <div key={c.title} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <i className={`${c.icon} ${c.color} text-lg`}></i>
                    </div>
                    <h4 className="font-bold text-slate-800">{c.title}</h4>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Otras materias (opcional) */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-white/40">
            <h3 className="text-lg font-extrabold text-gray-800 mb-2 flex items-center gap-2">
              <i className="fa-solid fa-layer-group text-muted text-sm"></i> Otras materias
            </h3>
            <p className="text-xs text-muted mb-4">Contenido complementario, disponible si lo deseas.</p>
            <div className="flex flex-col gap-3">
              <Link
                to="/lecciones"
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <i className="fa-solid fa-book-open"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Lengua y Literatura</p>
                    <p className="text-xs text-muted">Ortografía y más</p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-muted text-sm"></i>
              </Link>
              <Link
                to="/progreso"
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Mi progreso</p>
                    <p className="text-xs text-muted">Racha y logros</p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-muted text-sm"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
