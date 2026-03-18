const env = require('./env');
const connectDatabase = require('./database');
const corsOptions = require('./cors');

module.exports = {
  env,
  connectDatabase,
  corsOptions
};
