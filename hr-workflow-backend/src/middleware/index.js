const { errorHandler, notFoundHandler } = require('./errorHandler');
const validateRequest = require('./validateRequest');

module.exports = {
  errorHandler,
  notFoundHandler,
  validateRequest
};
