const express = require('express');
const router = express.Router();
const { categoryController } = require('../controllers');
const { validateRequest } = require('../middleware');
const {
  createCategoryRules,
  updateCategoryRules,
  categoryIdRules
} = require('../validators');

/**
 * Category Routes
 * Base path: /api/v1/categories
 */

// GET /categories - Get all categories
router.get('/', categoryController.getCategories);

// POST /categories - Create new category
router.post('/', createCategoryRules, validateRequest, categoryController.createCategory);

// GET /categories/:id - Get single category
router.get('/:id', categoryIdRules, validateRequest, categoryController.getCategoryById);

// PATCH /categories/:id - Update category
router.patch('/:id', updateCategoryRules, validateRequest, categoryController.updateCategory);

// DELETE /categories/:id - Delete (deactivate) category
router.delete('/:id', categoryIdRules, validateRequest, categoryController.deleteCategory);

module.exports = router;
