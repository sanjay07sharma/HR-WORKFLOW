import { cn } from '../../utils';
import { TASK_STATUS_LABELS, TASK_STATUS_COLORS } from '../../config';

const StatusBadge = ({ status, size = 'sm', showDot = true }) => {
  const colors = TASK_STATUS_COLORS[status] || TASK_STATUS_COLORS.new;
  const label = TASK_STATUS_LABELS[status] || status;

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        colors.bg,
        colors.text,
        sizeClasses[size]
      )}
    >
      {showDot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} />
      )}
      {label}
    </span>
  );
};

export default StatusBadge;
