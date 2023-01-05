const UserTasks = require("../Models/UserTasks");

module.exports = {
  async store(req, res) {
    const { userName, taskName, taskTime } = req.body;

    const userTasks = await UserTasks.create({
      userName,
      taskName,
      taskTime,
    });

    return res.json(userTasks);
  },
  async index(req, res) {
    const userTasks = await UserTasks.find();

    return res.json(userTasks);
  },
  async show(req, res) {
    const userTasks = await UserTasks.findById(req.params.id);

    return res.json(userTasks);
  },
  async update(req, res) {
    const { taskName } = req.body;

    const tasks = await UserTasks.findByIdAndUpdate(
      req.params.id,
      {
        taskName,
      },
      { new: true }
    );

    return res.json(tasks);
  },
  async destroy(req, res) {
    await UserTasks.findByIdAndRemove(req.params.id);
    return res.json({ ok: true });
  },
};
