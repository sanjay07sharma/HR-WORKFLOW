# HR Workflow Management - Frontend

A modern React frontend for the HR Workflow Management System built with Vite, React, and Tailwind CSS.

## Features

- ✅ **List View** - Table view with filtering, sorting, and pagination
- ✅ **Kanban Board** - Drag-and-drop task management
- ✅ **Task Management** - Create, edit, view, and delete tasks
- ✅ **Status Updates** - Inline status changes in both views
- ✅ **Filtering** - Filter by status, category, and search
- ✅ **Responsive Design** - Works on desktop and tablet
- ✅ **Loading States** - Smooth loading indicators
- ✅ **Error Handling** - User-friendly error messages

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Icons:** Lucide React

## Project Structure

```
hr-workflow-frontend/
├── src/
│   ├── api/                    # API layer
│   │   ├── axiosInstance.js    # Configured axios
│   │   ├── taskApi.js          # Task endpoints
│   │   └── categoryApi.js      # Category endpoints
│   │
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ErrorMessage.jsx
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── tasks/              # Task components
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── PriorityBadge.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── FilterBar.jsx
│   │   │
│   │   ├── list/               # List view components
│   │   │   ├── TaskTable.jsx
│   │   │   └── Pagination.jsx
│   │   │
│   │   └── kanban/             # Kanban components
│   │       ├── KanbanBoard.jsx
│   │       ├── KanbanColumn.jsx
│   │       └── KanbanCard.jsx
│   │
│   ├── pages/                  # Route pages
│   │   ├── TaskListPage.jsx
│   │   └── KanbanPage.jsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTasks.js
│   │   ├── useCategories.js
│   │   └── useDebounce.js
│   │
│   ├── utils/                  # Utility functions
│   │   ├── formatters.js
│   │   └── helpers.js
│   │
│   ├── config/                 # Configuration
│   │   └── constants.js
│   │
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
│
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Quick Start

### Prerequisites

- Node.js >= 18.x
- Backend API running at http://localhost:5000

### Installation

```bash
# Navigate to frontend directory
cd hr-workflow-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:3000**

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Pages

### List View (`/tasks`)

- Table display with columns: Title, Category, Status, Priority, Due Date, Assignee
- Inline status dropdown for quick updates
- Search bar with debounced input
- Filter by status and category
- Pagination support
- Actions: View, Edit, Delete

### Kanban Board (`/kanban`)

- Three columns: New, In Progress, Done
- Drag and drop to change status
- Task cards with priority, category, due date
- Click to edit task
- Add task directly to specific column
- Category filter

## Components

### Common Components

- **Button** - Primary, secondary, ghost, danger variants
- **Modal** - Overlay modal with header and close button
- **Loader** - Spinning loader in sm/md/lg sizes
- **Badge** - Status and category badges
- **EmptyState** - Empty state with icon and action
- **ErrorMessage** - Error display with retry button

### Task Components

- **TaskCard** - Card display for list/kanban views
- **TaskForm** - Create/edit form with validation
- **StatusBadge** - Colored status indicator
- **PriorityBadge** - Priority level badge
- **FilterBar** - Search and filter controls

## API Integration

The frontend connects to the backend API at `/api/v1`. In development, Vite proxies requests to `http://localhost:5000`.

### Endpoints Used

- `GET /api/v1/tasks` - List tasks with filters
- `POST /api/v1/tasks` - Create task
- `PATCH /api/v1/tasks/:id` - Update task
- `PATCH /api/v1/tasks/:id/status` - Update status
- `DELETE /api/v1/tasks/:id` - Delete task
- `GET /api/v1/categories` - List categories

## State Management

Using React hooks for state management:

- **useTasks** - Tasks data, CRUD operations, filters
- **useCategories** - Categories data fetching
- **useDebounce** - Debounced search input

## Styling

Using Tailwind CSS with custom configuration:

- Primary color palette (blue)
- Custom scrollbar styles
- Responsive breakpoints
- Component-specific utilities

## Environment Variables

Create `.env` file for custom configuration:

```env
VITE_API_URL=http://localhost:5000
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
