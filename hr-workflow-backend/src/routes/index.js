const express = require('express');
const router = express.Router();

const taskRoutes = require('./taskRoutes');
const categoryRoutes = require('./categoryRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const { Category } = require('../models');
const { DEFAULT_CATEGORIES } = require('../constants');

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

// One-time seed endpoint (safe to call multiple times — skips if categories exist)
router.get('/seed', async (req, res) => {
  try {
    const existing = await Category.countDocuments();
    if (existing > 0) {
      return res.json({
        success: true,
        message: `Categories already seeded (${existing} found). No changes made.`
      });
    }
    const categories = await Category.insertMany(DEFAULT_CATEGORIES);
    res.json({
      success: true,
      message: `Seeded ${categories.length} categories successfully.`,
      data: categories.map((c) => c.name)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Mount routes
router.use('/tasks', taskRoutes);
router.use('/categories', categoryRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
