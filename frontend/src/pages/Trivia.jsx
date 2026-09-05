import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { getTriviaById } from '../data/trivia'
import { addResultado } from '../data/store'
import { useAuth } from '../context/AuthContext'

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

export default function Trivia() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const trivia = getTriviaById(id || pathname.split('/').pop())
  const { user } = useAuth()

  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [finished, setFinished] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (finished && !saved && trivia) {
      setSaved(true)
      addResultado({
        usuario: user ? user.username : 'invitado',
        nombre: user ? `${user.firstName} ${user.lastName}`.trim() : 'Invitado',
        triviaId: trivia.id,
        triviaTitulo: trivia.title,
        tipo: 'trivia',
        puntaje: score,
        aciertos: answered,
        total: total,
        precision: percent
      })
    }
  })

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

  const handleSelect = (index) => {
    if (selected !== null) return
    setSelected(index)
    const isCorrect = index === question.correct
    if (isCorrect) {
      setScore((s) => s + question.points)
      playTone(880, 0.2)
    } else {
      playTone(220, 0.3)
    }
  }

  const next = () => {
    if (selected !== null && selected === question.correct) setAnswered((a) => a + 1)
    if (current + 1 >= total) {
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const restart = () => {
    setStarted(true)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setAnswered(0)
    setFinished(false)
    setSaved(false)
  }

  const percent = Math.round((answered / total) * 100)
  const stars = percent >= 80 ? 3 : percent >= 50 ? 2 : percent >= 20 ? 1 : 0

  /* ---------- Pantalla de inicio ---------- */
  if (!started) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-surface overflow-y-auto">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-4xl mb-6 animate-float">
            <i className="ph-fill ph-medal"></i>
          </div>
          <h1 className="text-3xl font-extrabold text-primary mb-2">{trivia.title}</h1>
          <p className="text-slate-500 text-sm mb-8 max-w-md mx-auto">{trivia.description}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full text-sm font-semibold text-slate-600">
              <i className="ph ph-list-checks text-primary text-lg"></i> {total} preguntas
            </span>
            <span className="flex items-center gap-2 bg-surface px-4 py-2 rounded-full text-sm font-semibold text-slate-600">
              <i className="ph-fill ph-star text-accent-yellow text-lg"></i> {total * 100} puntos
            </span>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="px-10 py-3.5 rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <i className="ph ph-play mr-2"></i> Comenzar trivia
          </button>
        </div>
      </div>
    )
  }

  /* ---------- Pantalla de resultados ---------- */
  if (finished) {
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
            {percent >= 80 ? '¡Excelente!' : percent >= 50 ? '¡Buen trabajo!' : '¡Sigue practicando!'}
          </h1>
          <p className="text-slate-500 text-sm mb-6">Terminaste "{trivia.title}"</p>
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
        {/* Progreso */}
        <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
          <span>
            Pregunta <span className="text-primary font-extrabold">{current + 1}</span> de {total}
          </span>
          <span className="flex items-center gap-1.5">
            <i className="ph-fill ph-star text-accent-yellow"></i> {score} pts
          </span>
        </div>
        <div className="progress-bar-track h-3">
          <div
            className="progress-bar-fill bg-primary transition-all duration-500"
            style={{ width: `${((current + (selected !== null ? 1 : 0)) / total) * 100}%` }}
          ></div>
        </div>

        {/* Tarjeta de pregunta */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">
            <i className="ph ph-lightning text-sm"></i> {question.points} puntos
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-6 leading-snug">{question.text}</h2>
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => {
              const isCorrectOption = selected !== null && index === question.correct
              const isWrongPick = selected === index && index !== question.correct
              return (
                <button
                  key={option}
                  onClick={() => handleSelect(index)}
                  disabled={selected !== null}
                  className={`flex items-center gap-4 text-left px-5 py-3.5 rounded-2xl border-2 font-semibold transition-all duration-200 ${
                    isCorrectOption
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : isWrongPick
                        ? 'border-red-400 bg-red-50 text-red-600'
                        : selected !== null
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
                          : 'bg-surface text-slate-600'
                    }`}
                  >
                    {isCorrectOption ? <i className="ph-fill ph-check"></i> : isWrongPick ? <i className="ph-fill ph-x"></i> : LETTERS[index]}
                  </span>
                  <span className="flex-1">{option}</span>
                </button>
              )
            })}
          </div>

          {/* Retroalimentación */}
          {selected !== null && (
            <div
              className={`mt-6 p-4 rounded-2xl flex gap-3 ${
                selected === question.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'
              }`}
            >
              <i
                className={`ph-fill text-2xl ${selected === question.correct ? 'ph-check-circle text-green-500' : 'ph-x-circle text-red-500'}`}
              ></i>
              <div>
                <p className="font-bold text-sm">
                  {selected === question.correct ? '¡Correcto!' : 'Incorrecto'}
                </p>
                <p className="text-sm mt-1 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={next}
            disabled={selected === null}
            className={`px-8 py-3 rounded-full font-bold transition-all duration-200 ${
              selected !== null
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
