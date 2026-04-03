// funcionalidad: filtros y búsqueda
// Componente de lista de tareas: incluye búsqueda, filtros por estado y prioridad, y renderiza las tarjetas
import TaskCard from './TaskCard'

// Opciones de filtro por estado
const STATUS_TABS = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'done', label: 'Completadas' },
]

// Opciones de filtro por prioridad
const PRIORITY_OPTIONS = [
  { value: 'all', label: 'Todas las prioridades' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'baja', label: 'Baja' },
]

export default function TaskList({
  tasks,
  statusFilter, setStatusFilter,
  priorityFilter, setPriorityFilter,
  searchQuery, setSearchQuery,
  onToggleDone, onEdit, onDelete,
  onClearCompleted, completedCount,
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Barra de búsqueda en tiempo real */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Buscar por título, descripción o categoría..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
        />
        {/* Botón para limpiar la búsqueda */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Fila de controles de filtro */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Pestañas de filtro por estado */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 gap-1">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-150 ${
                statusFilter === tab.value
                  ? 'bg-violet-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menú desplegable de prioridad */}
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        >
          {PRIORITY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Botón para eliminar todas las tareas completadas */}
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="ml-auto px-3 py-1.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 border border-red-800/40 transition-colors duration-150"
          >
            Eliminar {completedCount} completada{completedCount !== 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Lista de tarjetas o estado vacío */}
      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-2.5">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleDone={onToggleDone}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Componente de estado vacío cuando no hay tareas que mostrar
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <svg
        className="w-14 h-14 text-slate-700 mb-4"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p className="text-slate-500 text-sm">No se encontraron tareas.</p>
      <p className="text-slate-600 text-xs mt-1">Agrega una usando el formulario de la izquierda.</p>
    </div>
  )
}
