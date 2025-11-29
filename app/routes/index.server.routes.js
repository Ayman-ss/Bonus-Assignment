// Just the home page

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.server.controller');

// GET 
router.get('/', indexController.renderHome);

module.exports = router;

//ends