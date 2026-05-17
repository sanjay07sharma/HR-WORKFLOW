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

# HR Workflow Management System - Backend API

A production-ready REST API for HR workflow management built with Node.js, Express, and MongoDB.

## Features

- ✅ Task lifecycle management (New → In Progress → Done)
- ✅ Category-based organization (Visa, Payroll, Onboarding, etc.)
- ✅ Dashboard aggregations with real-time statistics
- ✅ Activity logging for audit trails
- ✅ Pagination, filtering, and sorting
- ✅ Input validation with express-validator
- ✅ Centralized error handling
- ✅ Clean architecture (Controller → Service → Repository)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Validation:** express-validator
- **Logging:** Morgan

## Prerequisites

- Node.js >= 18.x
- MongoDB >= 6.x (local or MongoDB Atlas)
- npm or yarn

## Project Structure

```
hr-workflow-backend/
├── src/
│   ├── config/           # Configuration (DB, CORS, env)
│   ├── constants/        # App constants (status, priority)
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   ├── scripts/          # Seed and utility scripts
│   ├── services/         # Business logic layer
│   ├── utils/            # Utility functions
│   ├── validators/       # Request validation rules
│   ├── app.js            # Express app configuration
│   └── index.js          # Entry point
├── .env.example          # Environment variables template
├── package.json
└── README.md
```

## Quick Start

### 1. Install Dependencies

```bash
cd hr-workflow-backend
npm install
```

### 2. Configure Environment

Create a `.env` file (or copy from `.env.example`):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/hr_workflow
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows (if MongoDB is installed)
mongod

# Or use MongoDB Compass to connect to localhost:27017
```

**Option B: MongoDB Atlas**
- Create a free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
- Update `MONGODB_URI` in `.env` with your connection string

### 4. Seed Sample Data

```bash
npm run seed
```

This will create:
- 8 HR categories (Visa, Payroll, Onboarding, etc.)
- 22 sample tasks across different statuses and categories

### 5. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start at `http://localhost:5000`

## API Endpoints

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | API health check |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | Get all tasks (with filters) |
| POST | `/api/v1/tasks` | Create a new task |
| GET | `/api/v1/tasks/:id` | Get task by ID |
| PATCH | `/api/v1/tasks/:id` | Update a task |
| DELETE | `/api/v1/tasks/:id` | Archive a task |
| PATCH | `/api/v1/tasks/:id/status` | Update task status |
| GET | `/api/v1/tasks/:id/activity` | Get task activity log |
| PATCH | `/api/v1/tasks/reorder` | Reorder task (Kanban) |

#### Query Parameters for GET /tasks
- `status` - Filter by status (comma-separated): `new,in_progress,done`
- `category` - Filter by category ID
- `priority` - Filter by priority: `low,medium,high,urgent`
- `assignee` - Filter by assignee name (partial match)
- `search` - Search in title and description
- `overdue` - Show only overdue tasks: `true`
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sortBy` - Sort field: `createdAt,updatedAt,dueDate,priority,title`
- `sortOrder` - Sort order: `asc,desc`

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/categories` | Get all categories |
| POST | `/api/v1/categories` | Create a category |
| GET | `/api/v1/categories/:id` | Get category by ID |
| PATCH | `/api/v1/categories/:id` | Update a category |
| DELETE | `/api/v1/categories/:id` | Deactivate a category |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dashboard/summary` | Get complete dashboard summary |
| GET | `/api/v1/dashboard/tasks-by-status` | Tasks grouped by status |
| GET | `/api/v1/dashboard/tasks-by-category` | Tasks grouped by category |
| GET | `/api/v1/dashboard/overdue` | Get overdue tasks |
| GET | `/api/v1/dashboard/recent-activity` | Recent activity feed |
| GET | `/api/v1/dashboard/trends` | Completion trends (7 days) |
| GET | `/api/v1/dashboard/priority-distribution` | Priority distribution |

## Example API Calls

### Create a Task
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Process visa application",
    "description": "Complete documentation for H1B visa",
    "category": "CATEGORY_ID_HERE",
    "priority": "high",
    "assignee": "John Doe",
    "dueDate": "2026-03-25T00:00:00.000Z"
  }'
```

### Get Tasks with Filters
```bash
# Get all in-progress tasks
curl "http://localhost:5000/api/v1/tasks?status=in_progress"

# Get high priority visa tasks
curl "http://localhost:5000/api/v1/tasks?category=CATEGORY_ID&priority=high"

# Search tasks
curl "http://localhost:5000/api/v1/tasks?search=visa"

# Paginated results
curl "http://localhost:5000/api/v1/tasks?page=1&limit=10&sortBy=dueDate&sortOrder=asc"
```

### Update Task Status
```bash
curl -X PATCH http://localhost:5000/api/v1/tasks/TASK_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'
```

### Get Dashboard Summary
```bash
curl http://localhost:5000/api/v1/dashboard/summary
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Tasks retrieved successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3,
    "hasMore": true,
    "hasPrev": false
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "title", "message": "Title is required" }
  ]
}
```

## Data Models

### Task
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Task title (max 200 chars) |
| description | String | No | Task description (max 2000 chars) |
| status | String | No | `new`, `in_progress`, `done` (default: `new`) |
| category | ObjectId | Yes | Reference to Category |
| priority | String | No | `low`, `medium`, `high`, `urgent` (default: `medium`) |
| assignee | String | No | Assignee name |
| dueDate | Date | No | Task due date |
| tags | [String] | No | Array of tags |
| kanbanOrder | Number | No | Order in Kanban column |

### Category
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Category name |
| slug | String | Yes | URL-friendly identifier |
| description | String | No | Category description |
| color | String | No | Hex color code |
| icon | String | No | Icon identifier |
| displayOrder | Number | No | Display order in UI |

## Development

### Running Tests
```bash
npm test
```

### Code Style
The project follows standard JavaScript conventions. Use ESLint for linting:
```bash
npm run lint
```

## Deployment Notes

1. Set `NODE_ENV=production`
2. Use a managed MongoDB service (Atlas recommended)
3. Configure proper CORS origins
4. Use a process manager like PM2
5. Set up rate limiting for production

## License

MIT
