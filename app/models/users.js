const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: { type: String },
    githubId: { type: String },
    displayName: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
