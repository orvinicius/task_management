const express = require("express");

// Controller
const {
  getCurrentUser,
  getUserById,
  login,
  register,
  update,
} = require("../Controllers/UserController");

// Middlewares
const validate = require("../Middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../Middlewares/userValidation");
const authGuard = require("../Middlewares/authGuard");

const routes = new express.Router();

// user routes
routes.post("/register", userCreateValidation(), validate, register);
routes.get("/profile", authGuard, getCurrentUser);
routes.post("/login", loginValidation(), validate, login);
routes.put("/", authGuard, userUpdateValidation(), validate, update);
routes.get("/:id", getUserById);

module.exports = routes;
