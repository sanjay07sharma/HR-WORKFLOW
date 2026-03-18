import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import TaskListPage from './pages/TaskListPage';
import KanbanPage from './pages/KanbanPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tasks" element={<TaskListPage />} />
          <Route path="kanban" element={<KanbanPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
