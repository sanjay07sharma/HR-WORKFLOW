const { categoryService } = require('../services');
const { asyncHandler, ApiResponse } = require('../utils');

/**
 * Category Controller - Handle HTTP requests for categories
 */

/**
 * @desc    Get all categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories();
  ApiResponse.success(categories, 'Categories retrieved successfully').send(res);
});

/**
 * @desc    Get single category by ID
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  ApiResponse.success(category, 'Category retrieved successfully').send(res);
});

/**
 * @desc    Create new category
 * @route   POST /api/v1/categories
 * @access  Public
 */
const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  ApiResponse.created(category, 'Category created successfully').send(res);
});

/**
 * @desc    Update category
 * @route   PATCH /api/v1/categories/:id
 * @access  Public
 */
const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  ApiResponse.success(category, 'Category updated successfully').send(res);
});

/**
 * @desc    Delete (deactivate) category
 * @route   DELETE /api/v1/categories/:id
 * @access  Public
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const result = await categoryService.deleteCategory(req.params.id);
  ApiResponse.success(result, result.message).send(res);
});

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
