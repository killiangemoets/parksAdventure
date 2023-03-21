import axios from "axios";
import { CreateTourData, TourData } from "../types/tour";
import type { RcFile } from "antd/es/upload";
import convertToBase64 from "../utils/images-treatment/convert-base-64";
import { TUser } from "../types/user";
import axiosInstance from "../utils/axios/axios-instance";

export const getTours = async (): Promise<TourData[]> => {
  try {
    const requestStringFromUrl = window.location.href.split("?")[1];
    const requestString = requestStringFromUrl
      ? `?${requestStringFromUrl}`
      : "";
    const response = await axiosInstance.get(`/tours${requestString}`);
    console.log(response.data.data.data);
    return response.data.data.data as TourData[];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return [];
  }
};

export const createTour = async (tourData: CreateTourData) => {
  try {
    const imagesBase64 = await Promise.all(
      tourData.images.map((img) => {
        if (!img.url && !img.preview) {
          return convertToBase64(img.originFileObj as RcFile);
        } else return img.url || img.preview;
      })
    );

    const tourBody = {
      name: tourData.name,
      duration: tourData.duration,
      description: tourData.summary,
      location: tourData.location,
      imagesBase64,
      difficulty: tourData.difficulty.id,
      categories: tourData.categories.map((category) => category.id),
      meetingAddress: tourData.address,
      locations: tourData.locations.slice(1).map((stop) => {
        return {
          coordinates: [stop.longitude, stop.latitude],
          description: stop.text,
        };
      }),
      startLocation: {
        coordinates: [
          tourData.locations[0].longitude,
          tourData.locations[0].latitude,
        ],
        description: tourData.locations[0].text,
      },

      guides: tourData.tourGuides.map((tourGuide) => tourGuide.id),
      availabilities: tourData.availabilities.map((availability) => {
        return {
          date: availability.date,
          time: availability.time,
          price: availability.price,
          kidPrice: availability.kidPrice,
          maxGroupSize: availability.groupSize,
        };
      }),
      additionalInfo: tourData.additionalInfo,
      hiddenTour: tourData.hidden,
    };

    const response = await axiosInstance.post("/tours", tourBody);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};

export const getTourGuides = async (): Promise<TUser[]> => {
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

    return guides;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return [];
  }
};
