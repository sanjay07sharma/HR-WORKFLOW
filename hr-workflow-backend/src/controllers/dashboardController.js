const { dashboardService } = require('../services');
const { asyncHandler, ApiResponse } = require('../utils');

/**
 * Dashboard Controller - Handle HTTP requests for dashboard data
 */

/**
 * @desc    Get dashboard summary (all aggregated data)
 * @route   GET /api/v1/dashboard/summary
 * @access  Public
 */
const getSummary = asyncHandler(async (req, res) => {
  const summary = await dashboardService.getSummary();
  ApiResponse.success(summary, 'Dashboard summary retrieved successfully').send(res);
});

/**
 * @desc    Get tasks grouped by status
 * @route   GET /api/v1/dashboard/tasks-by-status
 * @access  Public
 */
const getTasksByStatus = asyncHandler(async (req, res) => {
  const data = await dashboardService.getTasksByStatus();
  ApiResponse.success(data, 'Tasks by status retrieved successfully').send(res);
});

/**
 * @desc    Get tasks grouped by category
 * @route   GET /api/v1/dashboard/tasks-by-category
 * @access  Public
 */
const getTasksByCategory = asyncHandler(async (req, res) => {
  const data = await dashboardService.getTasksByCategory();
  ApiResponse.success(data, 'Tasks by category retrieved successfully').send(res);
});

/**
 * @desc    Get overdue tasks
 * @route   GET /api/v1/dashboard/overdue
 * @access  Public
 */
const getOverdueTasks = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const data = await dashboardService.getOverdueTasks(limit);
  ApiResponse.success(data, 'Overdue tasks retrieved successfully').send(res);
});

/**
 * @desc    Get recent activity feed
 * @route   GET /api/v1/dashboard/recent-activity
 * @access  Public
 */
const getRecentActivity = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const data = await dashboardService.getRecentActivity(limit);
  ApiResponse.success(data, 'Recent activity retrieved successfully').send(res);
});

/**
 * @desc    Get task completion trends
 * @route   GET /api/v1/dashboard/trends
 * @access  Public
 */
const getCompletionTrends = asyncHandler(async (req, res) => {
  const data = await dashboardService.getCompletionTrends();
  ApiResponse.success(data, 'Completion trends retrieved successfully').send(res);
});

/**
 * @desc    Get priority distribution
 * @route   GET /api/v1/dashboard/priority-distribution
 * @access  Public
 */
const getPriorityDistribution = asyncHandler(async (req, res) => {
  const data = await dashboardService.getPriorityDistribution();
  ApiResponse.success(data, 'Priority distribution retrieved successfully').send(res);
});

module.exports = {
  getSummary,
  getTasksByStatus,
  getTasksByCategory,
  getOverdueTasks,
  getRecentActivity,
  getCompletionTrends,
  getPriorityDistribution
};
