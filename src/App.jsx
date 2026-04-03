// hotfix: corrección en el formato de visualización de fechas
// Componente raíz: maneja el estado global, la lógica CRUD y la persistencia con localStorage
import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import EditModal from './components/EditModal'
import DeleteModal from './components/DeleteModal'
import './index.css'

// Clave utilizada para guardar y recuperar tareas en localStorage
const STORAGE_KEY = 'taskflow_tasks'

// Genera un ID único combinando timestamp y valor aleatorio
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export default function App() {
  // Inicializa el estado leyendo desde localStorage (si existe)
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Estados para los filtros y la búsqueda
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Estado para controlar qué modal está abierto
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  // Persiste las tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // Agrega una nueva tarea al inicio de la lista
  function addTask(formData) {
    const newTask = {
      id: generateId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate,
      category: formData.category.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
  }

  // Actualiza los campos de una tarea existente por su ID
  function updateTask(id, updates) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  // Alterna el estado completada/pendiente de una tarea
  function toggleDone(id) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  // Elimina una tarea por su ID y cierra el modal
  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
    setDeletingTask(null)
  }

  // Elimina todas las tareas marcadas como completadas
  function clearCompleted() {
    setTasks(prev => prev.filter(t => !t.done))
  }

  // Calcula los contadores del encabezado de forma memorizada
  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => !t.done).length,
    completed: tasks.filter(t => t.done).length,
  }), [tasks])

  // Filtra y busca tareas según los criterios activos
  const filteredTasks = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return tasks.filter(task => {
      if (statusFilter === 'pending' && task.done) return false
      if (statusFilter === 'done' && !task.done) return false
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false
      if (query) {
        const inTitle = task.title.toLowerCase().includes(query)
        const inDesc = task.description.toLowerCase().includes(query)
        const inCat = task.category.toLowerCase().includes(query)
        if (!inTitle && !inDesc && !inCat) return false
      }
      return true
    })
  }, [tasks, statusFilter, priorityFilter, searchQuery])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Encabezado fijo con logo y contadores */}
      <Header stats={stats} />

      {/* Diseño principal: sidebar + lista */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Panel lateral con el formulario de creación */}
        <aside className="lg:w-80 flex-shrink-0">
          <TaskForm onAdd={addTask} />
        </aside>

        {/* Sección principal con la lista de tareas */}
        <section className="flex-1 min-w-0">
          <TaskList
            tasks={filteredTasks}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onToggleDone={toggleDone}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
            onClearCompleted={clearCompleted}
            completedCount={stats.completed}
          />
        </section>
      </main>

      {/* Modal de edición (se muestra solo cuando hay una tarea siendo editada) */}
      {editingTask && (
        <EditModal
          task={editingTask}
          onSave={(updates) => {
            updateTask(editingTask.id, updates)
            setEditingTask(null)
          }}
          onClose={() => setEditingTask(null)}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {deletingTask && (
        <DeleteModal
          task={deletingTask}
          onConfirm={() => deleteTask(deletingTask.id)}
          onClose={() => setDeletingTask(null)}
        />
      )}
    </div>
  )
}
