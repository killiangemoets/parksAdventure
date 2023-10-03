import axios from "axios";
import createAxiosInstance from "../utils/axios/axios-instance";

export const getMyReviews = async (tourId?: string) => {
  try {
    let query = "";
    if (tourId) query = `?tour=${tourId}`;
    const response = await createAxiosInstance().get(`/reviews/mine${query}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const editMyReview = async (
  reviewId: string,
  rating: number,
  review: string
) => {
  try {
    const response = await createAxiosInstance().patch(`/reviews/${reviewId}`, {
      rating,
      review,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const deleteMyReview = async (reviewId: string) => {
  try {
    const response = await createAxiosInstance().delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const createReview = async (
  tourId: string,
  rating: number,
  review?: string
) => {
  try {
    const response = await createAxiosInstance().post(
      `/tours/${tourId}/reviews`,
      {
        rating,
        review,
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getTop10Reviews = async () => {
  try {
    const response = await createAxiosInstance().get("/reviews/top10");
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getAllReviews = async (requestString: string = "") => {
  try {
    const response = await createAxiosInstance().get(
      `/reviews/all${requestString}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};
