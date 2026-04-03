# TaskFlow — Gestor de Tareas

Una aplicación web CRUD de gestión de tareas construida con **React 19** y **Tailwind CSS 3**, usando **Vite** como herramienta de construcción.

---

## Funcionalidades

### Operaciones CRUD
| Operación | Descripción |
|-----------|-------------|
| **Crear** | Agrega tareas con título (obligatorio), descripción, prioridad (baja/media/alta), fecha límite y categoría |
| **Leer** | Las tareas se muestran como tarjetas en una lista filtrada en tiempo real |
| **Actualizar** | Modal de edición con todos los campos pre-rellenos; marcar como completada/pendiente con un clic |
| **Eliminar** | Elimina tareas individuales con modal de confirmación; botón para limpiar todas las completadas |

### Funcionalidades extra
- Filtrar por estado: **Todas / Pendientes / Completadas**
- Filtrar por prioridad mediante un menú desplegable
- Búsqueda en tiempo real por título, descripción y categoría
- **Indicador de vencimiento** (badge rojo) cuando la fecha límite ha pasado y la tarea no está completada
- Contadores de tareas en el encabezado fijo: Total · Pendientes · Completadas
- **Persistencia con localStorage** — las tareas se conservan al recargar la página

### Diseño
- Tema oscuro (paleta slate/zinc de Tailwind)
- Color de acento: **Violeta**
- Diseño completamente responsivo: formulario lateral + lista principal en escritorio, apilados en móvil
- Encabezado fijo con logo y contadores en vivo
- Tarjetas con borde izquierdo de color según prioridad:
  - Rojo — Alta
  - Amarillo — Media
  - Verde — Baja
- Tareas completadas: título tachado + opacidad reducida
- Prioridad y fecha mostradas como badges de colores
- Botones de editar y eliminar visibles al pasar el cursor por la tarjeta
- Modales con fondo difuminado (backdrop blur)

---

## Tecnologías utilizadas

| Herramienta | Uso |
|-------------|-----|
| [React 19](https://react.dev/) | Framework de interfaz de usuario |
| [Vite](https://vite.dev/) | Herramienta de construcción y servidor de desarrollo |
| [Tailwind CSS 3](https://tailwindcss.com/) | Estilos con clases utilitarias |
| localStorage | Persistencia de datos en el cliente |

---

## Cómo ejecutar localmente

```bash
# 1. Entrar al directorio del proyecto
cd taskflow

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Compilar para producción

```bash
npm run build
npm run preview
```

---

## Estructura de archivos

```
taskflow/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Encabezado fijo con logo y contadores de tareas
│   │   ├── TaskForm.jsx      # Panel lateral con el formulario para crear tareas
│   │   ├── TaskList.jsx      # Lista filtrada con búsqueda y controles de filtro
│   │   ├── TaskCard.jsx      # Tarjeta individual de tarea
│   │   ├── EditModal.jsx     # Modal para editar tarea con campos pre-rellenos
│   │   └── DeleteModal.jsx   # Modal de confirmación para eliminar con backdrop blur
│   ├── App.jsx               # Componente raíz: estado global, localStorage y lógica CRUD
│   ├── index.css             # Directivas de Tailwind y reset base
│   └── main.jsx              # Punto de entrada de React
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Estrategia de ramas con Git Flow

Este proyecto sigue el modelo de ramificación **Git Flow**:

| Rama | Propósito |
|------|-----------|
| `main` | Código listo para producción. Solo recibe merges desde `release/*` y `hotfix/*` |
| `dev` | Rama de integración. Todas las ramas de funcionalidades se fusionan aquí |
| `qa` | Rama de pruebas de calidad antes de pasar a producción |
| `feature/task-list` | Implementa el componente de lista de tareas |
| `feature/add-task` | Implementa el formulario de creación de tareas |
| `feature/edit-task` | Implementa el modal de edición de tareas |
| `feature/delete-task` | Implementa el modal de confirmación para eliminar |
| `feature/filter-tasks` | Agrega filtros por estado, prioridad y búsqueda |
| `hotfix/fix-date-format` | Corrección urgente del formato de visualización de fechas |

### Flujo general

```
main ◄──── qa ◄──── dev ◄──── feature/*
 ▲
 └──── hotfix/*
```
