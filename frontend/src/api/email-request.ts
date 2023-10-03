import { ContactData } from "../types/contact";
import createAxiosInstance from "../utils/axios/axios-instance";
import axios from "axios";

export const sendEmail = async (contactData: ContactData) => {
  try {
    const response = await createAxiosInstance().post("/email", contactData);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};
