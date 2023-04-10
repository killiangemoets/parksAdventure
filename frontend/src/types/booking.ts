import { TAvailability, TOUR_DATA } from "./tour";

export type TTourItem = {
  [TOUR_DATA.currentAvailabilities]: TAvailability[];
  [TOUR_DATA.duration]: number;
  [TOUR_DATA.imageCover]: string;
  [TOUR_DATA.name]: string;
  [TOUR_DATA.ratingsAverage]: number;
  [TOUR_DATA.ratingsQuantity]: number;
  [TOUR_DATA.slug]: string;
  [TOUR_DATA.id]: string;
};

export type TItem = {
  tourId: string;
  startingDate: Date;
  kidPrice?: number;
  price: number;
  adults: number;
  children: number;
};

export type TItemWithTourInfo = {
  tour: TTourItem;
  startingDate: Date;
  kidPrice?: number;
  price: number;
  adults: number;
  children: number;
};

export type TSoldOutItem = TItem & {
  availableGroupCapacity: number;
};
