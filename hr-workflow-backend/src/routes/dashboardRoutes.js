const express = require('express');
const router = express.Router();
const { dashboardController } = require('../controllers');

/**
 * Dashboard Routes
 * Base path: /api/v1/dashboard
 */

// GET /dashboard/summary - Get complete dashboard summary
router.get('/summary', dashboardController.getSummary);

// GET /dashboard/tasks-by-status - Get tasks grouped by status
router.get('/tasks-by-status', dashboardController.getTasksByStatus);

// GET /dashboard/tasks-by-category - Get tasks grouped by category
router.get('/tasks-by-category', dashboardController.getTasksByCategory);

// GET /dashboard/overdue - Get overdue tasks
router.get('/overdue', dashboardController.getOverdueTasks);

// GET /dashboard/recent-activity - Get recent activity feed
router.get('/recent-activity', dashboardController.getRecentActivity);

// GET /dashboard/trends - Get completion trends
router.get('/trends', dashboardController.getCompletionTrends);

// GET /dashboard/priority-distribution - Get priority distribution
router.get('/priority-distribution', dashboardController.getPriorityDistribution);

module.exports = router;
