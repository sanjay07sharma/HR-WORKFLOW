const {
  createTaskRules,
  updateTaskRules,
  updateStatusRules,
  taskIdRules,
  getTasksRules
} = require('./taskValidator');

const {
  createCategoryRules,
  updateCategoryRules,
  categoryIdRules
} = require('./categoryValidator');

module.exports = {
  createTaskRules,
  updateTaskRules,
  updateStatusRules,
  taskIdRules,
  getTasksRules,
  createCategoryRules,
  updateCategoryRules,
  categoryIdRules
};
