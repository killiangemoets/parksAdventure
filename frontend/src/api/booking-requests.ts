import axios from "axios";
import axiosInstance from "../utils/axios/axios-instance";
import { TItemWithTourInfo } from "../types/booking";

export const getTourItems = async (tourIds: string[]) => {
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

export const getCheckoutSession = async (items: TItemWithTourInfo[]) => {
  try {
    const formatedItems = items.map((item) => {
      return {
        tourId: item.tour._id,
        tourName: item.tour.name,
        tourDuration: item.tour.duration,
        tourImg: item.tour.imageCover,
        date: item.startingDate,
        price: item.price,
        kidPrice: item.kidPrice,
        adults: item.adults,
        kids: item.children,
      };
    });
    const response = await axiosInstance.post("/bookings/payment-session", {
      items: formatedItems,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const validateOrder = async (token: string) => {
  try {
    const response = await axiosInstance.patch(
      `/bookings/validate-order/${token}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getMyBookings = async () => {
  try {
    const response = await axiosInstance.get("/bookings/mine");
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getMyBookingDetails = async (bookingId: string) => {
  try {
    const response = await axiosInstance.get(`/bookings/mine/${bookingId}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getAllBookings = async (requestString: string = "") => {
  try {
    const response = await axiosInstance.get(`/bookings/all${requestString}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};
