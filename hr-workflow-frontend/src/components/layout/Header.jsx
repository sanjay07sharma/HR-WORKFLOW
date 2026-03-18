import { Bell, Search, User } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search (placeholder) */}
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-600" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">HR Admin</p>
            <p className="text-xs text-gray-500">admin@company.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
