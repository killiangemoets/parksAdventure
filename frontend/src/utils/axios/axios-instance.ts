import axios from "axios";

export const createAxiosInstance = () => {
  // Get token and tmpToken from local storage
  const persistRootString = localStorage.getItem("persist:root");
  const persistRootObject = persistRootString && JSON.parse(persistRootString);
  const userObject =
    persistRootObject?.user && JSON.parse(persistRootObject.user);
  const token = userObject?.token;
  const tmpToken = userObject?.tmp;

  // Get cartToken from session storage
  const persistPaymentString = sessionStorage.getItem("persist:payment");
  const persistPaymentObject =
    persistPaymentString && JSON.parse(persistPaymentString);
  const cartToken = persistPaymentObject.cart
    ? JSON.parse(persistPaymentObject.cart)
    : undefined;

  console.log({ token, tmpToken, cartToken });

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
