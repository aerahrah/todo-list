export const deleteTask = async (url, id, Axios) => {
  try {
    await Axios.delete(`${url}/tasks/${id}`);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const updateTask = async (url, id, name, title, isCompleted, Axios) => {
  try {
    await Axios.patch(`${url}/tasks/${id}`, {
      name: name,
      title: title,
      completed: isCompleted,
    });
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const getSingleTask = async (url, id, Axios) => {
  try {
    const response = await Axios.get(`${url}/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const createTask = async (
  url,
  title,
  name,
  projectTitle,
  taskType,
  Axios
) => {
  try {
    const response = await Axios.post(`${url}/tasks`, {
      project: projectTitle,
      title: title,
      name: name,
      taskType: taskType,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};
