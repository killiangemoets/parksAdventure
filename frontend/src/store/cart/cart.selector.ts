import { createSelector } from "reselect";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

export const selectCartReducer = (state: RootState): CartState => {
  return state.cart;
};

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.items
);
