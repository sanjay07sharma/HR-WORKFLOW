import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ListTodo,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { Button, Loader, ErrorMessage } from '../components/common';
import {
  StatCard,
  StatusPieChart,
  CategoryBarChart,
  OverdueTasksList,
  RecentActivityList
} from '../components/dashboard';
import { useDashboard } from '../hooks';
import { dashboardApi } from '../api';

const DashboardPage = () => {
  const { summary, loading, error, refetch } = useDashboard();
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  // Fetch additional data
  useEffect(() => {
    const fetchExtraData = async () => {
      try {
        setLoadingExtra(true);
        const [overdueRes, activityRes] = await Promise.all([
          dashboardApi.getOverdueTasks(5),
          dashboardApi.getRecentActivity(8)
        ]);
        setOverdueTasks(overdueRes.data || []);
        setRecentActivity(activityRes.data || []);
      } catch (err) {
        console.error('Error fetching extra data:', err);
      } finally {
        setLoadingExtra(false);
      }
    };

    fetchExtraData();
  }, [summary]);

  const handleRefresh = () => {
    refetch();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!summary) {
    return <ErrorMessage message="No dashboard data available" onRetry={refetch} />;
  }

  const { totalTasks, byStatus, byCategory, overdueTasks: overdueCount, completedThisWeek } = summary;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            Overview of your HR workflow tasks and activities
          </p>
        </div>
        <Button variant="secondary" onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Tasks"
          value={totalTasks || 0}
          icon={LayoutDashboard}
          color="primary"
        />
        <StatCard
          title="New"
          value={byStatus?.new || 0}
          icon={ListTodo}
          color="blue"
          subtitle="Pending tasks"
        />
        <StatCard
          title="In Progress"
          value={byStatus?.in_progress || 0}
          icon={Clock}
          color="yellow"
          subtitle="Being worked on"
        />
        <StatCard
          title="Done"
          value={byStatus?.done || 0}
          icon={CheckCircle2}
          color="green"
          subtitle={`${completedThisWeek || 0} this week`}
        />
        <StatCard
          title="Overdue"
          value={overdueCount || 0}
          icon={AlertTriangle}
          color="red"
          subtitle="Needs attention"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusPieChart data={byStatus} />
        <CategoryBarChart data={byCategory} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Tasks */}
        {loadingExtra ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center min-h-[200px]">
            <Loader size="md" />
          </div>
        ) : (
          <OverdueTasksList tasks={overdueTasks} />
        )}

        {/* Recent Activity */}
        {loadingExtra ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-center min-h-[200px]">
            <Loader size="md" />
          </div>
        ) : (
          <RecentActivityList activities={recentActivity} />
        )}
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Weekly Summary</h3>
            <p className="text-primary-100 text-sm mt-1">
              {completedThisWeek || 0} tasks completed this week
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-primary-200" />
            <div className="text-right">
              <p className="text-2xl font-bold">
                {totalTasks > 0 
                  ? Math.round(((byStatus?.done || 0) / totalTasks) * 100) 
                  : 0}%
              </p>
              <p className="text-xs text-primary-200">Completion rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
