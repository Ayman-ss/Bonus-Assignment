// Auth routes

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.server.controller');

// Signup
router.get('/signup', usersController.showSignup);
router.post('/signup', usersController.signup);

// Signin
router.get('/signin', usersController.showSignin);
router.post('/signin', usersController.signin);

// Signout
router.get('/signout', usersController.signout);

module.exports = router;

//ends