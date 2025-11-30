const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // Local signup fields (optional so Google/GitHub won't fail)
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  password: { type: String },

  // OAuth login fields
  googleId: { type: String },
  githubId: { type: String },

  // Shared fields
  displayName: { type: String },
  email: { type: String },

}, { timestamps: true });

// This prevents login errors when Google/GitHub tries to create a user
// without username/password.
UserSchema.index(
  { googleId: 1, githubId: 1, username: 1 },
  { unique: false }
);

module.exports = mongoose.model('User', UserSchema);


