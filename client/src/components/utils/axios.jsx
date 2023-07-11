import Axios from "axios";

const createAxiosInstance = (token) => {
  const instance = Axios.create();
  instance.interceptors.request.use((config) => {
    console.log(`axios token: ${token}`);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return instance;
};

export default createAxiosInstance;
