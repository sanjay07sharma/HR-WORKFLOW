const { Category } = require('../models');
const { ApiError } = require('../utils');

/**
 * Category Service - Business logic for category operations
 */
class CategoryService {
  /**
   * Get all active categories
   */
  async getCategories() {
    return Category.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 })
      .lean();
  }

  /**
   * Get a single category by ID
   */
  async getCategoryById(categoryId) {
    const category = await Category.findById(categoryId).lean();

    if (!category) {
      throw ApiError.notFound('Category not found');
    }

    return category;
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug) {
    const category = await Category.findOne({ slug, isActive: true }).lean();

    if (!category) {
      throw ApiError.notFound('Category not found');
    }

    return category;
  }

  /**
   * Create a new category
   */
  async createCategory(categoryData) {
    // Generate slug if not provided
    if (!categoryData.slug) {
      categoryData.slug = categoryData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
    }

    const category = new Category(categoryData);
    await category.save();

    return category.toObject();
  }

  /**
   * Update a category
   */
  async updateCategory(categoryId, updateData) {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw ApiError.notFound('Category not found');
    }

    // Update slug if name changed
    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
    }

    Object.assign(category, updateData);
    await category.save();

    return category.toObject();
  }

  /**
   * Deactivate a category (soft delete)
   */
  async deleteCategory(categoryId) {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw ApiError.notFound('Category not found');
    }

    category.isActive = false;
    await category.save();

    return { message: 'Category deactivated successfully' };
  }

  /**
   * Seed default categories
   */
  async seedCategories(categories) {
    const results = [];

    for (const categoryData of categories) {
      const existing = await Category.findOne({ slug: categoryData.slug });
      
      if (!existing) {
        const category = await Category.create(categoryData);
        results.push({ action: 'created', category: category.name });
      } else {
        results.push({ action: 'skipped', category: categoryData.name });
      }
    }

    return results;
  }
}

module.exports = new CategoryService();
