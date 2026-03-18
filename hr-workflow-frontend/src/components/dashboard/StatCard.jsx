import { cn } from '../../utils';

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = 'primary',
  trend = null,
  subtitle = null
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'bg-primary-100 text-primary-600',
      text: 'text-primary-600'
    },
    blue: {
      bg: 'bg-blue-50',
      icon: 'bg-blue-100 text-blue-600',
      text: 'text-blue-600'
    },
    yellow: {
      bg: 'bg-yellow-50',
      icon: 'bg-yellow-100 text-yellow-600',
      text: 'text-yellow-600'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'bg-green-100 text-green-600',
      text: 'text-green-600'
    },
    red: {
      bg: 'bg-red-50',
      icon: 'bg-red-100 text-red-600',
      text: 'text-red-600'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'bg-purple-100 text-purple-600',
      text: 'text-purple-600'
    }
  };

  const colors = colorClasses[color] || colorClasses.primary;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend !== null && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend >= 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last week</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-lg', colors.icon)}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
