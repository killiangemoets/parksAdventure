import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "/api/v1",
});

export default axiosInstance;
