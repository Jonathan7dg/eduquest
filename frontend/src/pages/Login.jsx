import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import mascot from '../assets/mascot.png'

const demoAccounts = [
  { label: 'Estudiante', username: 'estudiantesofia', password: 'estudiante123' },
  { label: 'Profesora', username: 'profemaria', password: 'profe123' },
  { label: 'Admin', username: 'admin', password: 'admin123' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(username, password)
    if (result.ok) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  const fillDemo = (account) => {
    setUsername(account.username)
    setPassword(account.password)
    setError('')
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent-yellow/20 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          {/* Mascota y eslogan */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-4 ring-primary/20 mb-3">
              <img src={mascot} alt="Mascota EduQuest" className="w-20 h-20 object-contain" />
            </div>
            <p className="font-handwritten text-xl text-primary">Aprende · Juega · Descubre</p>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800 text-center">¡Bienvenido de vuelta!</h1>
          <p className="text-sm text-slate-500 text-center mt-1 mb-5">
            Inicia sesión para continuar tu aventura de sensibilización y aprendizaje.
          </p>

          {/* Badges */}
          <div className="flex justify-center gap-2 mb-6">
            {[
              { icon: 'ph-fill ph-game-controller', label: 'Trivias' },
              { icon: 'ph-fill ph-trophy', label: 'Ranking' },
              { icon: 'ph-fill ph-shield-check', label: 'Derechos' },
            ].map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-1.5 bg-surface text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                <i className={`${b.icon} text-primary`}></i> {b.label}
              </span>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
                Nombre de Usuario
              </label>
              <div className="relative">
                <i className="ph ph-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-primary focus:outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <i className="ph ph-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl border-2 border-slate-200 focus:border-primary focus:outline-none transition-colors text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  aria-label="Mostrar contraseña"
                >
                  <i className={`ph text-lg ${showPassword ? 'ph-eye-slash' : 'ph-eye'}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm font-semibold px-4 py-3 rounded-2xl">
                <i className="ph-fill ph-warning-circle text-lg"></i> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
            >
              <i className="ph ph-sign-in"></i> Iniciar Sesión
            </button>
          </form>

          {/* Cuentas demo */}
          <div className="mt-6 p-4 bg-surface rounded-2xl">
            <p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
              <i className="ph-fill ph-user-circle text-primary"></i> Cuentas de demostración
            </p>
            <div className="flex flex-wrap gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.username}
                  onClick={() => fillDemo(account)}
                  className="text-xs font-semibold bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  {account.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500 text-center mt-6">
            ¿Aún no tienes una cuenta?{' '}
            <Link to="/registro" className="text-primary font-bold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
