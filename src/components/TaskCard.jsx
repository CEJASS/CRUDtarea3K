// Componente de tarjeta individual de tarea con borde de color según prioridad

// Clases de borde izquierdo según prioridad
const PRIORITY_BORDER = {
  alta: 'border-l-red-500',
  media: 'border-l-yellow-500',
  baja: 'border-l-emerald-500',
}

// Clases de badge según prioridad
const PRIORITY_BADGE = {
  alta: 'bg-red-900/50 text-red-300 border border-red-700/50',
  media: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50',
  baja: 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/50',
}

// Etiquetas de prioridad en español
const PRIORITY_LABEL = {
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
}

// Retorna true si la fecha límite ya pasó y la tarea no está completada
function isOverdue(dueDate, done) {
  if (!dueDate || done) return false
  return new Date(dueDate + 'T23:59:59') < new Date()
}

// Formatea una fecha ISO (YYYY-MM-DD) al formato DD/MM/YYYY
function formatDate(dateStr) {
  if (!dateStr) return null
  const [year, month, day] = dateStr.split('-')
  return `${day}/${month}/${year}`
}

export default function TaskCard({ task, onToggleDone, onEdit, onDelete }) {
  // Determina si la tarea está vencida para mostrar el indicador rojo
  const overdue = isOverdue(task.dueDate, task.done)

  return (
    <div
      className={`
        group relative bg-slate-900 border border-slate-800 border-l-4 ${PRIORITY_BORDER[task.priority]}
        rounded-xl p-4 shadow-md transition-all duration-200 hover:border-slate-700 hover:shadow-lg
        ${task.done ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox circular para marcar como completada/pendiente */}
        <button
          onClick={() => onToggleDone(task.id)}
          aria-label={task.done ? 'Marcar como pendiente' : 'Marcar como completada'}
          className={`
            mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-violet-500
            ${task.done
              ? 'bg-violet-600 border-violet-600 flex items-center justify-center'
              : 'border-slate-600 hover:border-violet-500 bg-transparent'
            }
          `}
        >
          {/* Ícono de check cuando la tarea está completada */}
          {task.done && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Contenido principal de la tarjeta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            {/* Título con tachado si está completada */}
            <h3
              className={`text-sm font-semibold text-slate-100 leading-snug ${task.done ? 'line-through text-slate-400' : ''}`}
            >
              {task.title}
            </h3>

            {/* Botones de editar y eliminar (visibles al pasar el cursor) */}
            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <button
                onClick={() => onEdit(task)}
                aria-label="Editar tarea"
                className="p-1.5 rounded-lg text-slate-400 hover:text-violet-400 hover:bg-slate-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task)}
                aria-label="Eliminar tarea"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Descripción opcional */}
          {task.description && (
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.description}</p>
          )}

          {/* Fila de badges: prioridad, categoría, fecha límite, estado */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {/* Badge de prioridad con color */}
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_BADGE[task.priority]}`}>
              {PRIORITY_LABEL[task.priority]}
            </span>

            {/* Badge de categoría */}
            {task.category && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {task.category}
              </span>
            )}

            {/* Badge de fecha límite (rojo si está vencida) */}
            {task.dueDate && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  overdue
                    ? 'bg-red-900/60 text-red-300 border border-red-700/60 font-semibold'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {/* Ícono de advertencia para tareas vencidas */}
                {overdue && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {overdue ? 'Vencida' : formatDate(task.dueDate)}
              </span>
            )}

            {/* Badge de estado completada */}
            {task.done && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-900/40 text-violet-300 border border-violet-700/40">
                Completada
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
