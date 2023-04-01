import { TourData } from "../../types/tour";
import { ToursDipatchTypes } from "./tours.action";
import { TOURS_ACTION_TYPES } from "./tours.type";

export type ToursState = {
  readonly tours: TourData[];
  readonly total: number;
  readonly isLoading: boolean;
  readonly error: string | null;
};

export const TOUR_INITIAL_STATE: ToursState = {
  tours: [],
  total: 0,
  isLoading: false,
  error: null, // Since we do asynchronous fetching
};

export const toursReducer = (
  state = TOUR_INITIAL_STATE,
  action = {} as ToursDipatchTypes
): ToursState => {
  switch (action.type) {
    case TOURS_ACTION_TYPES.FETCH_TOURS_START:
      return { ...state, isLoading: true };
    case TOURS_ACTION_TYPES.FETCH_TOURS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      };
    case TOURS_ACTION_TYPES.FETCH_TOURS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
