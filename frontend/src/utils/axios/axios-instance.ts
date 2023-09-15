import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.defaults.headers.common["Origin"] =
  "https://national-parks-hiking-tours.vercel.app";

export default axiosInstance;
