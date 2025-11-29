// All my CRUD logic for planner items

const Item = require('../models/item.server.model');

// GET /items -> list all items
exports.list = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.render('items/list', {
      title: 'My Planner',
      items
    });
  } catch (err) {
    next(err);
  }
};

// GET /items/create -> show create form
exports.showCreateForm = (req, res) => {
  res.render('items/create', {
    title: 'Add new item'
  });
};

// POST /items/create -> actually create
exports.create = async (req, res, next) => {
  try {
    const item = new Item({
      name: req.body.name,
      store: req.body.store,
      category: req.body.category,
      price: req.body.price || null,
      priority: req.body.priority,
      status: req.body.status,
      notes: req.body.notes
    });

    await item.save();
    res.redirect('/items');
  } catch (err) {
    next(err);
  }
};

// GET /items/:id/edit -> show edit form
exports.showEditForm = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');

    res.render('items/edit', {
      title: 'Edit item',
      item
    });
  } catch (err) {
    next(err);
  }
};

// POST /items/:id/edit -> update
exports.update = async (req, res, next) => {
  try {
    await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        store: req.body.store,
        category: req.body.category,
        price: req.body.price || null,
        priority: req.body.priority,
        status: req.body.status,
        notes: req.body.notes
      },
      { runValidators: true }
    );
    res.redirect('/items');
  } catch (err) {
    next(err);
  }
};

// GET /items/:id/delete -> confirm delete
exports.showDeleteConfirm = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');

    res.render('items/delete', {
      title: 'Delete item',
      item
    });
  } catch (err) {
    next(err);
  }
};

// POST /items/:id/delete -> delete
exports.delete = async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/items');
  } catch (err) {
    next(err);
  }
};


//ends