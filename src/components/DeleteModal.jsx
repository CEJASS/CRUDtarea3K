// Componente modal de confirmación de eliminación con fondo desenfocado
import { useEffect } from 'react'

export default function DeleteModal({ task, onConfirm, onClose }) {
  // Permite cerrar el modal presionando la tecla Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Fondo oscuro con efecto de desenfoque */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel del modal centrado */}
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 text-center">
        {/* Ícono de advertencia */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900/40 border border-red-700/40 mx-auto mb-4">
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        {/* Título y mensaje de confirmación */}
        <h2 className="text-base font-semibold text-slate-100 mb-1">Eliminar Tarea</h2>
        <p className="text-sm text-slate-400 mb-1">
          ¿Estás seguro de que deseas eliminar
        </p>
        {/* Nombre de la tarea a eliminar */}
        <p className="text-sm font-medium text-slate-200 mb-5 truncate px-2">
          &ldquo;{task.title}&rdquo;
        </p>
        <p className="text-xs text-slate-500 mb-5">Esta acción no se puede deshacer.</p>

        {/* Botones de cancelar y confirmar eliminación */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
