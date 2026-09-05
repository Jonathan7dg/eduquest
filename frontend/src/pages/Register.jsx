import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, TEACHER_CODE } from '../context/AuthContext'
import mascot from '../assets/mascot.png'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: 'ESTUDIANTE',
    institution: '',
    teacherCode: '',
    password: '',
    password2: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.password2) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    if (form.role === 'PROFESOR' && !form.teacherCode.trim()) {
      setError('Ingresa el código de docente para crear una cuenta de profesor.')
      return
    }
    const result = register(form)
    if (result.ok) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-primary focus:outline-none transition-colors text-sm'

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          {/* Mascota y eslogan */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden ring-4 ring-primary/20 mb-3">
              <img src={mascot} alt="Mascota EduQuest" className="w-20 h-20 object-contain" />
            </div>
            <p className="font-handwritten text-xl text-primary">Únete a la aventura</p>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-800 text-center">Crea tu Cuenta</h1>
          <p className="text-sm text-slate-500 text-center mt-1 mb-5">
            Únete como Estudiante o Profesor y promueve los Derechos de las Mujeres.
          </p>

          {/* Badges */}
          <div className="flex justify-center gap-2 mb-6">
            {[
              { icon: 'ph-fill ph-graduation-cap', label: 'Estudiante' },
              { icon: 'ph-fill ph-teacher', label: 'Profesor' },
              { icon: 'ph-fill ph-sparkle', label: 'Gratis' },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-1">
                  Nombre(s)
                </label>
                <input id="firstName" type="text" value={form.firstName} onChange={set('firstName')} placeholder="Ej. Maria Luisa" className={inputClass} required />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-1">
                  Apellidos
                </label>
                <input id="lastName" type="text" value={form.lastName} onChange={set('lastName')} placeholder="Ej. Garcia Perez" className={inputClass} required />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1">
                Nombre de usuario
              </label>
              <input id="username" type="text" value={form.username} onChange={set('username')} placeholder="Nombre de usuario único" className={inputClass} required />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                Correo Electrónico
              </label>
              <input id="email" type="email" value={form.email} onChange={set('email')} placeholder="correo@ejemplo.com" className={inputClass} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-slate-700 mb-1">
                  Tipo de Cuenta / Rol
                </label>
                <select id="role" value={form.role} onChange={set('role')} className={inputClass}>
                  <option value="ESTUDIANTE">Estudiante / Jugador</option>
                  <option value="PROFESOR">Profesor / Educador</option>
                </select>
              </div>
              {form.role === 'PROFESOR' && (
                <div className="sm:col-span-2">
                  <label htmlFor="teacherCode" className="block text-sm font-semibold text-slate-700 mb-1">
                    Código de Docente
                  </label>
                  <input
                    id="teacherCode"
                    type="password"
                    value={form.teacherCode}
                    onChange={set('teacherCode')}
                    placeholder="Código para crear cuentas de profesor"
                    className={inputClass}
                    required
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Solo el profesorado autorizado puede crear cuentas de docente. Código demo:{' '}
                    <code className="font-mono font-bold text-primary">{TEACHER_CODE}</code>
                  </p>
                </div>
              )}
              <div>
                <label htmlFor="institution" className="block text-sm font-semibold text-slate-700 mb-1">
                  Escuela o Institución (Opcional)
                </label>
                <input id="institution" type="text" value={form.institution} onChange={set('institution')} placeholder="Ej. Escuela Secundaria Técnica #12" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={set('password')}
                    placeholder="Crea una contraseña segura"
                    className={`${inputClass} pr-11`}
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
              <div>
                <label htmlFor="password2" className="block text-sm font-semibold text-slate-700 mb-1">
                  Confirmar contraseña
                </label>
                <input id="password2" type={showPassword ? 'text' : 'password'} value={form.password2} onChange={set('password2')} placeholder="Confirma tu contraseña" className={inputClass} required />
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
              <i className="ph-fill ph-sparkle"></i> Completar Registro
            </button>
          </form>

          <p className="text-sm text-slate-500 text-center mt-6">
            ¿Ya tienes una cuenta registrada?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
