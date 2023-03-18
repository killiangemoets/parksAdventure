import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => {
  return state.user;
};

export const selectEmail = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.email
);
