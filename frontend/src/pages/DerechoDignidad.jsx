import { Link } from 'react-router-dom'
import mascot from '../assets/mascot.png'

const trivias = [
  {
    id: 'trivia-dignidad',
    title: 'Derechos y Dignidad de la Mujer',
    desc: 'DUDH, CEDAW, Belém do Pará y acciones que promueven la dignidad.',
    icon: 'fa-solid fa-scale-balanced',
    bg: 'bg-[#ede9fe]',
    color: 'text-primary',
    route: '/juegos/trivia-dignidad',
    questions: 5,
    badge: null,
  },
  {
    id: 'trivia-igualdad',
    title: 'Igualdad de Género',
    desc: 'Brecha salarial, estereotipos, empoderamiento y acoso.',
    icon: 'fa-solid fa-venus-mars',
    bg: 'bg-[#e0f2fe]',
    color: 'text-secondary',
    route: '/juegos/trivia-igualdad',
    questions: 10,
    badge: null,
  },
  {
    id: 'trivia-mujeres-historia',
    title: 'Mujeres que Transformaron la Historia',
    desc: 'Marie Curie, Emmeline Pankhurst, Virginia Woolf y más.',
    icon: 'fa-solid fa-landmark',
    bg: 'bg-[#fef3c7]',
    color: 'text-[#b45309]',
    route: '/juegos/trivia-mujeres-historia',
    questions: 3,
    badge: null,
  },
  {
    id: 'trivia-dignidad-tiempo',
    title: 'Contrarreloj de la Dignidad',
    desc: 'Preguntas cronometradas: gana más puntos respondiendo rápido.',
    icon: 'fa-solid fa-stopwatch',
    bg: 'bg-[#e0f2fe]',
    color: 'text-[#075985]',
    route: '/juegos/trivia-dignidad-tiempo',
    questions: 5,
    badge: 'Prueba',
  },
  {
    id: 'trivia-igualdad-tiempo',
    title: 'Contrarreloj de la Igualdad',
    desc: 'Cronómetro activo: 15 segundos por pregunta de igualdad de género.',
    icon: 'fa-solid fa-bolt',
    bg: 'bg-[#fef3c7]',
    color: 'text-[#b45309]',
    route: '/juegos/trivia-igualdad-tiempo',
    questions: 10,
    badge: 'Prueba',
  },
]

const conceptos = [
  {
    title: 'CEDAW',
    text: 'Convención sobre la Eliminación de Todas las Formas de Discriminación contra la Mujer (1979). Protege de forma específica los derechos de las mujeres.',
    icon: 'fa-solid fa-gavel',
    bg: 'bg-[#ede9fe]',
    color: 'text-primary',
  },
  {
    title: 'Belém do Pará',
    text: 'Convención interamericana que protege el derecho de las mujeres a una vida libre de violencia (1994).',
    icon: 'fa-solid fa-shield-halved',
    bg: 'bg-[#fce7f3]',
    color: 'text-[#be185d]',
  },
  {
    title: 'ODS 5 — Igualdad de Género',
    text: 'Objetivo de Desarrollo Sostenible de la Agenda 2030: lograr la igualdad de género y empoderar a todas las mujeres y niñas.',
    icon: 'fa-solid fa-earth-americas',
    bg: 'bg-[#d1fae5]',
    color: 'text-[#065f46]',
  },
  {
    title: 'DUDH — Artículo 1',
    text: 'Todos los seres humanos nacen libres e iguales en dignidad y en derechos, sin distinción de sexo.',
    icon: 'fa-solid fa-book-open',
    bg: 'bg-[#fef3c7]',
    color: 'text-[#92400e]',
  },
]

export default function DerechoDignidad() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[280px] bg-primary text-white flex-col py-6 px-4 rounded-tr-[40px] flex-shrink-0 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_2px)] bg-[length:20px_20px] opacity-20 pointer-events-none"></div>
        <div className="flex flex-col items-center mb-8 relative z-10">
          <img alt="Mascota Edu" className="w-48 h-auto drop-shadow-md animate-float" src={mascot} />
        </div>
        <ul className="flex flex-col gap-2 flex-grow relative z-10">
          {[
            { icon: 'fa-solid fa-gamepad', label: 'Juegos', to: '/juegos' },
            { icon: 'fa-solid fa-book-open', label: 'Lecciones', to: '/lecciones' },
            { icon: 'fa-solid fa-chart-line', label: 'Progreso', to: '/progreso' },
            { icon: 'fa-solid fa-user', label: 'Perfil', to: '/perfil' },
          ].map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="flex items-center gap-4 text-white opacity-80 px-4 py-3 hover:opacity-100 hover:bg-white/10 rounded-2xl transition-all duration-300 hover:translate-x-2"
              >
                <i className={`${item.icon} w-5 text-center`}></i>
                <span className="font-bold text-lg">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto bg-white/10 rounded-2xl p-5 relative z-10 text-center backdrop-blur-sm border border-white/20">
          <h3 className="font-bold text-white mb-1">¡Sigue aprendiendo!</h3>
          <p className="text-white/90 mb-4 text-sm">Cada paso te acerca a nuevas aventuras.</p>
          <Link to="/perfil" className="block bg-white text-primary w-full py-2.5 rounded-full font-bold text-sm hover:bg-gray-50 transition-all">
            Ver Perfil
          </Link>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto bg-[#F8F9FE] p-6 lg:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 animate-fade-in-up">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted mb-2">
              <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
              <span className="text-primary font-bold">Derechos y Dignidad</span>
            </div>
            <h1 className="text-3xl font-extrabold text-primary mb-1">Derechos y Dignidad de la Mujer</h1>
            <p className="text-muted text-sm">Explora los derechos fundamentales, la igualdad de género y las mujeres que transformaron la historia.</p>
          </div>
          <Link
            to="/juegos/trivia-dignidad"
            className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <i className="fa-solid fa-play mr-2"></i> Jugar ahora
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {[
            { label: 'Trivias disponibles', value: '5', icon: 'fa-solid fa-gamepad', bg: 'bg-primary/10', iconColor: 'text-primary', pct: 100 },
            { label: 'Preguntas totales', value: '18', icon: 'fa-solid fa-circle-question', bg: 'bg-secondary/10', iconColor: 'text-secondary', pct: 100 },
            { label: 'Estrellas posibles', value: '15', icon: 'fa-solid fa-star', bg: 'bg-[#fff3e0]', iconColor: 'text-[#f57c00]', pct: 60 },
            { label: 'Puntos máximos', value: '1800', icon: 'fa-solid fa-bolt', bg: 'bg-[#e8f5e9]', iconColor: 'text-[#388e3c]', pct: 85 },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-14 h-14 rounded-full ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <i className={`${stat.icon} ${stat.iconColor} text-2xl`}></i>
              </div>
              <p className="text-muted text-xs mb-1">{stat.label}</p>
              <p className="text-3xl font-extrabold text-primary mb-3">{stat.value}</p>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${stat.iconColor.replace('text-', 'bg-')}`} style={{ width: `${stat.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {/* Columna izquierda */}
          <div className="flex flex-col gap-6">
            {/* Trivias disponibles */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-extrabold text-primary">Trivias disponibles</h2>
                <Link to="/juegos" className="text-primary text-sm font-bold flex items-center hover:underline">
                  Ver todas <i className="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {trivias.map((t) => (
                  <Link
                    key={t.id}
                    to={t.route}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer group"
                  >
                    <div className={`w-14 h-14 rounded-full ${t.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <i className={`${t.icon} ${t.color} text-xl`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 truncate">{t.title}</h4>
                        {t.badge && (
                          <span className="text-[10px] font-bold bg-accent-orange/15 text-accent-orange px-2 py-0.5 rounded-full">{t.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted truncate">{t.desc}</p>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0 ml-2">
                      <span className="text-sm font-bold text-primary">{t.questions} preg.</span>
                      <i className="fa-solid fa-chevron-right text-[10px] text-muted mt-1 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Conceptos clave */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-extrabold text-primary mb-5">Conceptos clave</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conceptos.map((c) => (
                  <div key={c.title} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-default">
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
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-6">
            {/* Medallas por desbloquear */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-primary mb-5">Logros por desbloquear</h3>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Primera estrella', desc: 'Gana tu primera estrella en cualquier trivia.', icon: 'fa-solid fa-star', bg: 'bg-[#fff3e0]', color: 'text-[#f57c00]', unlocked: true },
                  { title: 'Exploradora de derechos', desc: 'Completa las 3 trivias de dignidad.', icon: 'fa-solid fa-ribbon', bg: 'bg-[#ede9fe]', color: 'text-primary', unlocked: false },
                  { title: 'Racha de igualdad', desc: 'Acumula 3 días jugando trivias de igualdad.', icon: 'fa-solid fa-fire', bg: 'bg-[#fce7f3]', color: 'text-[#be185d]', unlocked: false },
                  { title: 'Respuesta relámpago', desc: 'Gana 200 pts en el contrarreloj.', icon: 'fa-solid fa-bolt', bg: 'bg-[#fef3c7]', color: 'text-[#92400e]', unlocked: false },
                ].map((m) => (
                  <div key={m.title} className={`flex items-start gap-4 p-3 rounded-2xl transition-colors ${m.unlocked ? 'bg-gray-50' : 'bg-gray-50 opacity-60'}`}>
                    <div className={`w-12 h-12 rounded-xl ${m.bg} flex items-center justify-center flex-shrink-0`}>
                      <i className={`${m.icon} ${m.color} text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 text-sm">{m.title}</h4>
                        {m.unlocked && <i className="fa-solid fa-circle-check text-green-500 text-xs"></i>}
                      </div>
                      <p className="text-xs text-muted">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dato del día */}
            <div className="bg-[#ede9fe] rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-lightbulb text-primary text-lg"></i>
                <h3 className="font-extrabold text-primary text-sm">Dato del día</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-3">
                Según la ONU, las mujeres realizan el <strong>75% del trabajo de cuidados no remunerado</strong> del mundo.
                Reducir esta brecha es esencial para lograr la igualdad de género.
              </p>
              <p className="text-xs text-primary font-bold">— ONU Mujeres, 2024</p>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-2xl p-6 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_2px)] bg-[length:20px_20px] opacity-20 pointer-events-none"></div>
              <i className="fa-solid fa-scale-balanced text-4xl text-secondary mb-3 relative z-10"></i>
              <h3 className="font-extrabold text-lg mb-2 relative z-10">¿Listo para jugar?</h3>
              <p className="text-white/90 text-sm mb-4 relative z-10">Pon a prueba lo que sabes sobre derechos y dignidad.</p>
              <Link to="/juegos" className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-secondary/90 transition-all duration-200 hover:scale-105 active:scale-95 relative z-10">
                Explorar trivias
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
