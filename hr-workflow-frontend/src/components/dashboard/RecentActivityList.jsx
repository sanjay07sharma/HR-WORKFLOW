import { Clock, Plus, RefreshCw, CheckCircle, Archive, User } from 'lucide-react';
import { formatDate } from '../../utils';

const actionIcons = {
  created: Plus,
  updated: RefreshCw,
  status_changed: RefreshCw,
  assigned: User,
  archived: Archive,
  restored: CheckCircle
};

const actionColors = {
  created: 'bg-green-100 text-green-600',
  updated: 'bg-blue-100 text-blue-600',
  status_changed: 'bg-yellow-100 text-yellow-600',
  assigned: 'bg-purple-100 text-purple-600',
  archived: 'bg-gray-100 text-gray-600',
  restored: 'bg-green-100 text-green-600'
};

const actionLabels = {
  created: 'created',
  updated: 'updated',
  status_changed: 'status changed',
  assigned: 'assigned',
  archived: 'archived',
  restored: 'restored'
};

const RecentActivityList = ({ activities = [] }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-gray-500">No recent activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {activities.slice(0, 8).map((activity, index) => {
          const Icon = actionIcons[activity.action] || RefreshCw;
          const colorClass = actionColors[activity.action] || 'bg-gray-100 text-gray-600';
          const label = actionLabels[activity.action] || activity.action;

          return (
            <div key={activity._id || index} className="flex items-start gap-3">
              <div className={`flex-shrink-0 p-1.5 rounded-lg ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.taskTitle || 'Task'}</span>
                  <span className="text-gray-500"> was {label}</span>
                  {activity.action === 'status_changed' && activity.changes && (
                    <span className="text-gray-500">
                      {' '}to <span className="font-medium capitalize">
                        {activity.changes.newValue?.replace('_', ' ')}
                      </span>
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDate(activity.timestamp)}
                  {activity.performedBy && ` by ${activity.performedBy}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivityList;
