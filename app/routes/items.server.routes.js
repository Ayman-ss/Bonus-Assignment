// Routes for my wardrobe / planner items

const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.server.controller');

// List all items
router.get('/items', itemsController.list);

// Create item
router.get('/items/create', itemsController.showCreateForm);
router.post('/items/create', itemsController.create);

// Edit item
router.get('/items/:id/edit', itemsController.showEditForm);
router.post('/items/:id/edit', itemsController.update);

// Delete item
router.get('/items/:id/delete', itemsController.showDeleteConfirm);
router.post('/items/:id/delete', itemsController.delete);

module.exports = router;


//ends