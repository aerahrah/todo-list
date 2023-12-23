const url = "http://localhost:3500/api/v1";

export const deleteTask = async (id) => {
  try {
    await Axios.delete(`${url}/tasks/${id}`);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const updateTask = async (id, name, title, isCompleted) => {
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

export const getSingleTask = async ( id) => {
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
