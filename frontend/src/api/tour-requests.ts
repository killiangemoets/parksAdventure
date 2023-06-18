import axios from "axios";
import { CreateTourData } from "../types/tour";
import { TUser } from "../types/user";
import axiosInstance from "../utils/axios/axios-instance";
import getTourDataInSendFormat from "../utils/dataManipulation/getTourDataInSendFormat";

export const getTours = async (requestString: string = "") => {
  try {
    const response = await axiosInstance.get(
      `/tours/all/aggregation${requestString}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getTour = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/tours/slug/${slug}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const createTour = async (tourData: CreateTourData) => {
  try {
    const tourBody = await getTourDataInSendFormat(tourData);

    const response = await axiosInstance.post("/tours", tourBody);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const updateTour = async (tourData: CreateTourData, tourId: string) => {
  try {
    const tourBody = await getTourDataInSendFormat(tourData);
    const response = await axiosInstance.patch(`/tours/${tourId}`, tourBody);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const getTourGuides = async () => {
  try {
    const response = await axiosInstance.get(
      "/users?role=guide&role=lead-guide&active=true"
    );

    const guides: TUser[] = response.data.data.data.map(
      (guide: {
        email: string;
        firstname: string;
        lastname: string;
        photo: string;
        phoneNumber: string;
        birthDate: Date;
        role: "guide" | "lead-guide";
        _id: string;
      }) => {
        const {
          email,
          firstname,
          lastname,
          photo,
          phoneNumber,
          birthDate,
          role,
          _id: id,
        } = guide;

        return {
          email,
          firstname,
          lastname,
          photo,
          phoneNumber,
          birthDate,
          role,
          id,
        };
      }
    );

    return { status: "success", data: guides };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return [];
  }
};

export const getTopTourRecommendations = async () => {
  try {
    const response = await axiosInstance.get(`/tours/top-recommendations`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const deleteTour = async (tourId: string) => {
  try {
    const response = await axiosInstance.delete(`/tours/${tourId}`);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const getTourCalendar = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/tours/${slug}/calendar`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const getAllTourNames = async () => {
  try {
    const response = await axiosInstance.get(`/tours/my-tours-names`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};
