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

const Tasks = mongoose.model("UserTasks", UserTasks);

module.exports = Tasks;
