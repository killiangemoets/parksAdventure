import { Dispatch } from "redux";
import { getTours } from "../../api/tour-requests";
import { Action, ActionWithPayload } from "../../types/actions";
import { TourData } from "../../types/tour";
import { TOURS_ACTION_TYPES } from "./tours.type";

export type FetchToursStart = Action<TOURS_ACTION_TYPES.FETCH_TOURS_START>;

export type FetchToursSuccess = ActionWithPayload<
  TOURS_ACTION_TYPES.FETCH_TOURS_SUCCESS,
  { tours: TourData[]; total: number }
>;
export type FetchToursFailed = ActionWithPayload<
  TOURS_ACTION_TYPES.FETCH_TOURS_FAILED,
  string
>;
export type ToursDipatchTypes =
  | FetchToursStart
  | FetchToursSuccess
  | FetchToursFailed
  | ClearTours;

export type ClearTours = Action<TOURS_ACTION_TYPES.CLEAR_TOURS>;

const fetchToursStart = (): FetchToursStart => {
  return { type: TOURS_ACTION_TYPES.FETCH_TOURS_START };
};

const fetchToursSuccess = (
  tours: TourData[],
  total: number
): FetchToursSuccess => {
  return {
    type: TOURS_ACTION_TYPES.FETCH_TOURS_SUCCESS,
    payload: { tours, total },
  };
};

const fetchToursFailed = (error: string): FetchToursFailed => {
  return { type: TOURS_ACTION_TYPES.FETCH_TOURS_FAILED, payload: error };
};

// THUNK ACTION:
export const fetchToursAsync =
  (requestString: string = "") =>
  async (dispatch: Dispatch<ToursDipatchTypes>) => {
    dispatch(fetchToursStart());
    const response = await getTours(requestString);

    if (response.status === "success")
      dispatch(fetchToursSuccess(response.data.data, response.totalResults));
    else dispatch(fetchToursFailed(response.message));
  };

export const clearTours = (): ClearTours => {
  return { type: TOURS_ACTION_TYPES.CLEAR_TOURS };
};
