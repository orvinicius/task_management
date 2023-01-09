const express = require("express");

const UserTasks = require("./Controllers/UserTasks");

const routes = new express.Router();

// test route
routes.get("/", (req, res) => {
  res.send("API Working!");
});

routes.get("/api/tasks", UserTasks.index);

routes.get("/api/tasks/:id", UserTasks.show);

routes.post("/api/tasks", UserTasks.store);

routes.put("/api/tasks/:id", UserTasks.update);

routes.delete("/api/tasks/:id", UserTasks.destroy);

module.exports = routes;
