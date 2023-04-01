import { createSelector } from "reselect";
import { RootState } from "../store";
import { ToursState } from "./tours.reducer";

const selectToursReducer = (state: RootState): ToursState => {
  return state.tours;
};

export const selectToursIsLoading = createSelector(
  [selectToursReducer],
  (toursSlice) => toursSlice.isLoading
);

export const selectTours = createSelector(
  [selectToursReducer],
  (toursSlice) => toursSlice.tours
);

export const selectToursTotal = createSelector(
  [selectToursReducer],
  (toursSlice) => toursSlice.total
);

export const selectToursError = createSelector(
  [selectToursReducer],
  (toursSlice) => toursSlice.error
);
