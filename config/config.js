
// config/config.js
// Central place where I read config values from environment variables.

module.exports = {
  // MongoDB connection string – pulled from .env locally or from Render env vars in production
  db: process.env.MONGODB_URI,

  // Session secret for express-session
  sessionSecret: process.env.SESSION_SECRET || 'fallback-dev-secret'
};
