const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserTasks = new Schema({
  userName: {
    type: String,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  taskTime: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.ObjectId,
  },
});

const Task = mongoose.model("UserTasks", UserTasks);

module.exports = Task;
