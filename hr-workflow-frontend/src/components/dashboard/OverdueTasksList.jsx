import { AlertTriangle, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatRelativeDate } from '../../utils';

const OverdueTasksList = ({ tasks = [] }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Overdue Tasks</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🎉</span>
          </div>
          <p className="text-gray-600 font-medium">No overdue tasks!</p>
          <p className="text-sm text-gray-500">Great job staying on top of things.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-gray-900">Overdue Tasks</h3>
          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
            {tasks.length}
          </span>
        </div>
        <Link
          to="/tasks?overdue=true"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-3">
        {tasks.slice(0, 5).map((task) => (
          <div
            key={task._id}
            className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg"
          >
            <div className="flex-shrink-0 w-2 h-2 mt-2 bg-red-500 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{task.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
                  <Calendar className="w-3 h-3" />
                  {formatRelativeDate(task.dueDate)}
                </div>
                {task.category && (
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: task.category.color }}
                    />
                    <span className="text-xs text-gray-500">{task.category.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverdueTasksList;
