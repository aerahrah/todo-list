import Axios from "axios";

const createAxiosInstance = (token) => {
  const instance = Axios.create();
  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return instance;
};

export default createAxiosInstance;
