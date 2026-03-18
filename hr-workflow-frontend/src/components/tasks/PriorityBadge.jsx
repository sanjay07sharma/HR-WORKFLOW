import { cn } from '../../utils';
import { TASK_PRIORITY_LABELS, TASK_PRIORITY_COLORS } from '../../config';

const PriorityBadge = ({ priority, size = 'sm' }) => {
  const colors = TASK_PRIORITY_COLORS[priority] || TASK_PRIORITY_COLORS.medium;
  const label = TASK_PRIORITY_LABELS[priority] || priority;

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded',
        colors.bg,
        colors.text,
        sizeClasses[size]
      )}
    >
      {label}
    </span>
  );
};

export default PriorityBadge;
