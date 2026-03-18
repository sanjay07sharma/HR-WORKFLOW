import KanbanColumn from './KanbanColumn';
import { TASK_STATUS } from '../../config';

const KanbanBoard = ({ tasks, onTaskClick, onStatusChange, onAddTask }) => {
  // Group tasks by status
  const tasksByStatus = {
    [TASK_STATUS.NEW]: tasks.filter((t) => t.status === TASK_STATUS.NEW),
    [TASK_STATUS.IN_PROGRESS]: tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS),
    [TASK_STATUS.DONE]: tasks.filter((t) => t.status === TASK_STATUS.DONE)
  };

  const columns = [
    { status: TASK_STATUS.NEW, tasks: tasksByStatus[TASK_STATUS.NEW] },
    { status: TASK_STATUS.IN_PROGRESS, tasks: tasksByStatus[TASK_STATUS.IN_PROGRESS] },
    { status: TASK_STATUS.DONE, tasks: tasksByStatus[TASK_STATUS.DONE] }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          status={column.status}
          tasks={column.tasks}
          onTaskClick={onTaskClick}
          onStatusChange={onStatusChange}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
