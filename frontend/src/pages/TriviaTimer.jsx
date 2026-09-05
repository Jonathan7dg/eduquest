import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { getTriviaById } from '../data/trivia'
import { addResultado } from '../data/store'
import { useAuth } from '../context/AuthContext'

const TOTAL_SECONDS = 15

function playTone(freq, duration = 0.18) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.12, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch {
    /* sin audio disponible */
  }
}

const LETTERS = ['A', 'B', 'C', 'D']

export default function TriviaTimer() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const trivia = getTriviaById(id || pathname.split('/').pop())
  const { user } = useAuth()

  const [phase, setPhase] = useState('start')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [remaining, setRemaining] = useState(TOTAL_SECONDS)
  const [earned, setEarned] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [timeBonus, setTimeBonus] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (phase === 'results' && !saved && trivia) {
      setSaved(true)
      addResultado({
        usuario: user ? user.username : 'invitado',
        nombre: user ? `${user.firstName} ${user.lastName}`.trim() : 'Invitado',
        triviaId: trivia.id,
        triviaTitulo: trivia.title,
        tipo: 'contrarreloj',
        puntaje: score,
        aciertos: answered,
        total: trivia.questions.length,
        precision: Math.round((answered / trivia.questions.length) * 100),
        bonus: timeBonus,
      })
    }
  })

  useEffect(() => {
    if (phase !== 'answering') return
    setRemaining(TOTAL_SECONDS)
    const timer = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(timer)
          setSelected(null)
          setEarned(0)
          setPhase('feedback')
          playTone(180, 0.4)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase, current])

  if (!trivia) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 bg-surface text-center">
        <i className="ph ph-sad text-7xl text-slate-300"></i>
        <h1 className="text-2xl font-extrabold text-slate-700">Trivia no encontrada</h1>
        <Link
          to="/juegos"
          className="px-6 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Volver a juegos
        </Link>
      </div>
    )
  }

  const total = trivia.questions.length
  const question = trivia.questions[current]
  const pct = (remaining / TOTAL_SECONDS) * 100
  const timerColor =
    pct > 60 ? 'bg-green-500' : pct > 30 ? 'bg-accent-yellow' : 'bg-red-500'
  const timerText =
    pct > 60 ? 'text-green-600' : pct > 30 ? 'text-[#b45309]' : 'text-red-600'

  const handleSelect = (index) => {
    if (phase !== 'answering') return
    setSelected(index)
    const isCorrect = index === question.correct
    const timePts = Math.ceil((remaining / TOTAL_SECONDS) * 100)
    const points = isCorrect ? 100 + timePts : 0
    setEarned(points)
    if (isCorrect) {
      setScore((s) => s + points)
      setAnswered((a) => a + 1)
      setTimeBonus((t) => t + timePts)
      playTone(880, 0.2)
    } else {
      playTone(220, 0.3)
    }
    setPhase('feedback')
  }

  const next = () => {
    if (current + 1 >= total) {
      setPhase('results')
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setEarned(0)
      setPhase('answering')
    }
  }

  const restart = () => {
    setPhase('answering')
    setCurrent(0)
    setSelected(null)
    setRemaining(TOTAL_SECONDS)
    setEarned(0)
    setScore(0)
    setAnswered(0)
    setTimeBonus(0)
    setSaved(false)
  }

  const maxScore = total * 200
  const stars = score >= maxScore * 0.8 ? 3 : score >= maxScore * 0.5 ? 2 : score >= maxScore * 0.25 ? 1 : 0

  /* ---------- Pantalla de inicio ---------- */
  if (phase === 'start') {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-surface overflow-y-auto">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-accent-orange/15 text-accent-orange flex items-center justify-center text-4xl mb-6 animate-float">
            <i className="ph-fill ph-timer"></i>
          </div>
          <h1 className="text-3xl font-extrabold text-primary mb-2">{trivia.title}</h1>
          <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">
            Prueba contrarreloj: responde cada pregunta antes de que se acabe el tiempo. Mientras más rápido
            respondas, ¡más puntos ganas!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full text-sm font-semibold text-slate-600">
              <i className="ph ph-list-checks text-primary text-lg"></i> {total} preguntas
            </span>
            <span className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full text-sm font-semibold text-slate-600">
              <i className="ph-fill ph-timer text-accent-orange text-lg"></i> {TOTAL_SECONDS} segundos c/u
            </span>
            <span className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full text-sm font-semibold text-slate-600">
              <i className="ph-fill ph-lightning text-accent-yellow text-lg"></i> Hasta {200} pts por pregunta
            </span>
          </div>
          <button
            onClick={() => setPhase('answering')}
            className="px-10 py-3.5 rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <i className="ph ph-play mr-2"></i> ¡A jugar!
          </button>
        </div>
      </div>
    )
  }

  /* ---------- Pantalla de resultados ---------- */
  if (phase === 'results') {
    const percent = Math.round((answered / total) * 100)
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-surface overflow-y-auto">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
          <div className="text-6xl mb-4 text-primary">
            <i className={trivia.icon}></i>
          </div>
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <i
                key={i}
                className={`ph-fill ph-star text-4xl ${i < stars ? 'text-accent-yellow' : 'text-slate-200'}`}
              ></i>
            ))}
          </div>
          <h1 className="text-3xl font-extrabold text-primary mb-2">
            {stars === 3 ? '¡Increíble!' : stars === 2 ? '¡Muy bien!' : stars === 1 ? '¡Buen intento!' : '¡A practicar!'}
          </h1>
          <p className="text-slate-500 text-sm mb-6">Resultado de la prueba contrarreloj</p>
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-surface rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-primary">{score}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Puntos</div>
            </div>
            <div className="bg-surface rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-primary">{answered}/{total}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Aciertos</div>
            </div>
            <div className="bg-surface rounded-2xl p-4">
              <div className="text-2xl font-extrabold text-primary">{percent}%</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Precisión</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 mb-8">
            <i className="ph-fill ph-lightning text-accent-yellow"></i> Bonus por rapidez: {timeBonus} pts
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={restart}
              className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <i className="ph ph-arrow-counter-clockwise mr-2"></i> Jugar de nuevo
            </button>
            <Link
              to="/juegos"
              className="px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Volver a juegos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ---------- Pantalla de pregunta ---------- */
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-surface overflow-y-auto">
      <div className="max-w-2xl w-full flex flex-col gap-6">
        {/* Cabecera: progreso + cronómetro */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <span>
              Pregunta <span className="text-primary font-extrabold">{current + 1}</span> de {total}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ph-fill ph-star text-accent-yellow"></i> {score} pts
            </span>
          </div>
          <div
            className={`flex items-center gap-1.5 font-extrabold text-xl tabular-nums ${timerText} ${
              phase === 'answering' && remaining <= 5 ? 'animate-pulse' : ''
            }`}
          >
            <i className="ph-fill ph-timer"></i>
            <span>{remaining}</span>
          </div>
        </div>

        {/* Barra de tiempo */}
        <div className="progress-bar-track h-3 relative">
          <div
            className={`progress-bar-fill ${timerColor} transition-all duration-1000 ease-linear`}
            style={{ width: `${pct}%` }}
          ></div>
        </div>

        {/* Tarjeta de pregunta */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
          <span className="inline-flex items-center gap-1.5 bg-accent-orange/15 text-accent-orange text-xs font-bold px-3 py-1 rounded-full mb-4">
            <i className="ph-fill ph-lightning text-sm"></i> 100 pts + bonus por tiempo
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-6 leading-snug">{question.text}</h2>
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => {
              const isCorrectOption = phase === 'feedback' && index === question.correct
              const isWrongPick = selected === index && index !== question.correct
              const isTimedOut = phase === 'feedback' && selected === null
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(index)}
                  disabled={phase === 'feedback'}
                  className={`flex items-center gap-4 text-left px-5 py-3.5 rounded-2xl border-2 font-semibold transition-all duration-200 ${
                    isCorrectOption
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : isWrongPick
                        ? 'border-red-400 bg-red-50 text-red-600'
                        : phase === 'feedback'
                          ? 'border-slate-100 bg-slate-50 text-slate-400'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-primary hover:bg-primary/5 hover:scale-[1.01] active:scale-[0.99]'
                  }`}
                >
                  <span
                    className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-extrabold ${
                      isCorrectOption
                        ? 'bg-green-500 text-white'
                        : isWrongPick
                          ? 'bg-red-400 text-white'
                          : phase === 'feedback'
                            ? 'bg-slate-200 text-slate-500'
                            : 'bg-surface text-slate-600'
                    }`}
                  >
                    {isCorrectOption ? (
                      <i className="ph-fill ph-check"></i>
                    ) : isWrongPick ? (
                      <i className="ph-fill ph-x"></i>
                    ) : (
                      LETTERS[index]
                    )}
                  </span>
                  <span className="flex-1">{option}</span>
                </button>
              )
            })}
          </div>

          {/* Retroalimentación */}
          {phase === 'feedback' && (
            <div
              className={`mt-6 p-4 rounded-2xl flex gap-3 ${
                selected !== null && selected === question.correct
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              <i
                className={`ph-fill text-2xl ${
                  selected !== null && selected === question.correct
                    ? 'ph-check-circle text-green-500'
                    : 'ph-x-circle text-red-500'
                }`}
              ></i>
              <div>
                <p className="font-bold text-sm">
                  {selected === null
                    ? '¡Se acabó el tiempo!'
                    : selected === question.correct
                      ? `¡Correcto! +${earned} pts`
                      : 'Incorrecto'}
                </p>
                <p className="text-sm mt-1 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={next}
            disabled={phase !== 'feedback'}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-200 ${
              phase === 'feedback'
                ? 'bg-primary text-white hover:bg-primary-dark hover:scale-105 active:scale-95'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {current + 1 >= total ? 'Ver resultados' : 'Siguiente pregunta'}
            <i className="ph ph-caret-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
