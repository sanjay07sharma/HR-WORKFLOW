import { Edit2, Trash2, Eye, Calendar, User } from 'lucide-react';
import StatusBadge from '../tasks/StatusBadge';
import PriorityBadge from '../tasks/PriorityBadge';
import { formatDate, isOverdue, cn } from '../../utils';

const TaskTable = ({ tasks, onView, onEdit, onDelete, onStatusChange, selectedIds = [], onSelectChange }) => {
  const allSelected = tasks.length > 0 && tasks.every(t => selectedIds.includes(t._id));
  const someSelected = tasks.some(t => selectedIds.includes(t._id)) && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectChange([]);
    } else {
      onSelectChange(tasks.map(t => t._id));
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      onSelectChange(selectedIds.filter(sid => sid !== id));
    } else {
      onSelectChange([...selectedIds, id]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={el => { if (el) el.indeterminate = someSelected; }}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                />
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => {
              const taskIsOverdue = isOverdue(task.dueDate, task.status);
              
              return (
                <tr
                  key={task._id}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    taskIsOverdue && 'bg-red-50/50'
                  )}
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(task._id)}
                      onChange={() => handleSelectOne(task._id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                    />
                  </td>

                  {/* Task Title */}
                  <td className="px-4 py-3">
                    <div className="max-w-xs">
                      <p className="font-medium text-gray-900 truncate">
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-sm text-gray-500 truncate mt-0.5">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3">
                    {task.category && (
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: task.category.color || '#6B7280' }}
                        />
                        <span className="text-sm text-gray-600 truncate">
                          {task.category.name}
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange(task._id, e.target.value)}
                      className="text-xs bg-transparent border border-gray-200 rounded px-2 py-1.5 text-gray-600 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
                    >
                      <option value="new">New</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-3">
                    <PriorityBadge priority={task.priority} />
                  </td>

                  {/* Due Date */}
                  <td className="px-4 py-3">
                    {task.dueDate ? (
                      <div
                        className={cn(
                          'flex items-center gap-1.5 text-sm',
                          taskIsOverdue ? 'text-red-600 font-medium' : 'text-gray-600'
                        )}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(task.dueDate)}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>

                  {/* Assignee */}
                  <td className="px-4 py-3">
                    {task.assignee ? (
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <User className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[120px]">{task.assignee}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Unassigned</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onView(task)}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(task)}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(task)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
