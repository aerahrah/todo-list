import Axios from "axios";

export const deleteTask = async (url, id) => {
  try {
    const response = await Axios.delete(`${url}/tasks/${id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (url, id, name, isCompleted) => {
  try {
    const response = await Axios.patch(`${url}/tasks/${id}`, {
      name: name,
      completed: isCompleted,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
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
