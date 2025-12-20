import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const app = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});


app.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
