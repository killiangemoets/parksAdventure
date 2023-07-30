import { CreateTourData } from "../../types/tour";
import convertToBase64 from "../images-treatment/convert-base-64";

const getTourDataInSendFormat = async (tourData: CreateTourData) => {
  const uploadedImages: { img: string; index: number }[] = [];
  const newImages: { img: File; index: number }[] = [];

  tourData.images.forEach((image, index) => {
    if (image.state === "uploaded")
      uploadedImages.push({ img: image.url, index });
    if (image.state === "new") newImages.push({ img: image.file, index });
  });

  const imgBase64 = await Promise.all(
    newImages.map(({ img }) => {
      return convertToBase64(img);
    })
  );

  const imagesBase64 = newImages.map((newImage, index) => ({
    img: imgBase64[index],
    index: newImage.index,
  }));

  const tourBody = {
    name: tourData.name,
    duration: tourData.duration,
    description: tourData.summary,
    location: tourData.location,
    imagesBase64,
    uploadedImages,
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

  return tourBody;
};

export default getTourDataInSendFormat;
