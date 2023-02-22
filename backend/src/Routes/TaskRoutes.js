const express = require("express");

// Controllers
const {
  insertTask,
  deleteTask,
  getUserTasks,
  getTaskById,
  updateTask,
} = require("../Controllers/TasksController");

// Middlewares
const validate = require("../Middlewares/handleValidation");
const authGuard = require("../Middlewares/authGuard");
const {
  taskInsertValidation,
  taskUpdateValidation,
} = require("../Middlewares/taskValidation");

const routes = new express.Router();

//task routes
routes.get("/user/:id", authGuard, getUserTasks);

routes.get("/:id", authGuard, getTaskById);

routes.post("/", authGuard, validate, insertTask);

routes.put("/:id", taskUpdateValidation(), validate, updateTask);

routes.delete("/:id", authGuard, deleteTask);

module.exports = routes;
