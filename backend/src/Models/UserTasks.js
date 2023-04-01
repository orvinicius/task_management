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
  },
  userId: {
    type: mongoose.ObjectId,
  },
  taskDate: {
    type: String,
  },
  taskStatus: {
    type: String,
  },
});

const Task = mongoose.model("UserTasks", UserTasks);

module.exports = Task;
