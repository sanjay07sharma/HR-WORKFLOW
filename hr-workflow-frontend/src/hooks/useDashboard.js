import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

/**
 * Custom hook for fetching dashboard data
 */
export const useDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getSummary();
      setSummary(response.data);
    } catch (err) {
      setError(err.message);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    summary,
    loading,
    error,
    refetch: fetchDashboard
  };
};

export default useDashboard;
