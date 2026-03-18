const mongoose = require('mongoose');
const { TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } = require('../constants');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxLength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
      type: String,
      trim: true,
      maxLength: [2000, 'Description cannot exceed 2000 characters']
    },
    status: {
      type: String,
      enum: {
        values: TASK_STATUS_VALUES,
        message: 'Status must be one of: new, in_progress, done'
      },
      default: 'new',
      index: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      index: true
    },
    priority: {
      type: String,
      enum: {
        values: TASK_PRIORITY_VALUES,
        message: 'Priority must be one of: low, medium, high, urgent'
      },
      default: 'medium',
      index: true
    },
    assignee: {
      type: String,
      trim: true,
      maxLength: [100, 'Assignee name cannot exceed 100 characters']
    },
    referencePerson: {
      type: String,
      trim: true,
      maxLength: [100, 'Reference person name cannot exceed 100 characters']
    },
    dueDate: {
      type: Date,
      index: true
    },
    completedAt: {
      type: Date
    },
    kanbanOrder: {
      type: Number,
      default: 0
    },
    tags: [{
      type: String,
      trim: true,
      maxLength: [50, 'Tag cannot exceed 50 characters']
    }],
    isArchived: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Compound indexes for common queries
taskSchema.index({ status: 1, category: 1 });
taskSchema.index({ status: 1, isArchived: 1 });
taskSchema.index({ category: 1, kanbanOrder: 1 });
taskSchema.index({ dueDate: 1, status: 1 });
taskSchema.index({ title: 'text', description: 'text' });

// Virtual: isOverdue
taskSchema.virtual('isOverdue').get(function () {
  if (!this.dueDate || this.status === 'done') return false;
  return new Date() > this.dueDate;
});

// Pre-save hook: Set completedAt when status changes to done
taskSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    if (this.status === 'done' && !this.completedAt) {
      this.completedAt = new Date();
    } else if (this.status !== 'done') {
      this.completedAt = null;
    }
  }
  next();
});

// Static method: Get tasks by status with count
taskSchema.statics.getCountByStatus = async function () {
  const result = await this.aggregate([
    { $match: { isArchived: false } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  
  return result.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, { new: 0, in_progress: 0, done: 0 });
};

// Static method: Get tasks by category with count
taskSchema.statics.getCountByCategory = async function () {
  return this.aggregate([
    { $match: { isArchived: false } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'categoryInfo'
      }
    },
    { $unwind: '$categoryInfo' },
    {
      $project: {
        _id: 0,
        categoryId: '$_id',
        name: '$categoryInfo.name',
        slug: '$categoryInfo.slug',
        color: '$categoryInfo.color',
        count: 1
      }
    },
    { $sort: { count: -1 } }
  ]);
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
