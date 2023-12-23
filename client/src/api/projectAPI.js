const url = "http://localhost:3500/api/v1";

export const deleteProject = async ( id) => {
  try {
    await Axios.delete(`${url}/projects/${id}`);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};
export const createProject = async ( title) => {
  try {
    await Axios.post(`${url}/projects`, {
      projectTitle: title,
    });
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};
export const updateProject = async ( title, id) => {
  try {
    await Axios.patch(`${url}/projects/${id}`, {
      projectTitle: title,
    });
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const getSingleProject = async ( id) => {
  try {
    const response = await Axios.get(`${url}/projects/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};
