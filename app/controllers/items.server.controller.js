// All my CRUD logic for planner items

const Item = require('../models/item.server.model');

// GET /items -> list all items
exports.list = async (req, res, next) => {
  try {
    const items = await Item.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.render('items/list', {
      title: 'My Planner',
      items
    });
  } catch (err) {
    next(err);
  }
};



// GET /items/create -> show create form
exports.showCreate = (req, res) => {
  res.render('items/create', {
    title: 'Add new item'
  });
};

// GET /items/:id/edit -> show edit form
exports.showEdit = async (req, res, next) => {
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

// GET /items/:id/delete -> confirm delete
exports.showDelete = async (req, res, next) => {
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

// POST /items/create -> create new item
exports.create = async (req, res, next) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      store: req.body.store,
      category: req.body.category,
      price: req.body.price,
      priority: req.body.priority,
      status: req.body.status,
      notes: req.body.notes
          
    });

    await newItem.save();
    res.redirect('/items');
  } catch (err) {
    next(err);
  }
};

// POST /items/:id/edit -> update item
exports.update = async (req, res, next) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      store: req.body.store,
      category: req.body.category,
      price: req.body.price,
      priority: req.body.priority,
      status: req.body.status,
      notes: req.body.notes
    });

    res.redirect('/items');
  } catch (err) {
    next(err);
  }
};

// POST /items/:id/delete -> delete item
exports.delete = async (req, res, next) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/items');
  } catch (err) {
    next(err);
  }
};


//ends