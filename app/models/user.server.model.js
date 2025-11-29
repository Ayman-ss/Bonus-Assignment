// user model for signup / signin

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName:  { type: String, trim: true, required: true },
  email:     { type: String, trim: true, required: true },
  username:  { type: String, trim: true, required: true, unique: true },
  password:  { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

//ends