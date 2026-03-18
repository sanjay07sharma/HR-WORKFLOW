import axiosInstance from './axiosInstance';

/**
 * Task API service
 */
export const taskApi = {
  /**
   * Get all tasks with optional filters
   */
  getTasks: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    if (params.status) queryParams.append('status', params.status);
    if (params.category) queryParams.append('category', params.category);

    if (params.priority) queryParams.append('priority', params.priority);
    if (params.search) queryParams.append('search', params.search);
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
    
    const query = queryParams.toString();
    return axiosInstance.get(`/tasks${query ? `?${query}` : ''}`);
  },

  /**
   * Get a single task by ID
   */
  getTaskById: async (id) => {
    return axiosInstance.get(`/tasks/${id}`);
  },

  /**
   * Create a new task
   */
  createTask: async (taskData) => {
    return axiosInstance.post('/tasks', taskData);
  },

  /**
   * Update a task
   */
  updateTask: async (id, taskData) => {
    return axiosInstance.patch(`/tasks/${id}`, taskData);
  },

  /**
   * Update task status only
   */
  updateTaskStatus: async (id, status) => {
    return axiosInstance.patch(`/tasks/${id}/status`, { status });
  },

  /**
   * Delete a task by ID
   */
  deleteTask: async (id) => {
    return axiosInstance.delete(`/tasks/${id}`);
  },

  /**
   * Delete all tasks (bulk delete)
   */
  deleteAllTasks: async () => {
    return axiosInstance.delete('/tasks/all');
  },
  };

export default taskApi;
