const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
      index: true
    },
    action: {
      type: String,
      enum: ['created', 'updated', 'status_changed', 'assigned', 'archived', 'restored'],
      required: true
    },
    changes: {
      field: String,
      oldValue: mongoose.Schema.Types.Mixed,
      newValue: mongoose.Schema.Types.Mixed
    },
    performedBy: {
      type: String,
      default: 'System'
    }
  },
  {
    timestamps: { createdAt: 'timestamp', updatedAt: false }
  }
);

// Index for efficient querying
activityLogSchema.index({ taskId: 1, timestamp: -1 });

// TTL index to auto-delete logs older than 90 days (optional)
// activityLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
