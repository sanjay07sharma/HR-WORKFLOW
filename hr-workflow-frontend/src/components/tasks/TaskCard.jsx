import { Calendar, User, Tag } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatDate, isOverdue, cn } from '../../utils';

const TaskCard = ({ task, onClick, onStatusChange, compact = false }) => {
  const taskIsOverdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-4',
        'hover:shadow-md hover:border-gray-300 transition-all cursor-pointer',
        taskIsOverdue && 'border-l-4 border-l-red-400'
      )}
      onClick={() => onClick?.(task)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-medium text-gray-900 line-clamp-2 flex-1">
          {task.title}
        </h3>
        <PriorityBadge priority={task.priority} size="xs" />
      </div>

      {/* Description */}
      {!compact && task.description && (
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Category */}
      {task.category && (
        <div className="flex items-center gap-1.5 mb-3">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: task.category.color || '#6B7280' }}
          />
          <span className="text-xs text-gray-500">{task.category.name}</span>
        </div>
      )}

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        {task.dueDate && (
          <div className={cn(
            'flex items-center gap-1',
            taskIsOverdue && 'text-red-500 font-medium'
          )}>
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(task.dueDate)}
          </div>
        )}
        {task.assignee && (
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {task.assignee}
          </div>
        )}
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex items-center gap-1 flex-wrap mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-gray-400">+{task.tags.length - 3}</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <StatusBadge status={task.status} size="xs" />
        
        {/* Quick status change */}
        <select
          value={task.status}
          onChange={(e) => {
            e.stopPropagation();
            onStatusChange?.(task._id, e.target.value);
          }}
          onClick={(e) => e.stopPropagation()}
          className="text-xs bg-transparent border border-gray-200 rounded px-2 py-1 text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
