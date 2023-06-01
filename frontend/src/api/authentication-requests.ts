import axios from "axios";
import {
  CreateTourGuideData,
  LoginData,
  SignUpData,
  UpdateUserPasswordData,
} from "../types/user";
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

export const signUp = async (
  signUpData: SignUpData,
  redirectUri: string | undefined
) => {
  try {
    const response = await axiosInstance.post("/users/signup", {
      ...signUpData,
      redirectUri,
    });
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

export const resendEmail = async (
  email: string,
  redirectUri: string | null
) => {
  try {
    const response = await axiosInstance.post(
      "/users/resend-email-verification",
      { email, redirectUri }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post("/users/forgot-password", {
      email,
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const resetPassword = async (
  token: string,
  password: string,
  passwordConfirm: string,
  stayConnected: boolean
) => {
  try {
    const response = await axiosInstance.patch(
      `/users/reset-password/${token}`,
      {
        password,
        passwordConfirm,
        stayConnected,
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

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/users/logout");
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/users/isloggedin");
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const updateMyPassword = async (
  userPasswords: UpdateUserPasswordData
) => {
  try {
    const response = await axiosInstance.patch(
      "/users/updateMyPassword",
      userPasswords
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const createTourGuide = async (
  createTourGuideData: CreateTourGuideData
) => {
  try {
    const response = await axiosInstance.post(
      "/users/guides/creation",
      createTourGuideData
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const activateTourGuide = async (
  token: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    const response = await axiosInstance.patch(
      `/users/guides/activation/${token}`,
      {
        password,
        passwordConfirm,
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
