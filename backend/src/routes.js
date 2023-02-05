const express = require("express");

// Controllers
const UserTasks = require("./Controllers/UserTasks");
const User = require("./Controllers/UserProfile");

// Middlewares
const validate = require("../src/Middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../src/Middlewares/userValidation");
const authGuard = require("../src/Middlewares/authGuard");

const routes = new express.Router();

// test route
routes.get("/", (req, res) => {
  res.send("API Working!");
});

//task routes
routes.get("/api/tasks", UserTasks.index);

routes.get("/api/tasks/:id", UserTasks.show);

routes.post("/api/tasks", UserTasks.store);

routes.put("/api/tasks/:id", UserTasks.update);

routes.delete("/api/tasks/:id", UserTasks.destroy);

// user routes
routes.post(
  "/api/users/register",
  userCreateValidation(),
  validate,
  User.register
);
routes.get("/api/users/profile", authGuard, User.getCurrentUser);
routes.post("/api/users/login", loginValidation(), validate, User.login);
routes.put("/api/users/", User.update);
routes.get("/api/users/:id", User.getUserById);

module.exports = routes;
