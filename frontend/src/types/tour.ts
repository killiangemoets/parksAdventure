import { UploadFile } from "antd";
// import type { Dayjs } from "dayjs";

export type Stop = {
  latitude: number;
  longitude: number;
  text: string;
};

export type Availability = {
  date: string;
  price: number;
  kidPrice: number | undefined;
  time: string;
  groupSize: number;
};

export enum TOUR_DATA {
  title = "title",
  images = "images",
  duration = "duration",
  difficulty = "difficulty",
  location = "location",
  categories = "categories",
  summary = "summary",
  tourGuides = "tourGuides",
  itinerary = "itinerary",
  availabilities = "availabilities",
  address = "address",
  additionalInfo = "additionalInfo",
  hidden = "hidden",
}

export type TourData = {
  [TOUR_DATA.title]: string;
  [TOUR_DATA.images]: UploadFile[];
  [TOUR_DATA.duration]: number | undefined;
  [TOUR_DATA.difficulty]: Info;
  [TOUR_DATA.location]: string | undefined;
  [TOUR_DATA.categories]: Info[];
  [TOUR_DATA.summary]: string | undefined;
  [TOUR_DATA.tourGuides]: Info[];
  [TOUR_DATA.itinerary]: Stop[];
  [TOUR_DATA.availabilities]: Availability[];
  [TOUR_DATA.address]: string | undefined;
  [TOUR_DATA.additionalInfo]: string[];
  [TOUR_DATA.hidden]: boolean;
};
