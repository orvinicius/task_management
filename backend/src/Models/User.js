const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true, // create a timestamp to monitor user creation
  }
);

const User = mongoose.models.Users || mongoose.model("User", userSchema);

module.exports = User;
