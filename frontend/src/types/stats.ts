import { TStop } from "./tour";

export type TGeneralStats = {
  bookingsByUserStats: {
    bookingCount: number;
    userCount: number;
  }[];
  bookingsCount: number;
  availabilitiesCount: number;
  hikersCount: number;
  ratingAverage: number;
  ratingsStats: {
    rating: number;
    count: number;
  }[];
  revenueByTour: {
    name: string;
    startLocation: Omit<TStop, "_id">;
    totalRevenue: number;
    tourId: string;
  }[];
  totalRevenue: number;
  tourCount: number;
  userCount: number;
  statsByMonth: {
    monthValue: number;
    month: string;
    totalBookings: number;
    totalRevenue: number;
    totalAvailabilities: number;
  }[];
  toursWithTheMostHikers: {
    _id: string;
    totalBookings: number;
    totalGroup: number;
    tourData: {
      name: string;
    };
  }[];
};

export type TTourStats = Omit<TGeneralStats, "revenueByTour" | "tourCount"> & {
  startsCount: number;
  tourName: string;
};
