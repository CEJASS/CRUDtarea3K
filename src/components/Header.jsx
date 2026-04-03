// Componente de encabezado fijo: muestra el logo de la app y los contadores de tareas en tiempo real
export default function Header({ stats }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo de la aplicación */}
        <div className="flex items-center gap-2">
          <svg
            className="w-7 h-7 text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          <span className="text-xl font-bold tracking-tight text-white">
            Task<span className="text-violet-400">Flow</span>
          </span>
        </div>

        {/* Contadores de tareas: total, pendientes y completadas */}
        <div className="flex items-center gap-3 text-sm">
          <Stat label="Total" value={stats.total} color="text-slate-300" bg="bg-slate-700" />
          <Stat label="Pendientes" value={stats.pending} color="text-amber-300" bg="bg-amber-900/40" />
          <Stat label="Completadas" value={stats.completed} color="text-emerald-300" bg="bg-emerald-900/40" />
        </div>
      </div>
    </header>
  )
}

// Componente auxiliar para mostrar cada indicador numérico
function Stat({ label, value, color, bg }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${bg}`}>
      <span className={`font-bold text-base ${color}`}>{value}</span>
      <span className="text-slate-400 text-xs hidden sm:inline">{label}</span>
    </div>
  )
}
