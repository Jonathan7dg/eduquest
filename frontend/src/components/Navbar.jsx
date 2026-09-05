import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPuntosUsuario, RESULTADOS_EVENT } from '../data/store'
import logo from '../assets/logo_yellow_blue_transparent.png'

const links = [
  { to: '/', label: 'Inicio', icon: 'fa-solid fa-house' },
  { to: '/juegos', label: 'Juegos', icon: 'fa-solid fa-gamepad' },
  { to: '/lecciones', label: 'Lecciones', icon: 'fa-solid fa-book-open' },
  { to: '/progreso', label: 'Progreso', icon: 'fa-solid fa-chart-line' },
  { to: '/perfil', label: 'Perfil', icon: 'fa-regular fa-user' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { user, roleLabel, logout } = useAuth()
  const navigate = useNavigate()
  const esDocente = user && (user.role === 'PROFESOR' || user.role === 'ADMIN')
  const active =
    pathname === '/' ? 'Inicio' : links.find((l) => l.to !== '/' && pathname.startsWith(l.to))?.label || ''

  const [puntos, setPuntos] = useState(() => (user ? getPuntosUsuario(user.username) : 0))

  useEffect(() => {
    setPuntos(user ? getPuntosUsuario(user.username) : 0)
    const onUpdate = () => setPuntos(user ? getPuntosUsuario(user.username) : 0)
    window.addEventListener(RESULTADOS_EVENT, onUpdate)
    return () => window.removeEventListener(RESULTADOS_EVENT, onUpdate)
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white sticky top-0 z-50 border-b border-gray-100">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="EduQuest" className="h-9 w-auto object-contain" />
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className={`flex items-center gap-2 cursor-pointer transition-all duration-200 hover:text-primary hover:scale-105 active:scale-95 ${
              active === link.label ? 'text-primary border-b-2 border-primary pb-1' : ''
            }`}
          >
            <i className={link.icon}></i> {link.label}
          </Link>
        ))}
        {esDocente && (
          <Link
            to="/docente"
            className={`flex items-center gap-2 cursor-pointer transition-all duration-200 hover:text-primary hover:scale-105 active:scale-95 ${
              active === 'Docente' ? 'text-primary border-b-2 border-primary pb-1' : 'text-amber-600'
            }`}
          >
            <i className="fa-solid fa-chalkboard-user"></i> Panel docente
          </Link>
        )}
      </nav>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-primary text-white px-4 py-1.5 rounded-full font-bold gap-2 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
          <i className="fa-solid fa-star text-secondary"></i> {puntos.toLocaleString('es')}
        </div>
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/perfil" className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95">
              <div className="w-9 h-9 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-extrabold text-sm">
                {(user.firstName?.[0] || user.username[0]).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-slate-700 leading-tight">
                  {user.firstName || user.username}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">{roleLabel}</div>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-all duration-200 hover:scale-105 active:scale-95"
              title="Cerrar sesión"
            >
              <i className="fa-solid fa-right-from-bracket"></i> Salir
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-bold text-primary hover:underline">
              Iniciar Sesión
            </Link>
            <Link
              to="/registro"
              className="text-sm font-bold bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
