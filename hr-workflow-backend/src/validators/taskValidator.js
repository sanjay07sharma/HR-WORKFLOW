const { body, param, query } = require('express-validator');
const { TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } = require('../constants');
const mongoose = require('mongoose');

/**
 * Validate MongoDB ObjectId
 */
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

/**
 * Task creation validation rules
 */
const createTaskRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .custom(isValidObjectId)
    .withMessage('Invalid category ID'),
  
  body('priority')
    .optional()
    .isIn(TASK_PRIORITY_VALUES)
    .withMessage(`Priority must be one of: ${TASK_PRIORITY_VALUES.join(', ')}`),
  
  body('assignee')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Assignee name cannot exceed 100 characters'),
  
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Each tag cannot exceed 50 characters')
];

/**
 * Task update validation rules
 */
const updateTaskRules = [
  param('id')
    .custom(isValidObjectId)
    .withMessage('Invalid task ID'),
  
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  body('status')
    .optional()
    .isIn(TASK_STATUS_VALUES)
    .withMessage(`Status must be one of: ${TASK_STATUS_VALUES.join(', ')}`),
  
  body('category')
    .optional()
    .custom(isValidObjectId)
    .withMessage('Invalid category ID'),
  
  body('priority')
    .optional()
    .isIn(TASK_PRIORITY_VALUES)
    .withMessage(`Priority must be one of: ${TASK_PRIORITY_VALUES.join(', ')}`),
  
  body('assignee')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Assignee name cannot exceed 100 characters'),
  
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

/**
 * Task status update validation rules
 */
const updateStatusRules = [
  param('id')
    .custom(isValidObjectId)
    .withMessage('Invalid task ID'),
  
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(TASK_STATUS_VALUES)
    .withMessage(`Status must be one of: ${TASK_STATUS_VALUES.join(', ')}`)
];

/**
 * Task ID param validation
 */
const taskIdRules = [
  param('id')
    .custom(isValidObjectId)
    .withMessage('Invalid task ID')
];

/**
 * Task list query validation
 */
const getTasksRules = [
  query('status')
    .optional()
    .custom((value) => {
      const statuses = value.split(',');
      return statuses.every((s) => TASK_STATUS_VALUES.includes(s.trim()));
    })
    .withMessage(`Status must be one of: ${TASK_STATUS_VALUES.join(', ')}`),
  
  query('category')
    .optional()
    .custom(isValidObjectId)
    .withMessage('Invalid category ID'),
  
  query('priority')
    .optional()
    .isIn(TASK_PRIORITY_VALUES)
    .withMessage(`Priority must be one of: ${TASK_PRIORITY_VALUES.join(', ')}`),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'dueDate', 'priority', 'title'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

module.exports = {
  createTaskRules,
  updateTaskRules,
  updateStatusRules,
  taskIdRules,
  getTasksRules
};
