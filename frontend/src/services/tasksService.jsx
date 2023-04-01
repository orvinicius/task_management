import { api, requestConfig } from "../utils/config";

//get the tasks
const getUserTasks = async (id, token) => {
  const config = requestConfig("GET", null, token, null);

  try {
    const res = await fetch(api + "/tasks/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    localStorage.setItem("tasks", JSON.stringify(res));


    return res;
  } catch (error) {
    console.log(error);
  }
};

//get the task by Id
const getTaskByID = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/tasks/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// insert a task
const addTask = async (data, token) => {
  const config = requestConfig("POST", data, token);

  try {
    const res = await fetch(api + "/tasks", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete a task
const deleteTask = async (id, token) => {
  const config = requestConfig("DELETE", "", token);

  try {
    const res = await fetch(api + "/tasks/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Update a task
const updateTask = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/tasks/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const tasksService = {
  getUserTasks,
  getTaskByID,
  addTask,
  deleteTask,
  updateTask,
};

export default tasksService;