const { taskService } = require('../services');
const { asyncHandler, ApiResponse } = require('../utils');

/**
 * Task Controller - Handle HTTP requests for tasks
 */

/**
 * @desc    Get all tasks with filters and pagination
 * @route   GET /api/v1/tasks
 * @access  Public
 */
const getTasks = asyncHandler(async (req, res) => {
  const result = await taskService.getTasks(req.query);
  
  res.status(200).json({
    success: true,
    message: 'Tasks retrieved successfully',
    data: result.tasks,
    pagination: result.pagination
  });
});

/**
 * @desc    Get single task by ID
 * @route   GET /api/v1/tasks/:id
 * @access  Public
 */
const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);
  ApiResponse.success(task, 'Task retrieved successfully').send(res);
});

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Public
 */
const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body);
  ApiResponse.created(task, 'Task created successfully').send(res);
});

/**
 * @desc    Update task
 * @route   PATCH /api/v1/tasks/:id
 * @access  Public
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  ApiResponse.success(task, 'Task updated successfully').send(res);
});

/**
 * @desc    Update task status only
 * @route   PATCH /api/v1/tasks/:id/status
 * @access  Public
 */
const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await taskService.updateTaskStatus(req.params.id, req.body.status);
  ApiResponse.success(task, 'Task status updated successfully').send(res);
});

/**
 * @desc    Delete (archive) task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Public
 */
const deleteTask = asyncHandler(async (req, res) => {
  const result = await taskService.deleteTask(req.params.id);
  ApiResponse.success(result, result.message).send(res);
});

/**
 * @desc    Reorder task (Kanban drag-drop)
 * @route   PATCH /api/v1/tasks/reorder
 * @access  Public
 */
const reorderTask = asyncHandler(async (req, res) => {
  const { taskId, newStatus, newOrder } = req.body;
  const task = await taskService.reorderTask(taskId, newStatus, newOrder);
  ApiResponse.success(task, 'Task reordered successfully').send(res);
});

/**
 * @desc    Get task activity log
 * @route   GET /api/v1/tasks/:id/activity
 * @access  Public
 */
const getTaskActivity = asyncHandler(async (req, res) => {
  const result = await taskService.getTaskActivity(req.params.id, req.query);
  
  res.status(200).json({
    success: true,
    message: 'Activity log retrieved successfully',
    data: result.activities,
    pagination: result.pagination
  });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  reorderTask,
  getTaskActivity
  ,
  /**
   * @desc    Delete all tasks
   * @route   DELETE /api/v1/tasks/all
   * @access  Public
   */
  deleteAllTasks: asyncHandler(async (req, res) => {
    const result = await taskService.deleteAllTasks();
    ApiResponse.success(result, result.message).send(res);
  })
};
