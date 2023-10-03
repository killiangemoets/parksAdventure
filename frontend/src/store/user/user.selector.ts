import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => {
  return state.user;
};

export const selectToken = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.token
);

export const selectEmail = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.email
);

export const selectUserId = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.id
);

export const selectUserWishlist = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.wishlist
);

export const selectUserRole = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.role
);
