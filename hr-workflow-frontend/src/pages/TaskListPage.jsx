import { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Button, Modal, Loader, EmptyState, ErrorMessage } from '../components/common';
import { FilterBar, TaskForm } from '../components/tasks';
import { TaskTable, Pagination } from '../components/list';
import { useTasks } from '../hooks';
import taskApi from '../api/taskApi';

const TaskListPage = () => {
  const {
    tasks,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
  } = useTasks({ limit: 15 });

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

      const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
      const [isDeleteAllSubmitting, setIsDeleteAllSubmitting] = useState(false);
  // Handle view task
  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  // Handle create task submit
  const handleCreateSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await createTask(data);
      setIsCreateModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };


      // Handle delete all tasks
  const handleDeleteAllTasks = async () => {
    try {
      setIsDeleteAllSubmitting(true);
      await taskApi.deleteAllTasks();
      fetchTasks();
      setIsDeleteAllModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleteAllSubmitting(false);
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

  // Handle status change
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      await deleteTask(selectedTask._id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    updateFilters({ page });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Manage and track all HR workflow tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={fetchTasks} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
              <Button
                variant="danger"
                onClick={() => setIsDeleteAllModalOpen(true)}
                className="ml-2"
              >
                Delete All
              </Button>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={updateFilters}
        onReset={resetFilters}
      />

      {/* Content */}
      {loading && tasks.length === 0 ? (
        <div className="py-20">
          <Loader size="lg" />
        </div>
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchTasks} />
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description="Get started by creating your first task or adjust your filters."
          action={
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          }
        />
      ) : (
        <>
          <TaskTable
            tasks={tasks}
            onView={handleViewTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteClick}
            onStatusChange={handleStatusChange}
          />
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </>
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

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTask(null);
        }}
        title="Task Details"
        size="md"
      >
        {selectedTask && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Title</label>
              <p className="text-gray-900 font-medium">{selectedTask.title}</p>
            </div>
            {selectedTask.description && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Description</label>
                <p className="text-gray-700">{selectedTask.description}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                <p className="text-gray-900 capitalize">{selectedTask.status?.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Priority</label>
                <p className="text-gray-900 capitalize">{selectedTask.priority}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Category</label>
                <p className="text-gray-900">{selectedTask.category?.name || '-'}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Assignee</label>
                <p className="text-gray-900">{selectedTask.assignee || 'Unassigned'}</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleEditTask(selectedTask);
                }}
              >
                Edit Task
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTask(null);
        }}
        title="Delete Task"
        size="sm"

      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete{' '}
            <span className="font-medium text-gray-900">"{selectedTask?.title}"</span>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedTask(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              loading={isSubmitting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskListPage;
