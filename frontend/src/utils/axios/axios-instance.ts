import axios from "axios";

// const axiosInstance = axios.create({
//   withCredentials: true,
//   baseURL: process.env.REACT_APP_API_URL,
// });

export const createAxiosInstance = () => {
  // Get token from local storage
  const persistRootString = localStorage.getItem("persist:root");
  const persistRootObject = persistRootString && JSON.parse(persistRootString);
  const userObject =
    persistRootObject?.user && JSON.parse(persistRootObject.user);
  const token = userObject?.token;
  console.log("token", token);

  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default createAxiosInstance;
