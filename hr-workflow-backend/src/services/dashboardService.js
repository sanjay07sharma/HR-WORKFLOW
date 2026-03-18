const { Task, ActivityLog } = require('../models');

/**
 * Dashboard Service - Aggregation queries for dashboard
 */
class DashboardService {
  /**
   * Get complete dashboard summary
   */
  async getSummary() {
    const [
      totalTasks,
      statusCounts,
      categoryCounts,
      overdueTasks,
      completedThisWeek,
      recentActivity
    ] = await Promise.all([
      this.getTotalTaskCount(),
      Task.getCountByStatus(),
      Task.getCountByCategory(),
      this.getOverdueTaskCount(),
      this.getCompletedThisWeek(),
      this.getRecentActivity(5)
    ]);

    return {
      totalTasks,
      byStatus: statusCounts,
      byCategory: categoryCounts,
      overdueTasks,
      completedThisWeek,
      recentActivity
    };
  }

  /**
   * Get total active task count
   */
  async getTotalTaskCount() {
    return Task.countDocuments({ isArchived: false });
  }

  /**
   * Get overdue task count
   */
  async getOverdueTaskCount() {
    return Task.countDocuments({
      isArchived: false,
      status: { $ne: 'done' },
      dueDate: { $lt: new Date() }
    });
  }

  /**
   * Get tasks completed this week
   */
  async getCompletedThisWeek() {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    return Task.countDocuments({
      isArchived: false,
      status: 'done',
      completedAt: { $gte: startOfWeek }
    });
  }

  /**
   * Get tasks grouped by status for chart
   */
  async getTasksByStatus() {
    return Task.aggregate([
      { $match: { isArchived: false } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          count: 1
        }
      }
    ]);
  }

  /**
   * Get tasks grouped by category for chart
   */
  async getTasksByCategory() {
    return Task.getCountByCategory();
  }

  /**
   * Get overdue tasks list
   */
  async getOverdueTasks(limit = 10) {
    return Task.find({
      isArchived: false,
      status: { $ne: 'done' },
      dueDate: { $lt: new Date() }
    })
      .populate('category', 'name slug color')
      .sort({ dueDate: 1 })
      .limit(limit)
      .lean();
  }

  /**
   * Get recent activity feed
   */
  async getRecentActivity(limit = 10) {
    return ActivityLog.aggregate([
      { $sort: { timestamp: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'tasks',
          localField: 'taskId',
          foreignField: '_id',
          as: 'task'
        }
      },
      { $unwind: '$task' },
      {
        $project: {
          _id: 1,
          action: 1,
          changes: 1,
          performedBy: 1,
          timestamp: 1,
          taskTitle: '$task.title',
          taskId: '$task._id'
        }
      }
    ]);
  }

  /**
   * Get task completion trends (last 7 days)
   */
  async getCompletionTrends() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    return Task.aggregate([
      {
        $match: {
          status: 'done',
          completedAt: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$completedAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          date: '$_id',
          completed: '$count'
        }
      },
      { $sort: { date: 1 } }
    ]);
  }

  /**
   * Get priority distribution
   */
  async getPriorityDistribution() {
    return Task.aggregate([
      { $match: { isArchived: false, status: { $ne: 'done' } } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          priority: '$_id',
          count: 1
        }
      }
    ]);
  }
}

module.exports = new DashboardService();
