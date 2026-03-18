const express = require('express');
const router = express.Router();

const taskRoutes = require('./taskRoutes');
const categoryRoutes = require('./categoryRoutes');
const dashboardRoutes = require('./dashboardRoutes');

/**
 * API Routes Aggregator
 * All routes are prefixed with /api/v1
 */

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HR Workflow API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount routes
router.use('/tasks', taskRoutes);
router.use('/categories', categoryRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
