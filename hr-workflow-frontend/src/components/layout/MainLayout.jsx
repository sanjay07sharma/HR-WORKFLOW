import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles = {
  '/tasks': 'Task List',
  '/kanban': 'Kanban Board',
  '/dashboard': 'Dashboard'
};

const MainLayout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'HR Workflow';

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 z-50">
        <Sidebar />
      </div>
      {/* Main area with left margin for sidebar */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40">
          <Header title={title} />
        </div>
        {/* Scrollable main content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
