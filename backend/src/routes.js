const express = require("express");

const UserTasks = require("./Controllers/UserTasks");

const routes = new express.Router();

routes.get("/tasks", UserTasks.index);

routes.get("/tasks/:id", UserTasks.show);

routes.post("/tasks", UserTasks.store);

routes.put("/tasks/:id", UserTasks.update);

routes.delete("/tasks/:id", UserTasks.destroy);

module.exports = routes;
