import axios from "axios";
import axiosInstance from "../utils/axios/axios-instance";

export const getMyReviews = async () => {
    try {
      const response = await axiosInstance.get("/reviews/mine");
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.response?.data;
      }
      return { status: "error", message: "An error occured. Please try again!" };
    }
  }