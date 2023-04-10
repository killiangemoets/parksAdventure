import axios from "axios";
import axiosInstance from "../utils/axios/axios-instance";

export const getTourItems = async (tourIds: string[]) => {
  // if (!tourIds.length)
  // return { status: "error", message: "The cart is empty!" };
  try {
    let tourIdsQuery = (
      "?" +
      tourIds.reduce((acc, curr) => {
        return acc + `id=${curr}&`;
      }, "")
    ).slice(0, -1);

    const response = await axiosInstance.get(
      `/tours/cart-items${tourIdsQuery}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};
