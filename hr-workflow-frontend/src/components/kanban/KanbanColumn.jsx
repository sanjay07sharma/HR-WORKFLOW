import { useState } from 'react';
import { Plus } from 'lucide-react';
import KanbanCard from './KanbanCard';
import { TASK_STATUS_LABELS, TASK_STATUS_COLORS } from '../../config';
import { cn } from '../../utils';

const KanbanColumn = ({
  status,
  tasks,
  onTaskClick,
  onStatusChange,
  onAddTask
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const colors = TASK_STATUS_COLORS[status];
  const label = TASK_STATUS_LABELS[status];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const taskId = e.dataTransfer.getData('taskId');
    const fromStatus = e.dataTransfer.getData('fromStatus');
    
    if (fromStatus !== status && taskId) {
      onStatusChange(taskId, status);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col bg-gray-100 rounded-lg w-80 flex-shrink-0',
        isDragOver && 'ring-2 ring-primary-400 ring-opacity-50'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn('w-2.5 h-2.5 rounded-full', colors.dot)} />
            <h3 className="font-semibold text-gray-700">{label}</h3>
            <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
              {tasks.length}
            </span>
          </div>
          <button
            onClick={() => onAddTask(status)}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
            title="Add task"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-250px)]">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-sm text-gray-400">Drop tasks here</p>
          </div>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task._id}
              task={task}
              onClick={onTaskClick}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
