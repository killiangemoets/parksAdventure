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

export const selectTourError = createSelector(
  [selectTourReducer],
  (tourSlice) => tourSlice.error
);
