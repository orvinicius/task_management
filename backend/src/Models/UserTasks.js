const mongoose = require("mongoose");

const UserTasks = new mongoose.Schema({
  userName: {
    type: String,
  },
  taskName: {
    type: String,
    required: true,
  },
  taskTime: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("UserTasks", UserTasks);
