const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    picture: { type: String, require: true, default: "../public/avatar.jpg" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
