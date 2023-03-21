import { Dispatch } from "redux";
import { getTours } from "../../api/tour-requests";
import { Action, ActionWithPayload } from "../../types/actions";
import { TourData } from "../../types/tour";
import { TOURS_ACTION_TYPES } from "./tours.type";

export type FetchToursStart = Action<TOURS_ACTION_TYPES.FETCH_TOURS_START>;

export type FetchToursSuccess = ActionWithPayload<
  TOURS_ACTION_TYPES.FETCH_TOURS_SUCCESS,
  TourData[]
>;
export type FetchToursFailed = ActionWithPayload<
  TOURS_ACTION_TYPES.FETCH_TOURS_FAILED,
  Error
>;
export type ToursDipatchTypes =
  | FetchToursStart
  | FetchToursSuccess
  | FetchToursFailed;

const fetchToursStart = (): FetchToursStart => {
  return { type: TOURS_ACTION_TYPES.FETCH_TOURS_START };
};

const fetchToursSuccess = (toursArray: TourData[]): FetchToursSuccess => {
  return {
    type: TOURS_ACTION_TYPES.FETCH_TOURS_SUCCESS,
    payload: toursArray,
  };
};

const fetchToursFailed = (error: Error): FetchToursFailed => {
  return { type: TOURS_ACTION_TYPES.FETCH_TOURS_FAILED, payload: error };
};

// THUNK ACTION:
export const fetchToursAsync =
  () => async (dispatch: Dispatch<ToursDipatchTypes>) => {
    dispatch(fetchToursStart());
    try {
      const ToursArray = await getTours();
      dispatch(fetchToursSuccess(ToursArray));
    } catch (error) {
      dispatch(fetchToursFailed(error as Error));
    }
  };
