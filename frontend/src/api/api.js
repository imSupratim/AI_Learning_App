import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
    baseURL: "https://ai-learning-app-80b5.onrender.com/api",
  withCredentials: true
});

export default api;
