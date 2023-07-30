import { TourData } from "../../types/tour";
import { TourDipatchTypes } from "./tour.action";
import { TOUR_ACTION_TYPES } from "./tour.type";

export type TourState = {
  readonly tour: TourData | null;
  readonly isLoading: boolean;
  readonly error: string | null;
};

export const TOUR_INITIAL_STATE: TourState = {
  tour: null,
  isLoading: false,
  error: null,
};

export const tourReducer = (
  state = TOUR_INITIAL_STATE,
  action = {} as TourDipatchTypes
): TourState => {
  switch (action.type) {
    case TOUR_ACTION_TYPES.FETCH_TOUR_START:
      return { ...state, isLoading: true };
    case TOUR_ACTION_TYPES.FETCH_TOUR_SUCCESS:
      return {
        ...state,
        tour: action.payload,
        error: null,
        isLoading: false,
      };
    case TOUR_ACTION_TYPES.FETCH_TOUR_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
