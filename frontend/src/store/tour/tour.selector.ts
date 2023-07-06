import { createSelector } from "reselect";
import { RootState } from "../store";
import { TourState } from "./tour.reducer";

const selectTourReducer = (state: RootState): TourState => {
  return state.tour;
};

export const selectTourIsLoading = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.isLoading
);

export const selectTour = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour
);

export const selectTourId = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?._id
);

export const selectTourGuides = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.guides
);

export const selectTourName = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.name
);

export const selectRecommendations = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.recommendations
);

export const selectBookingDetails = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.booking
);

export const selectTourCurrentAvailabilities = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.currentAvailabilities
);

export const selectTourAvailabilities = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.availabilities
);

export const selectTourMeetingAddress = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.meetingAddress
);

export const selectTourAdditionalInfo = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.additionalInfo
);

export const selectTourError = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.error
);
