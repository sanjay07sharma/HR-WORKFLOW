import { useState } from 'react';
import { Plus, RefreshCw, Filter } from 'lucide-react';
import { Button, Modal, Loader, ErrorMessage } from '../components/common';
import { TaskForm } from '../components/tasks';
import { KanbanBoard } from '../components/kanban';
import { useTasks, useCategories } from '../hooks';
import { TASK_STATUS } from '../config';

const KanbanPage = () => {
  const {
    tasks,
    loading,
    error,
    filters,
    updateFilters,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus
  } = useTasks({ limit: 100 }); // Fetch more for Kanban view

  const { categories } = useCategories();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState(TASK_STATUS.NEW);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Handle task click
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Handle add task from column
  const handleAddTask = (status) => {
    setDefaultStatus(status);
    setIsCreateModalOpen(true);
  };

  // Handle status change (drag & drop)
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle create task submit
  const handleCreateSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await createTask({ ...data, status: defaultStatus });
      setIsCreateModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit task submit
  const handleEditSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await updateTask(selectedTask._id, data);
      setIsEditModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle category filter
  const handleCategoryFilter = (categoryId) => {
    updateFilters({ category: categoryId || undefined });
  };

  // Count tasks by status
  const taskCounts = {
    new: tasks.filter((t) => t.status === TASK_STATUS.NEW).length,
    in_progress: tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length,
    done: tasks.filter((t) => t.status === TASK_STATUS.DONE).length
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Drag and drop tasks to change their status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="secondary" onClick={fetchTasks} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => {
            setDefaultStatus(TASK_STATUS.NEW);
            setIsCreateModalOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {filters.category && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCategoryFilter('')}
              >
                Clear Filter
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-gray-600">New</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{taskCounts.new}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-sm font-medium text-gray-600">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{taskCounts.in_progress}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-gray-600">Done</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">{taskCounts.done}</p>
        </div>
      </div>

      {/* Content */}
      {loading && tasks.length === 0 ? (
        <div className="py-20">
          <Loader size="lg" />
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchTasks} />
      ) : (
        <KanbanBoard
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onStatusChange={handleStatusChange}
          onAddTask={handleAddTask}
        />
      )}

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={isSubmitting}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        title="Edit Task"
        size="lg"
      >
        <TaskForm
          task={selectedTask}
          onSubmit={handleEditSubmit}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedTask(null);
          }}
          loading={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default KanbanPage;
