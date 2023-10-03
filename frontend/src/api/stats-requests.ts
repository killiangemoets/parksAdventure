import createAxiosInstance from "../utils/axios/axios-instance";
import axios from "axios";

export const getGeneralStats = async () => {
  try {
    const response = await createAxiosInstance().get(`/stats`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getTourStats = async (slug: string) => {
  try {
    const response = await createAxiosInstance().get(`/stats/${slug}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};
