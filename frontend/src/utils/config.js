export const api = "http://localhost:3333/api";

export const requestConfig = (method, data, task) => {
  let config;

  if (task) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return config;
};
