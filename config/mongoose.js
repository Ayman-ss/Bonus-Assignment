// This file sets up my connection to MongoDB Atlas using Mongoose.

const mongoose = require('mongoose');
const config = require('./config'); // picks up db + sessionSecret

module.exports = function () {
  const db = mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
    console.log('✓ Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  return db;
};
