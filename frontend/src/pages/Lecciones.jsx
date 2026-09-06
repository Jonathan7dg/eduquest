import { useEffect, useState } from 'react'
import { getLeccionesDocente, getProgresoLecciones, setEstadoLeccion, getPuntosUsuario } from '../data/store'
import { useAuth } from '../context/AuthContext'
const mascotSidebar =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZmix6rSV0ddexrvPA0pw12T0v93NFNVaYQzsTUThKv8k6P5zhI3Zj8O4x16j8ISTEqa9vpI6lgLLlfiquAGBdmyzLFcTlaSR8w9XvM70otDL-sZUOPrsVK-WFLeSyBY-ZHncRI6Ll9zaNtlwjnr9Xv_kDrixiQa4teY1thi4eEm8JtECI1jzcfFjLgjxMHLI7FAVipoCp0BMLU4zS1eyyqwdl0f18OnWMqrlN-Nn1Dez5j_7ZGs3Mrpya2Edk00oE'
const mascotPencil =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD8rvuDKQC31N_mOAo9U0gQ5veyEiV_FcKJUFhMvdA0yNGUw25m0eM15qvQ3Dp8tU5odOOTtY-T-suGMlokOR25UI9VC3klw5qMGOhvJ3-8A-Jc83deYZc17wW7VTTF-JugcKvag4Ga1ZX6sl7blbY7ybfTtBLtls_vNFXb-RFe0u-Ii0RLkdTPa4GetFsEfJswYSoDoduFsTpycoW7LIebuu_Ixq1rTvgUl4SkXYcbG_byVQZR1D19CIY_n8YgfTN1'
const bookIllustration =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBaI58nd3ZvMcsdLeWXEsAr30I7OeEyNOVHmX0FTFVEZb_PDRaih20JrB9OvxBQCsl2IS63zzgaI-osWLE1nDJ9CGbs_RDGRhG7JPfpBvm3VkMCDl4-c3amZR4F98t0uJyV3Md5bCQNQ-JqlTzre_RjeEm2OSK-G6HyVPNLyl4I-7tuSP1bUlaj0AZ9u2bHcppBUmUtaNeL1aYMtu6d1WYqJZTWIHB3vH_7Jj8AcfeKXZNKs0W32OE'
const trophy =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCPPz6vu2neEyTekMpRLM2DWAym2MxRyAvL1NIPWAwwmduAJ77RWhwIvTLrcUgB_EbapysiwqBYMGeUd0AHPVEvvwiPamN3A2zOicIJQYgxAFXeC4A37JuLzNbGSxM69CSSfsB6Ahl2U0ThH3la7k6tmocJu5ySy8iFwrGvSXeMO7BNkKxN6w8-QdmtkAvumiPYIrj5l7EhVfx3Sbp7nqpMPNNa8NQhnBNve-Mjb1OqJO-1LvgYThSuqT4E3sw6sXRrKK2_FF5Q4mtz'

const topicGroups = [
  {
    key: 'derechos',
    title: 'Derechos y Dignidad',
    main: true,
    topics: [
      { icon: 'verified_user', label: 'Derechos Humanos', active: true, mat: true },
      { icon: 'favorite', label: 'Dignidad de la Mujer', mat: true },
      { icon: 'balance', label: 'Igualdad de Género', mat: true },
      { icon: 'warning', label: 'Violencia y Acoso', mat: true },
      { icon: 'auto_stories', label: 'Mujeres en la Historia', mat: true },
    ],
  },
  {
    key: 'lengua',
    title: 'Otras materias',
    topics: [
      { icon: 'á', label: 'Lengua · Acentuación', active: true, text: true },
      { icon: 'ABC', label: 'Ortografía', text: true },
      { icon: 'chat', label: 'Gramática', mat: true },
      { icon: 'auto_stories', label: 'Vocabulario', mat: true },
      { icon: 'import_contacts', label: 'Comprensión lectora', mat: true },
      { icon: 'edit', label: 'Escritura', mat: true },
    ],
  },
]

const lessons = [
  {
    number: 1,
    title: '¿Qué es la acentuación?',
    desc: 'Descubre qué es la sílaba tónica y por qué es importante.',
    status: 'completed',
    circle: 'bg-primary text-on-primary',
    textColor: 'text-primary',
    img: bookIllustration,
    imgAlt: 'Libro azul abierto',
  },
  {
    number: 2,
    title: 'Palabras agudas',
    desc: 'Aprende a reconocer y acentuar las palabras agudas.',
    status: 'completed',
    circle: 'bg-[#316ee9] text-white',
    textColor: 'text-[#0054cd]',
    word: 'canción',
    rotate: 'rotate-2',
    icon: 'star',
    iconColor: 'text-amber-400',
    iconPos: '-top-2 -right-2',
  },
  {
    number: 3,
    title: 'Palabras graves',
    desc: 'Identifica y acentúa correctamente las palabras graves.',
    status: 'progress',
    circle: 'bg-amber-500 text-white',
    textColor: 'text-amber-600',
    word: 'árbol',
    rotate: '-rotate-2',
    icon: 'park',
    iconColor: 'text-green-500',
    iconPos: 'bottom-1 right-1',
  },
  {
    number: 4,
    title: 'Palabras esdrújulas',
    desc: 'Conoce las palabras esdrújulas y cómo acentuarlas.',
    status: 'locked',
    circle: 'bg-amber-200 text-amber-700',
    textColor: 'text-amber-500',
    word: 'música',
    rotate: 'rotate-1',
    icon: 'music_note',
    iconColor: 'text-purple-500',
    iconPos: 'bottom-1 right-1',
  },
  {
    number: 5,
    title: 'Práctica final',
    desc: 'Pon a prueba lo que aprendiste sobre la acentuación.',
    status: 'locked',
    circle: 'bg-[#316ee9]/50 text-[#5a3700]',
    textColor: 'text-[#316ee9]',
    img: trophy,
    imgAlt: 'Trofeo dorado',
  },
]

const goals = [
  'Identificar la sílaba tónica.',
  'Clasificar palabras agudas, graves y esdrújulas.',
  'Acentuar correctamente cada tipo de palabra.',
]

const rightsLessons = [
  {
    number: 1,
    title: 'La Declaración Universal de Derechos Humanos',
    desc: 'Descubre los derechos fundamentales de todas las personas.',
    status: 'completed',
    circle: 'bg-primary text-on-primary',
    textColor: 'text-primary',
    word: 'DUDH',
    rotate: 'rotate-1',
    icon: 'star',
    iconColor: 'text-[#4c35de]',
    iconPos: '-top-2 -right-2',
  },
  {
    number: 2,
    title: 'La Dignidad de la Mujer',
    desc: 'Aprende qué significa la dignidad y cómo se protege.',
    status: 'completed',
    circle: 'bg-[#4c35de] text-white',
    textColor: 'text-primary',
    word: 'dignidad',
    rotate: 'rotate-2',
    icon: 'favorite',
    iconColor: 'text-[#be185d]',
    iconPos: '-top-2 -right-2',
  },
  {
    number: 3,
    title: 'CEDAW: Derechos de las Mujeres',
    desc: 'Conoce el instrumento que protege a las mujeres de la discriminación.',
    status: 'progress',
    circle: 'bg-amber-500 text-white',
    textColor: 'text-amber-600',
    word: 'CEDAW',
    rotate: '-rotate-2',
    icon: 'verified_user',
    iconColor: 'text-[#4c35de]',
    iconPos: 'bottom-1 right-1',
  },
  {
    number: 4,
    title: 'Igualdad de Género y ODS 5',
    desc: 'Explora la brecha salarial, los estereotipos y el empoderamiento.',
    status: 'locked',
    circle: 'bg-amber-200 text-amber-700',
    textColor: 'text-amber-500',
    word: 'igualdad',
    rotate: 'rotate-1',
    icon: 'balance',
    iconColor: 'text-[#0054cd]',
    iconPos: 'bottom-1 right-1',
  },
  {
    number: 5,
    title: 'Mujeres que Transformaron la Historia',
    desc: 'Marie Curie, Emmeline Pankhurst, Virginia Woolf y más.',
    status: 'locked',
    circle: 'bg-[#316ee9]/50 text-[#5a3700]',
    textColor: 'text-[#316ee9]',
    word: 'historia',
    rotate: 'rotate-2',
    icon: 'auto_stories',
    iconColor: 'text-[#0054cd]',
    iconPos: 'bottom-1 right-1',
  },
]

const rightsGoals = [
  'Conocer los derechos humanos de las mujeres.',
  'Reconocer casos de violencia y discriminación.',
  'Valorar la igualdad de género y la dignidad.',
]

function MatIcon({ name, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  )
}

export default function Lecciones() {
  const [tab, setTab] = useState('derechos')
  const [showSubjects, setShowSubjects] = useState(false)
  const [showAllLessons, setShowAllLessons] = useState(false)
  const custom = getLeccionesDocente()
  const { user } = useAuth()
  const usuario = user ? user.username : 'invitado'
  const [progreso, setProgreso] = useState(() => getProgresoLecciones(usuario))

  useEffect(() => {
    setProgreso(getProgresoLecciones(usuario))
  }, [usuario])

  const list = tab === 'lengua' ? lessons : rightsLessons
  const estadoDe = (lesson) => progreso[`${tab}-${lesson.number}`] || lesson.status
  const completadas = list.filter((l) => estadoDe(l) === 'completed').length
  const enProgreso = list.filter((l) => estadoDe(l) === 'progress').length
  const pct = list.length ? Math.round((completadas / list.length) * 100) : 0
  const puntos = getPuntosUsuario(usuario)

  const toggleLeccion = (lesson, index) => {
    const clave = `${tab}-${lesson.number}`
    const actual = estadoDe(lesson)
    if (actual === 'locked') {
      const anterior = list[index - 1]
      if (anterior && estadoDe(anterior) === 'completed') {
        setProgreso(setEstadoLeccion(usuario, clave, 'progress'))
      }
      return
    }
    setProgreso(setEstadoLeccion(usuario, clave, actual === 'completed' ? 'progress' : 'completed'))
  }
  return (
    <>
      <div className="flex flex-1 max-w-[1440px] mx-auto w-full px-container-padding py-6 gap-card-gap">
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col w-[280px] bg-primary rounded-[24px] p-6 text-on-primary flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 opacity-20 transform translate-x-4 -translate-y-4">
            <MatIcon name="star" className="text-9xl" />
          </div>
          <div className="relative flex justify-center mt-4">
            <img className="w-48 h-auto object-contain drop-shadow-xl z-10 animate-float" alt="Edu, la mascota" src={mascotSidebar} />
          </div>
          <div className="z-10 bg-on-primary/10 rounded-xl p-4 mb-6">
            <nav className="flex flex-col gap-2">
              {topicGroups.map((group) => {
                const isMain = group.main
                if (!isMain && !showSubjects) return null
                return (
                  <div key={group.key} className={isMain ? 'mb-3' : 'border-t border-on-primary/20 pt-3 mt-1'}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-label-lg font-label-lg flex items-center gap-1.5">
                        {isMain ? (
                          <>
                            <MatIcon name="verified_user" className="text-[18px] text-amber-300" />
                            {group.title}
                          </>
                        ) : (
                          <MatIcon name="menu_book" className="text-[18px] text-on-primary/60" />
                        )}
                        {!isMain && <span className="text-[10px] text-on-primary/50 uppercase font-bold">opcional</span>}
                      </h3>
                      <button
                        onClick={() => setTab(group.key)}
                        className={`text-xs font-bold px-2 py-1 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 ${
                          tab === group.key ? 'bg-amber-400 text-tertiary' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {isMain ? 'Ver' : 'Seleccionar'}
                      </button>
                    </div>
                    <nav className="flex flex-col gap-2">
                      {group.topics.map((topic, i) => (
                        <button
                          key={i}
                          onClick={() => setTab(group.key)}
                          className={`flex items-center ${
                            topic.active && tab === group.key
                              ? 'justify-between bg-on-primary text-primary px-4 py-3 rounded-xl shadow-sm'
                              : 'gap-3 px-4 py-3 rounded-xl text-on-primary/80 hover:bg-on-primary/10'
                          } font-label-lg text-label-lg hover:scale-[1.02] active:scale-95 transition-all duration-200`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                                topic.active && tab === group.key ? 'bg-primary/10 text-primary' : 'bg-on-primary/20'
                              }`}
                            >
                              {topic.mat ? <MatIcon name={topic.icon} className="text-[16px]" /> : topic.icon}
                            </div>
                            {topic.label}
                          </div>
                          {topic.active && tab === group.key && <MatIcon name="chevron_right" />}
                        </button>
                      ))}
                    </nav>
                  </div>
                )
              })}

              {/* Link to optional subjects */}
              <button
                onClick={() => setShowSubjects((s) => !s)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-on-primary/70 hover:bg-on-primary/10 font-label-lg text-label-lg transition-all duration-200 hover:scale-[1.02] active:scale-95 border-t border-on-primary/20 mt-2"
              >
                <span className="flex items-center gap-2">
                  <MatIcon name="library_books" className="text-[18px] text-on-primary/60" />
                  Otras materias
                </span>
                <MatIcon name={showSubjects ? 'expand_more' : 'chevron_right'} className="text-on-primary/60" />
              </button>
            </nav>
          </div>
          <div className="mt-auto bg-amber-400 text-tertiary p-4 rounded-xl relative overflow-hidden z-10 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
            <div className="absolute right-[-10px] bottom-[-10px] opacity-20">
              <MatIcon name="star" className="text-6xl" />
            </div>
            <h4 className="font-label-lg text-label-lg mb-1 flex items-center gap-2">
              <MatIcon name="star_outline" className="text-on-primary" />
              ¡Sigue aprendiendo!
            </h4>
            <p className="text-xs">Cada lección te acerca a nuevas aventuras.</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6 min-w-0">
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-display font-display text-primary mb-1">Lecciones</h1>
              <p className="text-on-surface-variant text-body-md font-body-md">
                {tab === 'lengua'
                  ? 'Aprende paso a paso y domina cada tema.'
                  : 'Descubre los derechos, la dignidad y la igualdad de la mujer.'}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full border border-outline-variant/30 text-label-sm font-label-sm cursor-pointer hover:bg-surface-dim transition-all duration-200 hover:scale-105 active:scale-95">
              {tab === 'lengua' ? 'Nivel: 2º - 5º grado' : 'Formación en valores'}
              <MatIcon name="expand_more" className="text-on-surface-variant" />
            </div>
          </header>

          {/* Featured Subject Card */}
          {tab === 'lengua' ? (
            <div className="bg-primary-fixed rounded-[24px] p-8 flex items-center justify-between relative overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer">
              <div className="flex items-center gap-6 z-10 pr-2 max-w-[62%]">
                <div className="w-20 h-20 bg-primary text-on-primary rounded-[20px] flex items-center justify-center text-5xl font-bold shadow-lg flex-shrink-0">
                  á
                </div>
                <div>
                  <h2 className="text-display font-display text-primary mb-2">Acentuación</h2>
                  <p className="text-on-surface-variant max-w-md text-body-lg font-body-lg">
                    Aprende a identificar y usar correctamente las palabras agudas, graves y esdrújulas.
                  </p>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 h-full w-[38%] max-w-[240px] flex items-end justify-end pointer-events-none">
                <img className="h-[85%] object-contain z-10 animate-float" alt="Edu con lápiz" src={mascotPencil} />
                <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent z-0 pointer-events-none"></div>
              </div>
            </div>
          ) : (
            <div className="bg-[#ede9fe] rounded-[24px] p-8 flex items-center justify-between relative overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.01] cursor-pointer">
              <div className="flex items-center gap-6 z-10 pr-2 max-w-[62%]">
                <div className="w-20 h-20 bg-primary text-on-primary rounded-[20px] flex items-center justify-center shadow-lg flex-shrink-0">
                  <MatIcon name="balance" className="text-5xl text-white" />
                </div>
                <div>
                  <h2 className="text-display font-display text-primary mb-2">Derechos y Dignidad de la Mujer</h2>
                  <p className="text-on-surface-variant max-w-md text-body-lg font-body-lg">
                    Conoce los derechos humanos, la dignidad, la igualdad de género y las mujeres que marcaron la historia.
                  </p>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 h-full w-[38%] max-w-[240px] flex items-end justify-end pointer-events-none">
                <img className="h-[85%] object-contain z-10 animate-float" alt="Edu con lápiz" src={mascotPencil} />
                <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent z-0 pointer-events-none"></div>
              </div>
            </div>
          )}

          {/* Lesson List */}
          <div className="flex flex-col gap-4">
            {(custom.length > 0 ? custom : []).map((lesson) => (
              <div
                key={lesson.number}
                className="rounded-xl p-4 flex items-center gap-6 cursor-pointer transition-all duration-200 hover:scale-[1.01] bg-surface-container-lowest border-2 border-dashed border-primary/40 shadow-sm hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-headline-md font-headline-md shadow-inner flex-shrink-0 bg-[#4c35de] text-white">
                  <MatIcon name="co_present" className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-headline-md font-headline-md mb-1 truncate text-primary">{lesson.title}</h3>
                    <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">Docente</span>
                  </div>
                  <p className="text-on-surface-variant text-body-md font-body-md truncate">{lesson.desc}</p>
                </div>
                <div className="w-24 h-16 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MatIcon name="menu_book" className="text-3xl text-primary" />
                </div>
                <div className="w-32 flex items-center justify-end gap-2 text-primary font-label-lg text-label-lg flex-shrink-0">
                  <MatIcon name="auto_stories" />
                  Nueva
                </div>
              </div>
            ))}

            {(tab === 'lengua' ? lessons : rightsLessons).slice(0, showAllLessons ? undefined : 4).map((lesson, index) => {
              const estado = estadoDe(lesson)
              return (
                <div
                  key={lesson.number}
                  onClick={() => toggleLeccion(lesson, index)}
                  className={`rounded-xl p-4 flex items-center gap-6 cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
                    estado === 'progress'
                      ? 'bg-surface-container-lowest border-2 border-amber-400 shadow-md relative hover:shadow-lg'
                      : estado === 'completed'
                      ? 'bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-lg'
                      : 'bg-surface-container/50 border border-outline-variant/20 opacity-80 hover:opacity-100 hover:shadow-md'
                  }`}
                >
                  {estado === 'progress' && (
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-amber-400 rounded-r-full"></div>
                  )}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-headline-md font-headline-md shadow-inner flex-shrink-0 ${lesson.circle}`}
                  >
                    {lesson.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-headline-md font-headline-md mb-1 truncate ${lesson.textColor}`}>{lesson.title}</h3>
                    <p className="text-on-surface-variant text-body-md font-body-md truncate">{lesson.desc}</p>
                  </div>
                  <div
                    className={`w-24 h-16 rounded flex items-center justify-center flex-shrink-0 ${
                      lesson.img ? '' : 'bg-white border border-outline-variant/20 shadow-sm relative'
                    } ${lesson.rotate || ''}`}
                  >
                    {lesson.img ? (
                      <img className="w-full h-full object-contain" alt={lesson.imgAlt} src={lesson.img} />
                    ) : (
                      <>
                        <span className="font-bold text-gray-800">{lesson.word}</span>
                        <div className={`absolute ${lesson.iconPos} ${lesson.iconColor}`}>
                          <MatIcon name={lesson.icon} className="text-xl" />
                        </div>
                      </>
                    )}
                  </div>
                  {estado === 'completed' ? (
                    <div className="w-32 flex items-center justify-end gap-2 text-green-600 font-label-lg text-label-lg flex-shrink-0">
                      <MatIcon name="check_circle" />
                      Completada
                    </div>
                  ) : estado === 'progress' ? (
                    <div className="w-32 flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-2 text-amber-500 font-label-lg text-label-lg">
                        <MatIcon name="radio_button_unchecked" />
                        En progreso
                      </div>
                      <span className="text-xs text-on-surface-variant">Toca para completar</span>
                    </div>
                  ) : (
                    <div className="w-32 flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-2 text-on-surface-variant font-label-lg text-label-lg">
                        <MatIcon name="lock" />
                        Bloqueada
                      </div>
                      <span className="text-[10px] text-on-surface-variant text-right leading-tight">
                        {lesson.number === 5 ? 'Completa las lecciones anteriores' : 'Completa la lección anterior'}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-2">
            <button
              onClick={() => setShowAllLessons((s) => !s)}
              className="bg-surface-container px-6 py-2 rounded-full text-primary font-label-lg text-label-lg border border-outline-variant/30 hover:bg-surface-dim transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              {showAllLessons ? 'Ver menos lecciones' : `Ver todas las lecciones (${(tab === 'lengua' ? lessons : rightsLessons).length + custom.length})`}
              <MatIcon name={showAllLessons ? 'expand_less' : 'expand_more'} />
            </button>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden lg:flex flex-col w-[320px] gap-6 flex-shrink-0">
          {/* Progress Card */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-md border border-outline-variant/20">
            <div className="p-5 bg-primary">
              <h3 className="font-label-lg text-label-lg text-on-primary flex items-center gap-2">
                <MatIcon name="monitoring" className="text-[20px] text-amber-300" />
                {tab === 'lengua' ? 'Tu progreso en Acentuación' : 'Tu progreso en Derechos'}
              </h3>
            </div>
            <div className="bg-surface-container-lowest text-on-surface p-6 flex flex-col gap-5">
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e6e8ea] stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="4"
                      pathLength="100"
                    ></path>
                    <path
                      className="text-primary stroke-current"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeDasharray={`${pct} ${100 - pct}`}
                      strokeLinecap="round"
                      strokeWidth="4"
                      pathLength="100"
                    ></path>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-1">
                    <span className="text-2xl leading-none font-bold text-primary">{pct}%</span>
                    <span className="text-[9px] text-on-surface-variant uppercase tracking-[0.08em] mt-0.5 leading-none">Completado</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <div className="flex gap-2 items-start">
                    <MatIcon name="library_add_check" className="text-primary text-lg mt-0.5" />
                    <div>
                      <p className="text-xs text-on-surface-variant">Lecciones completadas</p>
                      <p className="font-label-lg text-label-lg font-bold">{completadas} / {list.length}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <MatIcon name="hourglass_top" className="text-amber-500 text-lg mt-0.5" />
                    <div>
                      <p className="text-xs text-on-surface-variant">En progreso</p>
                      <p className="font-label-lg text-label-lg font-bold">{enProgreso} / {list.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-outline-variant/15 pt-4 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <MatIcon name="star" className="text-amber-400 text-xl" />
                  <div>
                    <p className="text-xs text-on-surface-variant">Estrellas ganadas</p>
                    <p className="font-label-lg text-label-lg font-bold">{puntos.toLocaleString('es')}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                  <MatIcon name="trending_up" className="text-[16px]" />
                  +{pct}%
                </span>
              </div>
            </div>
          </div>

          {/* Learning Goals */}
          <div className="bg-[#FFF8E7] rounded-[24px] p-6 relative overflow-hidden border border-[#FFE4A0] hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
            <h3 className="text-tertiary text-headline-md font-headline-md mb-4 relative z-10">Lo que aprenderás</h3>
            <ul className="flex flex-col gap-3 relative z-10 w-3/4">
              {(tab === 'lengua' ? goals : rightsGoals).map((goal, i) => (
                <li key={i} className="flex gap-2 items-start text-tertiary font-body-md text-sm">
                  <MatIcon name="check_circle" className="text-amber-500 text-lg shrink-0 mt-0.5" />
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          {/* Promo Banner */}
          <div className="bg-primary-fixed rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between min-h-[160px] hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
            <div className="absolute top-2 right-2 text-amber-400 opacity-50">
              <MatIcon name="star" />
            </div>
            <div className="absolute top-6 right-8 text-amber-400 opacity-80 scale-150">
              <MatIcon name="star" />
            </div>
            <div className="relative z-10 w-2/3">
              <h3 className="text-primary font-headline-md text-headline-md mb-2">¡Gana estrellas!</h3>
              <p className="text-on-surface-variant text-xs leading-relaxed">
                Completa lecciones y actividades para ganar estrellas y desbloquear recompensas.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
