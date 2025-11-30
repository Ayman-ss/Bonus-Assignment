// Routes for my wardrobe / planner items

const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.server.controller');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  
  // not logged in → can’t change data
  res.redirect('/signin');
}

// Everyone can SEE items
router.get('/items', itemsController.list);

// Only logged-in users can CREATE
router.get('/items/create', ensureAuthenticated, itemsController.showCreate);
router.post('/items/create', ensureAuthenticated, itemsController.create);

// Only logged-in users can EDIT
router.get('/items/:id/edit', ensureAuthenticated, itemsController.showEdit);
router.post('/items/:id/edit', ensureAuthenticated, itemsController.update);

// Only logged-in users can DELETE
router.get('/items/:id/delete', ensureAuthenticated, itemsController.showDelete);
router.post('/items/:id/delete', ensureAuthenticated, itemsController.delete);

module.exports = router;


//ends