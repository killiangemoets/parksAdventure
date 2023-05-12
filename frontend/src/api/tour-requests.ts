import axios from "axios";
import { CreateTourData } from "../types/tour";
import type { RcFile } from "antd/es/upload";
import convertToBase64 from "../utils/images-treatment/convert-base-64";
import { TUser } from "../types/user";
import axiosInstance from "../utils/axios/axios-instance";

// type GetToursResult =
//   | {
//       status: "success";
//       data: TourData[];
//     }
//   | { status: "fail" | "error"; message: string };

export const getTours = async (requestString: string = "") => {
  try {
    // requestString = requestString ? `&${requestString}` : "";
    // const response = await axiosInstance.get(
    // `/tours?onlyAvailables=true${requestString}`
    // );
    // requestString = requestString ? `&${requestString}` : "";
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
