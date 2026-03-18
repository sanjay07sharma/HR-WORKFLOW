const { Task, ActivityLog } = require('../models');
const { ApiError, paginate, paginationMeta } = require('../utils');

/**
 * Task Service - Business logic for task operations
 */
class TaskService {
  /**
   * Build filter query from request query params
   */
  buildFilterQuery(queryParams) {
    const filter = { isArchived: false };

    // Status filter (supports comma-separated values)
    if (queryParams.status) {
      const statuses = queryParams.status.split(',').map((s) => s.trim());
      filter.status = { $in: statuses };
    }

    // Category filter
    if (queryParams.category) {
      filter.category = queryParams.category;
    }

    // Priority filter
    if (queryParams.priority) {
      filter.priority = queryParams.priority;
    }

    // Assignee filter
    if (queryParams.assignee) {
      filter.assignee = { $regex: queryParams.assignee, $options: 'i' };
    }

    // Reference person filter
    if (queryParams.referencePerson) {
      filter.referencePerson = { $regex: queryParams.referencePerson, $options: 'i' };
    }

    // Search in title, description, assignee, referencePerson
    if (queryParams.search) {
      filter.$or = [
        { title: { $regex: queryParams.search, $options: 'i' } },
        { description: { $regex: queryParams.search, $options: 'i' } },
        { assignee: { $regex: queryParams.search, $options: 'i' } },
        { referencePerson: { $regex: queryParams.search, $options: 'i' } }
      ];
    }

    // Overdue filter
    if (queryParams.overdue === 'true') {
      filter.dueDate = { $lt: new Date() };
      filter.status = { $ne: 'done' };
    }

    return filter;
  }

  /**
   * Build sort options from request query params
   */
  buildSortOptions(queryParams) {
    const sortField = queryParams.sortBy || 'createdAt';
    const sortOrder = queryParams.sortOrder === 'asc' ? 1 : -1;
    return { [sortField]: sortOrder };
  }

  /**
   * Get all tasks with filters and pagination
   */
  async getTasks(queryParams) {
    const filter = this.buildFilterQuery(queryParams);
    const sort = this.buildSortOptions(queryParams);
    const { page, limit, skip } = paginate(queryParams);

    const [tasks, total] = await Promise.all([
      Task.find(filter)
        .populate('category', 'name slug color icon')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Task.countDocuments(filter)
    ]);

    return {
      tasks,
      pagination: paginationMeta(total, { page, limit })
    };
  }

  /**
   * Get a single task by ID
   */
  async getTaskById(taskId) {
    const task = await Task.findOne({ _id: taskId, isArchived: false })
      .populate('category', 'name slug color icon')
      .lean();

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    return task;
  }

  /**
   * Create a new task
   */
  async createTask(taskData) {
    const task = new Task(taskData);
    await task.save();

    // Log activity
    await this.logActivity(task._id, 'created', null);

    // Return populated task
    return Task.findById(task._id)
      .populate('category', 'name slug color icon')
      .lean();
  }

  /**
   * Update a task
   */
  async updateTask(taskId, updateData) {
    const task = await Task.findOne({ _id: taskId, isArchived: false });

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    // Track changes for activity log
    const changes = [];
    for (const [key, value] of Object.entries(updateData)) {
      if (task[key] !== value) {
        changes.push({
          field: key,
          oldValue: task[key],
          newValue: value
        });
      }
    }

    // Apply updates
    Object.assign(task, updateData);
    await task.save();

    // Log activity for significant changes
    if (changes.length > 0) {
      const statusChange = changes.find((c) => c.field === 'status');
      if (statusChange) {
        await this.logActivity(task._id, 'status_changed', statusChange);
      } else {
        await this.logActivity(task._id, 'updated', changes[0]);
      }
    }

    return Task.findById(task._id)
      .populate('category', 'name slug color icon')
      .lean();
  }

  /**
   * Update task status only
   */
  async updateTaskStatus(taskId, newStatus) {
    const task = await Task.findOne({ _id: taskId, isArchived: false });

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    const oldStatus = task.status;
    task.status = newStatus;
    await task.save();

    // Log status change
    await this.logActivity(task._id, 'status_changed', {
      field: 'status',
      oldValue: oldStatus,
      newValue: newStatus
    });

    return Task.findById(task._id)
      .populate('category', 'name slug color icon')
      .lean();
  }

  /**
   * Soft delete (archive) a task
   */
  async deleteTask(taskId) {
    const task = await Task.findOne({ _id: taskId, isArchived: false });

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    task.isArchived = true;
    await task.save();

    // Log activity
    await this.logActivity(task._id, 'archived', null);

    return { message: 'Task archived successfully' };
  }

  /**
   * Reorder tasks (for Kanban drag-drop)
   */
  async reorderTask(taskId, newStatus, newOrder) {
    const task = await Task.findOne({ _id: taskId, isArchived: false });

    if (!task) {
      throw ApiError.notFound('Task not found');
    }

    const oldStatus = task.status;

    // Update task position and status
    task.status = newStatus;
    task.kanbanOrder = newOrder;
    await task.save();

    // If status changed, log it
    if (oldStatus !== newStatus) {
      await this.logActivity(task._id, 'status_changed', {
        field: 'status',
        oldValue: oldStatus,
        newValue: newStatus
      });
    }

    return Task.findById(task._id)
      .populate('category', 'name slug color icon')
      .lean();
  }

  /**
   * Get task activity log
   */
  async getTaskActivity(taskId, queryParams) {
    const { page, limit, skip } = paginate(queryParams);

    const [activities, total] = await Promise.all([
      ActivityLog.find({ taskId })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ActivityLog.countDocuments({ taskId })
    ]);

    return {
      activities,
      pagination: paginationMeta(total, { page, limit })
    };
  }

  /**
   * Log task activity
   */
  async logActivity(taskId, action, changes) {
    await ActivityLog.create({
      taskId,
      action,
      changes,
      performedBy: 'System' // Will be replaced with actual user when auth is added
    });
  }
    /**
     * Delete all tasks (bulk delete)
     */
    async deleteAllTasks() {
      const result = await Task.deleteMany({});
      await ActivityLog.deleteMany({});
      return { success: true, message: `Deleted ${result.deletedCount} tasks.` };
    }
}

module.exports = new TaskService();
