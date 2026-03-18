/**
 * Classname utility (like clsx)
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate unique ID
 */
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};
