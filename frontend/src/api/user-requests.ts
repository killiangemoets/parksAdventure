import axios from "axios";
import createAxiosInstance from "../utils/axios/axios-instance";
import { UpdateUserData } from "../types/user";

export const updateMe = async (userData: UpdateUserData) => {
  try {
    const response = await createAxiosInstance().patch(
      "/users/updateMe",
      userData
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const addToWishlist = async (tourId: string) => {
  try {
    const response = await createAxiosInstance().patch("/users/addToWishlist", {
      wishlist: tourId,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const removeFromWishlist = async (tourId: string) => {
  try {
    const response = await createAxiosInstance().patch(
      "/users/removeFromWishlist",
      {
        wishlist: tourId,
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const getAllUsers = async (requestString: string = "") => {
  try {
    const response = await createAxiosInstance().get(`/users${requestString}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getAllUsersWithDetails = async (requestString: string = "") => {
  try {
    const response = await createAxiosInstance().get(
      `/users/details${requestString}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getAllGuidesWithDetails = async (requestString: string = "") => {
  try {
    const response = await createAxiosInstance().get(
      `/users/guides-details${requestString}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const getAllUserNames = async () => {
  try {
    const response = await createAxiosInstance().get(`/users/names`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await createAxiosInstance().delete(`/users/${userId}`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const deleteMe = async () => {
  try {
    const response = await createAxiosInstance().delete(`/users/deleteMe`);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};

export const updateUserRequest = async (
  userId: string,
  userData: UpdateUserData
) => {
  try {
    const response = await createAxiosInstance().patch(
      `/users/${userId}`,
      userData
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return { status: "error", message: "An error occured. Please try again!" };
  }
};
