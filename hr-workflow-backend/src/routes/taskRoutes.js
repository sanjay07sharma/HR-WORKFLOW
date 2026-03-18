const express = require('express');
const router = express.Router();
const { taskController } = require('../controllers');
const { validateRequest } = require('../middleware');
const {
  createTaskRules,
  updateTaskRules,
  updateStatusRules,
  taskIdRules,
  getTasksRules
} = require('../validators');

/**
 * Task Routes
 * Base path: /api/v1/tasks
 */

// GET /tasks - Get all tasks with filters
router.get('/', getTasksRules, validateRequest, taskController.getTasks);

// POST /tasks - Create new task
router.post('/', createTaskRules, validateRequest, taskController.createTask);

// PATCH /tasks/reorder - Reorder task (Kanban)
router.patch('/reorder', taskController.reorderTask);

// GET /tasks/:id - Get single task
router.get('/:id', taskIdRules, validateRequest, taskController.getTaskById);

// PATCH /tasks/:id - Update task
router.patch('/:id', updateTaskRules, validateRequest, taskController.updateTask);

// DELETE /tasks/:id - Delete (archive) task
router.delete('/:id', taskIdRules, validateRequest, taskController.deleteTask);

// PATCH /tasks/:id/status - Update task status only
router.patch('/:id/status', updateStatusRules, validateRequest, taskController.updateTaskStatus);

// GET /tasks/:id/activity - Get task activity log
router.get('/:id/activity', taskIdRules, validateRequest, taskController.getTaskActivity);

// DELETE /tasks/all - Delete all tasks
router.delete('/all', taskController.deleteAllTasks);

module.exports = router;
