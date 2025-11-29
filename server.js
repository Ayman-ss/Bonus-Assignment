// server.js
// Entry point for my MyStyle Planner app
require('dotenv').config(); // Load variables from .env into process.env

const express = require('./config/express');
const mongoose = require('./config/mongoose');

// Connect to MongoDB first
mongoose();

// Create the Express app
const app = express();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MyStyle Planner is running on port ${PORT}`);
});
