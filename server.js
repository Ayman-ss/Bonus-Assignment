// server.js

require('dotenv').config();

const mongoose = require('./config/mongoose'); 
const createExpress = require('./config/express');

// connect to MongoDB
mongoose();

// build express app
const app = createExpress();

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MyStyle Planner running on port ${PORT}`);
});

/*require('dotenv').config();
const mongoose = require('./config/mongoose');


const createExpress = require('./express');
const passport = require('./passport');
const session = require('express-session');

// Connect to DB
mongoose();

// Create express app
const app = createExpress();

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Pass user to all EJS views
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
*/