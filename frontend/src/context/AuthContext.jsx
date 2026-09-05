import { createContext, useContext, useEffect, useState } from 'react'

const USERS_KEY = 'eduquest_users'
const SESSION_KEY = 'eduquest_session'

export const TEACHER_CODE = 'EDUQUEST2024'

const demoUsers = [
  {
    username: 'admin',
    password: 'admin123',
    firstName: 'Administrador',
    lastName: 'Sistema',
    email: 'admin@eduquest.org',
    role: 'ADMIN',
    institution: 'Dirección EduQuest',
  },
  {
    username: 'profemaria',
    password: 'profe123',
    firstName: 'Maria Carmen',
    lastName: 'Lopez',
    email: 'maria.profe@escuela.edu',
    role: 'PROFESOR',
    institution: 'Secundaria General #4',
  },
  {
    username: 'estudiantesofia',
    password: 'estudiante123',
    firstName: 'Sofia',
    lastName: 'Hernandez',
    email: 'sofia.estudiante@escuela.edu',
    role: 'ESTUDIANTE',
    institution: 'Secundaria General #4',
  },
]

const ROLE_LABELS = {
  ADMIN: 'Administrador',
  PROFESOR: 'Profesor / Educador',
  ESTUDIANTE: 'Estudiante / Jugador',
}

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignorar */
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers))
  return demoUsers
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers)
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY))
    } catch {
      return null
    }
  })

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  }, [user])

  const login = (username, password) => {
    const found = users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password,
    )
    if (!found) return { ok: false, error: 'Usuario o contraseña incorrectos.' }
    const { password: _pw, ...safeUser } = found
    setUser(safeUser)
    return { ok: true }
  }

  const register = ({ username, password, firstName, lastName, email, role, institution, teacherCode }) => {
    const name = username.trim().toLowerCase()
    if (!name) return { ok: false, error: 'El nombre de usuario es obligatorio.' }
    if (users.some((u) => u.username.toLowerCase() === name))
      return { ok: false, error: 'Este nombre de usuario ya está en uso.' }
    if (role === 'PROFESOR' && teacherCode !== TEACHER_CODE)
      return { ok: false, error: 'El código de docente es incorrecto.' }
    const newUser = {
      username: username.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role,
      institution: institution.trim(),
    }
    setUsers((prev) => [...prev, newUser])
    const { password: _pw, ...safeUser } = newUser
    setUser(safeUser)
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        roleLabel: user ? ROLE_LABELS[user.role] || user.role : '',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
