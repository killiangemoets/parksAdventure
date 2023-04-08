import { UploadFile } from "antd";
import { TCoordinates } from "./map";
import { TUser } from "./user";

export type TCreateStop = {
  latitude: number;
  longitude: number;
  text: string;
};

export type TCreateAvailability = {
  date: string;
  price: number;
  kidPrice: number | undefined;
  time: string;
  groupSize: number;
};

export type TStop = {
  coordinates: TCoordinates;
  description: string;
  type: "Point";
  _id: string;
};

export type TAvailability = {
  date: Date;
  price: number;
  kidPrice: number | undefined;
  time: string;
  maxGroupSize: number;
  currentGroupSize: number;
};

export type TCategory =
  | "mountain"
  | "desert"
  | "snow"
  | "cities"
  | "sea"
  | "lakes";

export const categoriesList: TCategory[] = [
  "mountain",
  "desert",
  "snow",
  "cities",
  "sea",
  "lakes",
];

export const categoriesInfoList: TInfo<string>[] = [
  { value: "Mountain", id: "mountain" },
  { value: "Desert", id: "desert" },
  { value: "Snow", id: "snow" },
  { value: "Cities", id: "cities" },
  { value: "Sea", id: "sea" },
  { value: "Lakes", id: "lakes" },
];

export type TDifficulty = "family" | "medium" | "hard" | "expert";

export const difficultiesList: TDifficulty[] = [
  "family",
  "medium",
  "hard",
  "expert",
];

export const difficultiesInfoList: TInfo<string>[] = [
  { id: "family", value: "Family" },
  { id: "medium", value: "Medium" },
  { id: "difficult", value: "Difficult" },
  { id: "expert", value: "Expert" },
];

export type TCategoryOption =
  | { value: "Mountain"; id: "mountain" }
  | { value: "Desert"; id: "desert" }
  | { value: "Snow"; id: "snow" }
  | { value: "Cities"; id: "cities" }
  | { value: "Sea"; id: "sea" }
  | { value: "Lakes"; id: "lakes" };

export type TDifficultyOption =
  | { id: "family"; value: "Family" }
  | { id: "medium"; value: "Medium" }
  | { id: "difficult"; value: "Difficult" }
  | { id: "expert"; value: "Expert" }
  | {
      id: "null";
      value: "Select a difficulty";
    };

export type TReview = {
  createdAt: Date;
  id: string;
  rating: number;
  review: string;
  tour: string;
  user: { firstname: string; lastname: string; photo?: string; _id: string };
};

export enum CREATE_TOUR_DATA {
  name = "name",
  images = "images",
  duration = "duration",
  difficulty = "difficulty",
  location = "location",
  categories = "categories",
  summary = "summary",
  tourGuides = "tourGuides",
  locations = "locations",
  availabilities = "availabilities",
  address = "address",
  additionalInfo = "additionalInfo",
  hidden = "hidden",
}

export type CreateTourData = {
  [CREATE_TOUR_DATA.name]: string;
  [CREATE_TOUR_DATA.images]: UploadFile[];
  [CREATE_TOUR_DATA.duration]: number | undefined;
  [CREATE_TOUR_DATA.difficulty]: TDifficultyOption;
  [CREATE_TOUR_DATA.location]: string | undefined;
  [CREATE_TOUR_DATA.categories]: TCategoryOption[];
  [CREATE_TOUR_DATA.summary]: string | undefined;
  [CREATE_TOUR_DATA.tourGuides]: Info[];
  [CREATE_TOUR_DATA.locations]: TCreateStop[];
  [CREATE_TOUR_DATA.availabilities]: TCreateAvailability[];
  [CREATE_TOUR_DATA.address]: string | undefined;
  [CREATE_TOUR_DATA.additionalInfo]: string[];
  [CREATE_TOUR_DATA.hidden]: boolean;
};

export enum TOUR_DATA {
  name = "name",
  slug = "slug",
  duration = "duration",
  description = "description",
  location = "location",
  imageCover = "imageCover",
  images = "images",
  difficulty = "difficulty",
  categories = "categories",
  ratingsAverage = "ratingsAverage",
  ratingsQuantity = "ratingsQuantity",
  meetingAddress = "meetingAddress",
  startLocation = "startLocation",
  locations = "locations",
  guides = "guides",
  availabilities = "availabilities",
  additionalInfo = "additionalInfo",
  popularityIndex = "popularityIndex",
  reviews = "reviews",
  recommandations = "recommandations",
  id = "_id",
}

export type TourData = {
  [TOUR_DATA.name]: string;
  [TOUR_DATA.slug]: string;
  [TOUR_DATA.duration]: number;
  [TOUR_DATA.description]?: string;
  [TOUR_DATA.location]: string;
  [TOUR_DATA.imageCover]: string;
  [TOUR_DATA.images]?: string[];
  [TOUR_DATA.difficulty]: TDifficulty;
  [TOUR_DATA.categories]: TCategory[];
  [TOUR_DATA.ratingsAverage]: number;
  [TOUR_DATA.ratingsQuantity]: number;
  [TOUR_DATA.meetingAddress]?: string;
  [TOUR_DATA.startLocation]: TStop;
  [TOUR_DATA.locations]?: TStop[];
  [TOUR_DATA.guides]?: TUser[];
  [TOUR_DATA.availabilities]: TAvailability[];
  [TOUR_DATA.additionalInfo]?: string[];
  [TOUR_DATA.popularityIndex]: number;
  [TOUR_DATA.reviews]: TReview[];
  [TOUR_DATA.id]: string;
  [TOUR_DATA.recommandations]?: TourData[];
};

export type FiltersData = {
  price: [number, number];
  duration: [number, number];
  groupSize: [number, number];
  difficulty: TInfo<string>[];
  categories: TInfo<string>[];
};

type TFiltersMinMax = {
  price: [number, number];
  duration: [number, number];
  groupSize: [number, number];
};

export const filtersMinMax: TFiltersMinMax = {
  price: [0, 500],
  duration: [0, 20],
  groupSize: [0, 100],
};

// export type TourRequestFields = {
//   "price[gte]"?: number;
//   "price[lte]"?: number;
//   "duration[gte]"?: number;
//   "duration[lte]"?: number;
//   "groupSize[gte]"?: number;
//   "groupSize[lte]"?: number;
//   category?: TCategory[];
//   difficulty?: TDifficulty[];
//   search?: string;
//   "date[gte]"?: string;
//   "date[lte]"?: string;
//   page?: number;
// };
