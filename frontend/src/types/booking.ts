import { TAvailability, TOUR_DATA } from "./tour";

export type TTourItem = {
  [TOUR_DATA.currentAvailabilities]: TAvailability[];
  [TOUR_DATA.duration]: number;
  [TOUR_DATA.imageCover]: string;
  [TOUR_DATA.name]: string;
  [TOUR_DATA.ratingsAverage]: number;
  [TOUR_DATA.ratingsQuantity]: number;
  [TOUR_DATA.maxGroupSizeCapacity]: number;
  [TOUR_DATA.slug]: string;
  [TOUR_DATA.id]: string;
};

export type TItem = {
  tourId: string;
  startingDate: Date;
  // kidPrice?: number;
  // price: number;
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
  tour: TTourItem;
  // availableGroupCapacity: number;
};

export type TUpdateItem = {
  startingDate?: Date;
  adults?: number;
  children?: number;
};

export type TCheckoutState = "done" | "in progress" | "to do";

export enum CHECKOUT_STATES {
  done = "done",
  in_progress = "in progress",
  to_do = "to do",
}

export type BookingTourData = {
  currentAvailabilities: TAvailability;
  id: string;
  name: string;
  duration: number;
  imageCover: string;
  slug: string;
  _id: string;
}

export type BookingUserData = {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  role: string;
  _v: number;
  _id: string;
}

export type TBooking = {
  tour: BookingTourData;
  user: BookingUserData;
  date: Date;
  price: number;
  kidPrice?: number;
  adults?: number;
  kids?: number;
  totalPrice: number;
  orderNumber: number;
  pin: number;
  _id: string;
}
