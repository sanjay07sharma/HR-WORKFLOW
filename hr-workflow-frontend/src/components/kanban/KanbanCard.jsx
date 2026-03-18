import { Calendar, User } from 'lucide-react';
import PriorityBadge from '../tasks/PriorityBadge';
import { formatDate, isOverdue, cn } from '../../utils';

const KanbanCard = ({ task, onClick, onStatusChange, isDragging = false }) => {
  const taskIsOverdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className={cn(
        'bg-white rounded-lg border p-3 cursor-pointer',
        'hover:shadow-md transition-all',
        isDragging ? 'shadow-lg border-primary-300 opacity-90' : 'border-gray-200',
        taskIsOverdue && 'border-l-4 border-l-red-400'
      )}
      onClick={() => onClick?.(task)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('taskId', task._id);
        e.dataTransfer.setData('fromStatus', task.status);
      }}
    >
      {/* Priority & Category */}
      <div className="flex items-center justify-between mb-2">
        <PriorityBadge priority={task.priority} size="xs" />
        {task.category && (
          <div className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: task.category.color || '#6B7280' }}
            />
            <span className="text-xs text-gray-500 truncate max-w-[80px]">
              {task.category.name}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2">
        {task.title}
      </h4>

      {/* Description preview */}
      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span className="text-xs text-gray-400">+{task.tags.length - 2}</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        {/* Due date */}
        {task.dueDate ? (
          <div
            className={cn(
              'flex items-center gap-1 text-xs',
              taskIsOverdue ? 'text-red-600 font-medium' : 'text-gray-500'
            )}
          >
            <Calendar className="w-3 h-3" />
            {formatDate(task.dueDate)}
          </div>
        ) : (
          <span />
        )}

        {/* Assignee avatar */}
        {task.assignee && (
          <div
            className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center"
            title={task.assignee}
          >
            <span className="text-xs font-medium text-primary-700">
              {task.assignee.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanCard;
