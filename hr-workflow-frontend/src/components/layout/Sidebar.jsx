import { NavLink } from 'react-router-dom';
import { LayoutList, Columns, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '../../utils';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/tasks', label: 'List View', icon: LayoutList },
  { path: '/kanban', label: 'Kanban', icon: Columns }
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/zoro.jpg" alt="HR Workflow" className="w-8 h-8 object-contain" />
          <span className="font-semibold text-gray-900">HR Workflow</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
          Views
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              {item.disabled ? (
                <span
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
                    'text-gray-400 cursor-not-allowed'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                  <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded">Soon</span>
                </span>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                      'transition-colors duration-200',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
