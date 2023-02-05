import { api, requestConfig } from "../utils/config";

//get the tasks
const getUserTasks = async (data) => {
  const config = requestConfig("GET", data);

  try {
    const res = await fetch(api + "/tasks", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// insert a task
const addTask = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/tasks", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const tasksService = {
  getUserTasks,
  addTask,
};

export default tasksService;
