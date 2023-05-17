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

const getTourDataInEditFormat = async (tour: TourData) => {
  const locations =
    tour.locations?.map((location) => ({
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
      text: location.description,
    })) || [];

  const startLocation = {
    latitude: tour.startLocation.coordinates[1],
    longitude: tour.startLocation.coordinates[0],
    text: tour.startLocation.description,
  };

  console.log(tour);

  const tourEditData: CreateTourData = {
    name: tour.name,
    images: [tour.imageCover, ...tour.images].map((image) => ({
      state: "uploaded",
      url: image,
    })),
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
        id: guide?._id || "",
        value: (
          <TourGuide
            pictureUrl={guide.photo}
            position={guide.role === "guide" ? "Guide" : "Lead Guide"}
            name={`${guide.firstname} ${guide.lastname}`}
          />
        ),
      })) || [],
    locations: [startLocation, ...locations],
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
