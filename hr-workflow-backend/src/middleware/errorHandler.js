const { ApiError } = require('../utils');
const { env } = require('../config');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Log error in development
  if (env.nodeEnv === 'development') {
    console.error('Error:', err);
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    error = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = ApiError.badRequest('Validation failed', messages);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = ApiError.conflict(`${field} already exists`);
  }

  // Express-validator errors
  if (err.array && typeof err.array === 'function') {
    const messages = err.array().map((e) => e.msg);
    error = ApiError.badRequest('Validation failed', messages);
  }

  // Default to 500 if statusCode not set
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    errors: error.errors || [],
    ...(env.nodeEnv === 'development' && { stack: err.stack })
  });
};

/**
 * 404 Not Found handler for undefined routes
 */
const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
};

module.exports = {
  errorHandler,
  notFoundHandler
};
