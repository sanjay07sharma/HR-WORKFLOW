const { corsOrigins, nodeEnv } = require('./env');

const allowedOrigins = (origin) => {
  if (!origin) return true;
  if (nodeEnv === 'development' && (origin.includes('localhost') || origin.includes('127.0.0.1'))) return true;
  if (origin.endsWith('.vercel.app')) return true;
  if (corsOrigins.includes(origin)) return true;
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

module.exports = corsOptions;
