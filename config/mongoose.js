// This file sets up my connection to MongoDB Atlas using Mongoose.

const mongoose = require('mongoose');
const config = require('./config'); // picks up db + sessionSecret

console.log("DB_URI =", process.env.DB_URI);

module.exports = function () {
  mongoose.connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB Connection ERROR:", err);
  });


  mongoose.connection.on('connected', () => {
    console.log('✓ Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  return db;
};
