import axiosInstance from './axiosInstance';

/**
 * Category API service
 */
export const categoryApi = {
  /**
   * Get all categories
   */
  getCategories: async () => {
    return axiosInstance.get('/categories');
  },

  /**
   * Get a single category by ID
   */
  getCategoryById: async (id) => {
    return axiosInstance.get(`/categories/${id}`);
  }
};

export default categoryApi;
