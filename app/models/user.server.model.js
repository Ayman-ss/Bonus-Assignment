// user model for signup / signin


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  password: { type: String },

  // For OAuth
  googleId: { type: String },
  githubId: { type: String },

  displayName: { type: String },
  email: { type: String },
});


module.exports = mongoose.model('User', UserSchema);

//ends