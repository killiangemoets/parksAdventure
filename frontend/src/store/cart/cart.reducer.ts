import { TItem } from "../../types/booking";
import compareDates from "../../utils/comparison/compareDates";
import { CartDipatchTypes } from "./cart.action";
import { CART_ACTION_TYPES } from "./cart.type";

export type CartState = {
  readonly items: TItem[];
};

export const CART_INITIAL_STATE: CartState = {
  items: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as CartDipatchTypes
): CartState => {
  switch (action.type) {
    case CART_ACTION_TYPES.ADD_ITEM:
      console.log("ADD TO CART REDUCER", action.payload);
      let newItems = [];
      let updated = false;
      state.items.forEach((item) => {
        if (
          item.tourId === action.payload.tourId &&
          item.startingDate === action.payload.startingDate
        ) {
          newItems.push({
            ...item,
            adults: item.adults + action.payload.adults,
            children: item.children + action.payload.children,
          });
          updated = true;
        } else newItems.push(item);
      });

      if (!updated) newItems.push(action.payload);
      return { items: newItems };
    case CART_ACTION_TYPES.REMOVE_ITEM:
      console.log("REMOVE FROM CART REDUCER", action.payload);
      return {
        items: state.items.filter(
          (item) =>
            !(
              item.tourId === action.payload.tourId &&
              compareDates(item.startingDate, action.payload.startingDate)
            )
        ),
      };
    case CART_ACTION_TYPES.CLEAR_CART:
      console.log("CLEAR CART REDUCER");
      return CART_INITIAL_STATE;
    default:
      return state;
  }
};
