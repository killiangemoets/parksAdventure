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

export const selectRecommendations = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.recommendations
);

export const selectTourAvailabilities = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.availabilities
);

export const selectTourCurrentAvailabilities = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.tour?.currentAvailabilities
);

export const selectTourError = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.error
);
