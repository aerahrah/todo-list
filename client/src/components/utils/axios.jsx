import Axios from "axios";

const axiosInterceptor = (token) => {
  Axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return Axios;
};

export default axiosInterceptor;
