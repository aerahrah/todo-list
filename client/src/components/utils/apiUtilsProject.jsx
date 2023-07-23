export const deleteProject = async (url, id, Axios) => {
  try {
    const response = await Axios.delete(`${url}/projects/${id}`);
    console.log(response);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};
export const createProject = async (url, title, Axios) => {
  try {
    const response = await Axios.post(`${url}/projects`, {
      projectTitle: title,
    });
    console.log(response);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const getSingleProject = async (url, id, Axios) => {
  try {
    const response = await Axios.get(`${url}/projects/${id}`);
    return response.data.project._id;
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};
