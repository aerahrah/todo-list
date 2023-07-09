import Axios from "axios";

export const deleteTask = async (url, id) => {
  try {
    const response = await Axios.delete(`${url}/tasks/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (url, id, name, title, isCompleted) => {
  try {
    const response = await Axios.patch(`${url}/tasks/${id}`, {
      name: name,
      title: title,
      completed: isCompleted,
    });
    console.log(response);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const getSingleTask = async (url, id) => {
  try {
    const response = await Axios.get(`${url}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (url, title, name) => {
  try {
    const response = await Axios.post(`${url}/tasks`, {
      title: title,
      name: name,
    });
    return response.date;
  } catch (error) {
    console.log(error);
  }
};
