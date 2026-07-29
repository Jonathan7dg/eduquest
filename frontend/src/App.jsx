import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎮 EduQuest
        </h1>
        <p className="text-gray-600 mb-6">
          Plataforma educativa gamificada para estudiantes de secundaria y docentes.
        </p>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Puntos: {count}
        </button>
      </div>
    </div>
  )
}

export default App
