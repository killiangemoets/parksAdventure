import axios from "axios";
import { LoginData, SignUpData } from "../types/user";
import axiosInstance from "../utils/axios/axios-instance";

export const login = async (loginData: LoginData) => {
  try {
    const response = await axiosInstance.post("/users/login", loginData);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const signUp = async (signUpData: SignUpData) => {
  try {
    const response = await axiosInstance.post("/users/signup", signUpData);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await axiosInstance.patch(
      `/users/email-verification/${token}`
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const resendEmail = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      "/users/resend-email-verification",
      { email }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};
