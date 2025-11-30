const passport = require('passport');
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.server.controller');

// local signup / signin
router.get('/signup', usersController.showSignup);
router.post('/signup', usersController.signup);
router.get('/signin', usersController.showSignin);
router.post('/signin', usersController.signin);

// signout
router.get('/signout', usersController.signout);

// GOOGLE
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  (req, res) => {
    res.redirect('/items');
  }
);

// GITHUB
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/signin' }),
  (req, res) => {
    res.redirect('/items');
  }
);

module.exports = router;
