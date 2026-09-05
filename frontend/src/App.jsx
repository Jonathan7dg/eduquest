import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Juegos from './pages/Juegos'
import JuegosLengua from './pages/JuegosLengua'
import Lecciones from './pages/Lecciones'
import Perfil from './pages/Perfil'
import Progreso from './pages/Progreso'
import DerechoDignidad from './pages/DerechoDignidad'
import Trivia from './pages/Trivia'
import TriviaTimer from './pages/TriviaTimer'
import Docente from './pages/Docente'
import Login from './pages/Login'
import Register from './pages/Register'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

function RequireGuest({ children }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/" replace />
  return children
}

function RequireDocente({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'PROFESOR' && user.role !== 'ADMIN') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Inicio />} />
            <Route path="/juegos" element={<Juegos />} />
            <Route path="/juegos/lengua" element={<JuegosLengua />} />
            <Route path="/juegos/trivia-dignidad" element={<Trivia />} />
            <Route path="/juegos/trivia-dignidad-tiempo" element={<TriviaTimer />} />
            <Route path="/juegos/trivia-igualdad" element={<Trivia />} />
            <Route path="/juegos/trivia-igualdad-tiempo" element={<TriviaTimer />} />
            <Route path="/juegos/trivia-mujeres-historia" element={<Trivia />} />
            <Route path="/juegos/trivia-acentos" element={<Trivia />} />
            <Route path="/juegos/trivia-ortografia" element={<Trivia />} />
            <Route path="/juegos/trivia-vocabulario" element={<Trivia />} />
            <Route path="/juegos/trivia-gramatica" element={<Trivia />} />
            <Route path="/juegos/trivia-rima" element={<Trivia />} />
            <Route path="/juegos/trivia-literatura" element={<Trivia />} />
            <Route path="/juegos/trivia-:id" element={<Trivia />} />
            <Route path="/juegos/trivia/:id" element={<Trivia />} />
            <Route path="/lecciones" element={<Lecciones />} />
            <Route
              path="/docente"
              element={
                <RequireDocente>
                  <Docente />
                </RequireDocente>
              }
            />
            <Route path="/progreso" element={<Progreso />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/derecho-dignidad" element={<DerechoDignidad />} />
          </Route>
          <Route
            path="/login"
            element={
              <RequireGuest>
                <Login />
              </RequireGuest>
            }
          />
          <Route
            path="/registro"
            element={
              <RequireGuest>
                <Register />
              </RequireGuest>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
