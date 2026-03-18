// API Configuration
export const API_BASE_URL = '/api/v1';

// Task Status
export const TASK_STATUS = {
  NEW: 'new',
  IN_PROGRESS: 'in_progress',
  DONE: 'done'
};

export const TASK_STATUS_LABELS = {
  new: 'New',
  in_progress: 'In Progress',
  done: 'Done'
};

export const TASK_STATUS_COLORS = {
  new: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200',
    dot: 'bg-blue-500'
  },
  in_progress: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200',
    dot: 'bg-yellow-500'
  },
  done: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200',
    dot: 'bg-green-500'
  }
};

// Task Priority
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

export const TASK_PRIORITY_VALUES = ['low', 'medium', 'high', 'urgent'];

export const TASK_PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent'
};

export const TASK_PRIORITY_COLORS = {
  low: {
    bg: 'bg-gray-100',
    text: 'text-gray-600'
  },
  medium: {
    bg: 'bg-blue-100',
    text: 'text-blue-600'
  },
  high: {
    bg: 'bg-orange-100',
    text: 'text-orange-600'
  },
  urgent: {
    bg: 'bg-red-100',
    text: 'text-red-600'
  }
};
