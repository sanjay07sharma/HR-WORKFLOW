/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format date to relative time
 */
export const formatRelativeDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  const now = new Date();
  const diffTime = d - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return `${Math.abs(diffDays)} days overdue`;
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else if (diffDays <= 7) {
    return `Due in ${diffDays} days`;
  }
  return formatDate(date);
};

/**
 * Check if date is overdue
 */
export const isOverdue = (date, status) => {
  if (!date || status === 'done') return false;
  return new Date(date) < new Date();
};

/**
 * Format date for input field
 */
export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};
