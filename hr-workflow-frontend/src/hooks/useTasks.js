import { useState, useEffect, useCallback } from 'react';
import { taskApi } from '../api';

/**
 * Custom hook for fetching and managing tasks
 */
export const useTasks = (initialFilters = {}) => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.getTasks(filters);
      setTasks(response.data || []);
      setPagination(response.pagination || null);
    } catch (err) {
      setError(err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial fetch and refetch on filter change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Create task
  const createTask = useCallback(async (taskData) => {
    const response = await taskApi.createTask(taskData);
    await fetchTasks(); // Refetch to get updated list
    return response;
  }, [fetchTasks]);

  // Update task
  const updateTask = useCallback(async (id, taskData) => {
    const response = await taskApi.updateTask(id, taskData);
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? response.data : task))
    );
    return response;
  }, []);

  // Update task status
  const updateTaskStatus = useCallback(async (id, status) => {
    await taskApi.updateTaskStatus(id, status);
    await fetchTasks();
  }, [fetchTasks]);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    await taskApi.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  }, []);

  return {
    tasks,
    pagination,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
  };
};

export default useTasks;
