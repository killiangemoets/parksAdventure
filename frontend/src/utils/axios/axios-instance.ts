import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "https://national-parks-hiking-tours-backend.onrender.com/api/v1/",
});

export default axiosInstance;
