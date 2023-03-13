import axios from "axios";
import { TourData } from "../types/tour";
import type { RcFile } from "antd/es/upload";
import convertToBase64 from "../utils/images-treatment/convert-base-64";

export const createTour = async (tourData: TourData) => {
  try {
    console.log(tourData);

    const imagesBase64 = await Promise.all(
      tourData.images.map((img) => {
        if (!img.url && !img.preview) {
          return convertToBase64(img.originFileObj as RcFile);
        } else return img.url || img.preview;
      })
    );
    console.log(imagesBase64);

    const tourBody = {
      name: tourData.title,
      duration: tourData.duration,
      description: tourData.summary,
      location: tourData.location,
      imagesBase64,
      difficulty: tourData.difficulty.id,
      categories: tourData.categories.map((category) => category.id),
      meetingAddress: tourData.address,
      locations: tourData.itinerary.map((stop) => {
        return {
          coordinates: [stop.longitude, stop.latitude],
          description: stop.text,
        };
      }),
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

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/tours`,
      tourBody
    );

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    }
    return err;
  }
};
