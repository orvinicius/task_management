const Tasks = require("../Models/UserTasks");

const mongoose = require("mongoose");
const User = require("../Models/User");
const Task = require("../Models/UserTasks");

// Insert a task with an user related to it
const insertTask = async (req, res) => {
  const { taskTitle, taskTime } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Set the current date as the task date
  const date = new Date();

  const taskDate = new Date(date).toDateString();

  // Create a new task
  const newTask = await Tasks.create({
    userName: user.name,
    taskTitle,
    userId: user._id,
    taskDate,
    taskTime,
  });
  // if task was created successfully, return data
  if (!newTask) {
    res.status(422).json({
      errors: ["Houve um problema, tente novamente mais tarde."],
    });

    return;
  }
  res.status(201).json(newTask);
};

// Remove a task from DB
const deleteTask = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const task = await Tasks.findById(mongoose.Types.ObjectId(id));

    // Check if the task exists
    if (!task) {
      res.status(404).json({ errors: ["Tarefa não encontrada."] });
      return;
    }

    // Check if the task belongs to user
    if (!task.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
    }

    await Task.findByIdAndDelete(task._id);

    res
      .status(200)
      .json({ id: task._id, message: "Tarefa excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Tarefa não encontrada."] });
    return;
  }
};

// Get user tasks
const getUserTasks = async (req, res) => {
  const { id } = req.params;

  const tasks = await Task.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(tasks);
};

// Get task by id
const getTaskById = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(mongoose.Types.ObjectId(id));

  // Check if task exists
  if (!task) {
    res.status(404).json({ errors: ["Tarefa não encontrada."] });

    return;
  }
  res.status(200).json(task);
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const reqUser = req.user;

  const task = await Task.findById(id);

  // Check if task exists
  if (!task) {
    res.status(404).json({ errors: ["Tarefa não encontrada."] });
    return;
  }

  // Check if task belongs to user
  if (!task.userId.equals(reqUser._id)) {
    res.status(422).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  if (title) {
    task.taskTitle = title;
  }

  await task.save();

  res.status(200).json({ task, message: "Tarefa atualizada com sucesso!" });
};

module.exports = {
  insertTask,
  deleteTask,
  getUserTasks,
  getTaskById,
  updateTask,
};
