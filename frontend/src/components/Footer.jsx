import { Link } from 'react-router-dom'
import logo from '../assets/logo_blue_yellow_transparent.png'

const navLinks = [
  { label: 'Aprende', to: '/lecciones' },
  { label: 'Juega', to: '/juegos' },
  { label: 'Descubre', to: '/derecho-dignidad' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1e40af] text-white py-10 px-container-padding flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-4">
        <img src={logo} alt="EduQuest" className="h-10 w-auto object-contain" />
        <nav className="hidden md:flex gap-4 text-sm font-semibold">
          {navLinks.map((item, i) => (
            <span key={item.label} className="flex items-center gap-4">
              {i > 0 && <span className="text-white/50">•</span>}
              <Link className="hover:text-white transition-all duration-200 hover:scale-105 active:scale-95" to={item.to}>
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <a
          className="w-10 h-10 bg-white text-[#1e40af] rounded-full flex items-center justify-center hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95"
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a
          className="w-10 h-10 bg-white text-[#1e40af] rounded-full flex items-center justify-center hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95"
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a
          className="w-10 h-10 bg-white text-[#1e40af] rounded-full flex items-center justify-center hover:bg-white/90 transition-all duration-200 hover:scale-110 active:scale-95"
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-youtube"></i>
        </a>
      </div>
    </footer>
  )
}