import { Dispatch } from "redux";
import { getTour } from "../../api/tour-requests";
import { Action, ActionWithPayload } from "../../types/actions";
import { TourData } from "../../types/tour";
import { TOUR_ACTION_TYPES } from "./tour.type";
import { getMyBookingDetails } from "../../api/booking-requests";

export type FetchTourStart = Action<TOUR_ACTION_TYPES.FETCH_TOUR_START>;

export type FetchTourSuccess = ActionWithPayload<
  TOUR_ACTION_TYPES.FETCH_TOUR_SUCCESS,
  TourData
>;
export type FetchTourFailed = ActionWithPayload<
  TOUR_ACTION_TYPES.FETCH_TOUR_FAILED,
  string
>;
export type TourDipatchTypes =
  | FetchTourStart
  | FetchTourSuccess
  | FetchTourFailed;

const fetchTourStart = (): FetchTourStart => {
  return { type: TOUR_ACTION_TYPES.FETCH_TOUR_START };
};

const fetchTourSuccess = (tour: TourData): FetchTourSuccess => {
  return {
    type: TOUR_ACTION_TYPES.FETCH_TOUR_SUCCESS,
    payload: tour,
  };
};

const fetchTourFailed = (error: string): FetchTourFailed => {
  return { type: TOUR_ACTION_TYPES.FETCH_TOUR_FAILED, payload: error };
};

// THUNK ACTIONS:
export const fetchTourAsync =
  (slug: string) => async (dispatch: Dispatch<TourDipatchTypes>) => {
    dispatch(fetchTourStart());
    const response = await getTour(slug);
    if (response && response.status === "success")
      dispatch(
        fetchTourSuccess({
          ...response.data.tour,
          recommendations: response.data.recommendations,
        })
      );
    else if (response & response?.message)
      dispatch(fetchTourFailed(response.message));
    else
      dispatch(
        fetchTourFailed(
          "An error occured. Please refresh the page and try again!"
        )
      );
  };

export const fetchTourBookingAsync =
  (id: string) => async (dispatch: Dispatch<TourDipatchTypes>) => {
    dispatch(fetchTourStart());
    const response = await getMyBookingDetails(id);
    console.log("RESPONSE", response);
    if (response && response.status === "success")
      dispatch(
        fetchTourSuccess({
          ...response.data.tour,
          recommendations: response.data.recommendations,
          booking: response.data.booking,
        })
      );
    else if (response && response?.message)
      dispatch(fetchTourFailed(response.message));
    else
      dispatch(
        fetchTourFailed(
          "An error occured. Please refresh the page and try again!"
        )
      );
  };
