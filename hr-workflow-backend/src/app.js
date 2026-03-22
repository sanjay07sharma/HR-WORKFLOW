const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const { corsOptions, env } = require('./config');
const { errorHandler, notFoundHandler } = require('./middleware');

/**
 * Create and configure Express application
 */
const createApp = () => {
  const app = express();

  // Trust proxy (for deployment behind reverse proxy)
  app.set('trust proxy', 1);

  // Request logging
  if (env.nodeEnv === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // CORS - manual headers for maximum compatibility
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (
      !origin ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1')
    ) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API Routes
  app.use('/api/v1', routes);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'HR Workflow Management API',
      version: '1.0.0',
      docs: '/api/v1/health'
    });
  });

  // 404 handler
  app.use(notFoundHandler);

  // Global error handler
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
