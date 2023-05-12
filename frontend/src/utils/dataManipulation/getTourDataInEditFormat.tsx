import { UploadFile } from "antd";
import TourGuide from "../../components/tourPageComponents/tourGuide/tourGuide.component";
import {
  CreateTourData,
  TCategoryOption,
  TDifficultyOption,
  TourData,
  categoriesInfoList,
  difficultiesInfoList,
} from "../../types/tour";
import { getCreateAvailabilityDateFormat } from "../formatting/formatDates";
import convertUrlToFile from "../images-treatment/convert-url-to-file";

const getTourDataInEditFormat = async (tour: TourData) => {
  const images = [tour.imageCover, ...tour.images];
  const imagesToFile: any[] = [];

  for (const image of images) {
    const imageToFile = await convertUrlToFile(image, `image.webp`);
    console.log("imegaeToFile", imageToFile);
    imagesToFile.push(imageToFile);
  }

  const tourEditData: CreateTourData = {
    name: tour.name,
    images: imagesToFile,
    // images: [],
    duration: tour.duration,
    difficulty: difficultiesInfoList.find(
      (difficultyInfo) => difficultyInfo.id === tour.difficulty
    ) as TDifficultyOption,
    location: tour.location,
    categories: tour.categories.map((category) =>
      categoriesInfoList.find((categoryInfo) => categoryInfo.id === category)
    ) as TCategoryOption[],
    summary: tour.description,
    tourGuides:
      tour.guides?.map((guide) => ({
        id: guide.id,
        value: (
          <TourGuide
            pictureUrl={guide.photo}
            position={guide.role === "guide" ? "Guide" : "Lead Guide"}
            name={`${guide.firstname} ${guide.lastname}`}
          />
        ),
      })) || [],
    locations:
      tour.locations?.map((location) => ({
        latitude: location.coordinates[1],
        longitude: location.coordinates[0],
        text: location.description,
      })) || [],
    availabilities:
      tour.availabilities.map((availability) => ({
        date: getCreateAvailabilityDateFormat(availability.date),
        price: availability.price,
        kidPrice: availability.kidPrice || availability.price,
        time: availability.time,
        groupSize: availability.maxGroupSize,
      })) || [],
    address: tour.meetingAddress,
    additionalInfo: tour.additionalInfo || [],
    hidden: Boolean(tour.hiddenTour),
  };

  return tourEditData;
};

export default getTourDataInEditFormat;
