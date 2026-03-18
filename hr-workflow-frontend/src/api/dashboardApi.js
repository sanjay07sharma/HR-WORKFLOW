import axiosInstance from './axiosInstance';

/**
 * Dashboard API service
 */
export const dashboardApi = {
  /**
   * Get complete dashboard summary
   */
  getSummary: async () => {
    return axiosInstance.get('/dashboard/summary');
  },

  /**
   * Get tasks grouped by status
   */
  getTasksByStatus: async () => {
    return axiosInstance.get('/dashboard/tasks-by-status');
  },

  /**
   * Get tasks grouped by category
   */
  getTasksByCategory: async () => {
    return axiosInstance.get('/dashboard/tasks-by-category');
  },

  /**
   * Get overdue tasks
   */
  getOverdueTasks: async (limit = 5) => {
    return axiosInstance.get(`/dashboard/overdue?limit=${limit}`);
  },

  /**
   * Get recent activity
   */
  getRecentActivity: async (limit = 10) => {
    return axiosInstance.get(`/dashboard/recent-activity?limit=${limit}`);
  }
};

export default dashboardApi;
