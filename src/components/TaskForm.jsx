// funcionalidad: formulario para agregar tarea
// Componente de formulario lateral para crear nuevas tareas
import { useState } from 'react'

// Valores iniciales del formulario vacío
const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'media',
  dueDate: '',
  category: '',
}

export default function TaskForm({ onAdd }) {
  // Estado del formulario y mensaje de error de validación
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  // Actualiza el campo correspondiente al cambiar un input
  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (e.target.name === 'title') setError('')
  }

  // Valida y envía el formulario; limpia los campos al agregar
  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('El título es obligatorio.')
      return
    }
    onAdd(form)
    setForm(EMPTY_FORM)
    setError('')
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <h2 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-xs text-white font-bold">+</span>
        Nueva Tarea
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Campo título (obligatorio) */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Título <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título de la tarea..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          />
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>

        {/* Campo descripción (opcional) */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción opcional..."
            rows={3}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition resize-none"
          />
        </div>

        {/* Selector de prioridad */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Prioridad</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        {/* Selector de fecha límite */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Fecha límite</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition [color-scheme:dark]"
          />
        </div>

        {/* Campo de categoría */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Categoría</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Ej. Trabajo, Personal..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="mt-1 w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Agregar Tarea
        </button>
      </form>
    </div>
  )
}
