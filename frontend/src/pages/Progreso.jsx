import { Link } from 'react-router-dom'

const mascotSidebar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZmix6rSV0ddexrvPA0pw12T0v93NFNVaYQzsTUThKv8k6P5zhI3Zj8O4x16j8ISTEqa9vpI6lgLLlfiquAGBdmyzLFcTlaSR8w9XvM70otDL-sZUOPrsVK-WFLeSyBY-ZHncRI6Ll9zaNtlwjnr9Xv_kDrixiQa4teY1thi4eEm8JtECI1jzcfFjLgjxMHLI7FAVipoCp0BMLU4zS1eyyqwdl0f18OnWMqrlN-Nn1Dez5j_7ZGs3Mrpya2Edk00oE'

export default function Progreso() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[280px] bg-primary text-white flex-col py-6 px-4 rounded-tr-[40px] flex-shrink-0 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_2px)] bg-[length:20px_20px] opacity-20 pointer-events-none"></div>
        <div className="flex flex-col items-center mb-8 relative z-10">
          <img alt="Mascota Edu" className="w-48 h-auto object-contain drop-shadow-xl animate-float" src={mascotSidebar} />
        </div>
        <ul className="flex flex-col gap-2 flex-grow relative z-10">
          {[
            { icon: 'fa-solid fa-gamepad', label: 'Juegos', to: '/juegos' },
            { icon: 'fa-solid fa-book-open', label: 'Lecciones', to: '/lecciones' },
            { icon: 'fa-solid fa-chart-line', label: 'Progreso', to: '/progreso', active: true },
            { icon: 'fa-solid fa-user', label: 'Perfil', to: '/perfil' },
          ].map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:translate-x-2 ${
                  item.active
                    ? 'bg-white text-primary font-bold shadow-md scale-105'
                    : 'text-white opacity-80 hover:opacity-100 hover:bg-white/10'
                }`}
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
            <h1 className="text-3xl font-extrabold text-primary mb-1">Mi progreso</h1>
            <p className="text-muted text-sm">¡Vas por un excelente camino! Sigue así.</p>
          </div>
          <select className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 font-bold text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <option>Últimos 7 días</option>
            <option>Último mes</option>
            <option>Todo el tiempo</option>
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {[
            { label: 'Lecciones completadas', value: '2 / 5', icon: 'fa-solid fa-book-open', bg: 'bg-primary/10', color: 'text-primary', pct: 40 },
            { label: 'Juegos jugados', value: '8', icon: 'fa-solid fa-gamepad', bg: 'bg-secondary/10', color: 'text-secondary', pct: 80 },
            { label: 'Estrellas ganadas', value: '18 / 30', icon: 'fa-solid fa-star', bg: 'bg-[#fff3e0]', color: 'text-[#f57c00]', pct: 60 },
            { label: 'Puntaje total', value: '1250', icon: 'fa-solid fa-bolt', bg: 'bg-[#e8f5e9]', color: 'text-[#388e3c]', pct: 100 },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 flex flex-col items-center text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-14 h-14 rounded-full ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <i className={`${stat.icon} ${stat.color} text-2xl`}></i>
              </div>
              <p className="text-muted text-xs mb-1">{stat.label}</p>
              <p className={`text-3xl font-extrabold ${stat.color} mb-3`}>{stat.value}</p>
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`} style={{ width: `${stat.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {/* Columna izquierda */}
          <div className="flex flex-col gap-6">
            {/* Racha de aprendizaje */}
            <div className="bg-[#FFF8E1] rounded-2xl p-6 border border-[#FFE082] relative overflow-hidden">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fa-solid fa-fire text-[#FF6D00] text-2xl"></i>
                    <h3 className="text-xl font-extrabold text-[#D84315]">Racha de aprendizaje</h3>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-extrabold text-[#D84315] leading-none">7</span>
                    <span className="font-bold text-[#D84315]">días seguidos</span>
                  </div>
                  <p className="text-sm text-[#5D4037] mb-6">¡Increíble! Mantén tu racha.</p>
                  <div className="flex justify-between items-center w-full max-w-md">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, i) => (
                      <div key={day} className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                          i < 6 ? 'bg-[#FFCA28] text-white' : 'bg-white border-2 border-[#FFCA28]'
                        }`}>
                          {i < 6 && <i className="fa-solid fa-check text-sm"></i>}
                        </div>
                        <span className="text-xs font-bold text-[#5D4037]">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden md:block">
                  <img alt="Mascota celebrando" className="w-40 h-auto object-contain drop-shadow-md animate-float" src={mascotSidebar} />
                </div>
              </div>
            </div>

            {/* Progreso por tema */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl font-extrabold text-primary">Progreso por tema</h3>
                <Link to="/derecho-dignidad" className="text-primary text-sm font-bold flex items-center hover:underline">
                  Ver detalle <i className="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                </Link>
              </div>
              <div className="flex flex-col">
                {[
                  { title: 'Derechos y Dignidad', desc: 'DUDH, CEDAW, Belém do Pará.', pct: 60, icon: 'fa-solid fa-scale-balanced', bg: 'bg-primary', color: 'text-primary' },
                  { title: 'Igualdad de Género', desc: 'Brecha salarial, estereotipos, empoderamiento.', pct: 45, icon: 'fa-solid fa-venus-mars', bg: 'bg-secondary', color: 'text-secondary' },
                  { title: 'Mujeres en la Historia', desc: 'Marie Curie, Emmeline Pankhurst, Virginia Woolf.', pct: 70, icon: 'fa-solid fa-landmark', bg: 'bg-[#f57c00]', color: 'text-[#f57c00]' },
                  { title: 'Contrarreloj', desc: 'Responde rápido y gana bonus por tiempo.', pct: 35, icon: 'fa-solid fa-stopwatch', bg: 'bg-[#388e3c]', color: 'text-[#388e3c]' },
                ].map((subject, i) => (
                  <div key={subject.title} className={`flex items-center gap-4 py-4 ${i < 3 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 rounded-xl px-2 -mx-2 transition-colors duration-200 group`}>
                    <div className={`w-14 h-14 rounded-full ${subject.bg} flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                      <i className={`${subject.icon} text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold ${subject.color} mb-1`}>{subject.title}</h4>
                      <p className="text-xs text-muted">{subject.desc}</p>
                    </div>
                    <div className="w-32 flex flex-col items-end gap-2 flex-shrink-0">
                      <span className={`font-bold ${subject.color}`}>{subject.pct}%</span>
                      <div className={`w-full h-2.5 rounded-full overflow-hidden ${subject.bg}/20`}>
                        <div className={`h-full rounded-full ${subject.bg}`} style={{ width: `${subject.pct}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-6">
            {/* Logros recientes */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-extrabold text-primary">Logros recientes</h3>
                <Link to="/perfil" className="text-primary text-sm font-bold flex items-center hover:underline">
                  Ver todos <i className="fa-solid fa-chevron-right text-[10px] ml-1"></i>
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Explorador de derechos', desc: 'Completa 5 trivias de dignidad.', icon: 'fa-solid fa-star', bg: 'bg-[#fff3e0]', color: 'text-[#f57c00]', date: '12/05/2024' },
                  { title: '¡Primera estrella!', desc: 'Gana tu primera estrella.', icon: 'fa-solid fa-trophy', bg: 'bg-primary/10', color: 'text-primary', date: '10/05/2024' },
                  { title: 'Aprendiz constante', desc: 'Estudia 3 días seguidos.', icon: 'fa-solid fa-shield-halved', bg: 'bg-secondary/10', color: 'text-secondary', date: '09/05/2024' },
                ].map((achievement, i) => (
                  <div key={achievement.title}>
                    <div className="flex items-start gap-4 hover:bg-gray-50 p-2 -m-2 rounded-xl transition-colors group">
                      <div className={`w-12 h-12 rounded-xl ${achievement.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <i className={`${achievement.icon} ${achievement.color} text-xl`}></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm mb-0.5">{achievement.title}</h4>
                        <p className="text-xs text-muted">{achievement.desc}</p>
                      </div>
                      <span className="text-xs text-gray-400 mt-1 flex-shrink-0">{achievement.date}</span>
                    </div>
                    {i < 2 && <div className="h-px bg-gray-100 w-full my-1"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Actividad semanal */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex-1">
              <h3 className="font-extrabold text-primary mb-4">Actividad semanal</h3>
              <div className="flex gap-4">
                {/* Gráfico */}
                <div className="flex-1 relative pb-6 pt-2">
                  <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-400 font-bold w-6">
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span>0</span>
                  </div>
                  <div className="absolute left-8 right-2 top-3 bottom-6">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <polygon fill="rgba(76, 53, 222, 0.1)" points="0,100 0,50 16,30 33,50 50,35 66,10 83,30 100,45 100,100"></polygon>
                      <polyline fill="none" points="0,50 16,30 33,50 50,35 66,10 83,30 100,45" stroke="#4c35de" strokeWidth="2.5"></polyline>
                      {[0, 16, 33, 50, 66, 83, 100].map((x, i) => {
                        const y = [50, 30, 50, 35, 10, 30, 45][i]
                        return <circle key={x} cx={x} cy={y} fill="#4c35de" r="4" className="hover:fill-[#3b1bcf] transition-colors cursor-pointer"></circle>
                      })}
                    </svg>
                  </div>
                  <div className="absolute left-8 right-2 bottom-0 flex justify-between text-[11px] text-gray-400 font-bold">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                </div>
                {/* Tiempo de estudio */}
                <div className="w-32 bg-[#F3F0FF] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <p className="text-xs font-bold text-primary mb-1">Tiempo de estudio</p>
                  <p className="text-3xl font-extrabold text-primary mb-2 leading-none">4<span className="text-lg">h</span> 25<span className="text-lg">m</span></p>
                  <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                    <i className="fa-solid fa-clock text-[10px]"></i> Esta semana
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
