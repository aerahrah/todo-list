export const deleteProject = async (url, id, Axios) => {
  try {
    const response = await Axios.delete(`${url}/projects/${id}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
export const createProject = async (url, title, Axios) => {
  try {
    const response = await Axios.post(`${url}/projects`, {
      projectTitle: title,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
