import axios from "axios";

export const createAxiosInstance = () => {
  // Get token from local storage
  const persistRootString = localStorage.getItem("persist:root");
  const persistRootObject = persistRootString && JSON.parse(persistRootString);
  const userObject =
    persistRootObject?.user && JSON.parse(persistRootObject.user);
  const token = userObject?.token;
  const tmpToken = userObject?.tmp;
  const cartToken = userObject?.cart;

  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "x-tmp-token": tmpToken,
      "x-cart-token": cartToken,
    },
  });
};

export default createAxiosInstance;
