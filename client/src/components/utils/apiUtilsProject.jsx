export const deleteProject = async (url, id, Axios) => {
  try {
    const response = await Axios.delete(`${url}/projects/${id}`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
