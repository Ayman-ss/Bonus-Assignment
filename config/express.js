
// This file builds and configures my Express app (views, sessions, routes, etc.)

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const config = require('./config');

module.exports = function () {
  const app = express();

  // Log requests so I can see what’s happening
  app.use(morgan('dev'));

  // Set up EJS views
  app.set('views', path.join(__dirname, '../app/views'));
  app.set('view engine', 'ejs');

  // Parse form and JSON bodies
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Allow PUT/DELETE in forms (using ?_method=PUT etc)
  app.use(methodOverride('_method'));

  // Sessions for auth
  app.use(
    session({
      saveUninitialized: true,
      resave: false,
      secret: config.sessionSecret
    })
  );

  // Make session available to all EJS templates as "session"
  app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });

  // Static files (CSS, images, videos)
  app.use(express.static(path.join(__dirname, '../public')));

  // ---- ROUTES ----
  const indexRoutes = require('../app/routes/index.server.routes');
  const itemRoutes = require('../app/routes/items.server.routes');
  const userRoutes = require('../app/routes/users.server.routes');

  app.use('/', indexRoutes);
  app.use('/', userRoutes);
  app.use('/', itemRoutes);

  //  404 handler
  app.use((req, res) => {
    res.status(404).send('404 – page not found');
  });

  return app;
};
