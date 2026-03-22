const createApp = require('./app');
const { connectDatabase, env } = require('./config');
const { Category } = require('./models');
const { DEFAULT_CATEGORIES } = require('./constants');

/**
 * Auto-seed default categories if none exist
 */
const autoSeedCategories = async () => {
  try {
    const count = await Category.countDocuments();
    if (count === 0) {
      await Category.insertMany(DEFAULT_CATEGORIES);
      console.log(`✅ Auto-seeded ${DEFAULT_CATEGORIES.length} default categories`);
    }
  } catch (err) {
    console.error('⚠️ Auto-seed failed (non-fatal):', err.message);
  }
};

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();

    // Auto-seed categories on first run
    await autoSeedCategories();

    // Create Express app
    const app = createApp();

    // Start listening
    const server = app.listen(env.port, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 HR Workflow API Server                               ║
║                                                           ║
║   Environment: ${env.nodeEnv.padEnd(40)}║
║   Port: ${String(env.port).padEnd(47)}║
║   URL: http://localhost:${env.port}                            ║
║                                                           ║
║   API Base: http://localhost:${env.port}/api/v1                 ║
║   Health: http://localhost:${env.port}/api/v1/health            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
