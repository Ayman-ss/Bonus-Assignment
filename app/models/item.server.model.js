// Schema for wardrobe / planner items

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  store: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Wishlist', 'Purchased'],
    default: 'Wishlist'
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Register my model as "Item" with Mongoose
module.exports = mongoose.model('Item', ItemSchema);


//ends
