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
      return { ...state, items: newItems };
    case CART_ACTION_TYPES.REMOVE_ITEM:
      console.log("REMOVE FROM CART REDUCER", action.payload);
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.tourId === action.payload.tourId &&
              compareDates(item.startingDate, action.payload.startingDate)
            )
        ),
      };
    case CART_ACTION_TYPES.UPDATE_ITEM:
      const alreadyAReservationForThisNewDate = Boolean(
        action.payload.newData?.startingDate &&
          !compareDates(
            action.payload.prevStartingDate,
            action.payload.newData?.startingDate
          ) &&
          state.items.find(
            (item) =>
              item.tourId === action.payload.tourId &&
              compareDates(
                item.startingDate,
                action.payload.newData?.startingDate as Date
              )
          )
      );
      console.log(
        "UPDATE FROM CART REDUCER",
        action.payload,
        alreadyAReservationForThisNewDate
      );
      let updatedItems: TItem[] = [];
      if (!alreadyAReservationForThisNewDate) {
        updatedItems = state.items.map((item) => {
          if (
            item.tourId === action.payload.tourId &&
            compareDates(item.startingDate, action.payload.prevStartingDate)
          )
            return {
              ...item,
              ...action.payload.newData,
            };
          else return { ...item };
        });
      } else {
        state.items.forEach((item) => {
          if (
            item.tourId === action.payload.tourId &&
            compareDates(
              item.startingDate,
              action.payload.newData.startingDate as Date
            )
          ) {
            updatedItems.push({
              ...item,
              adults: item.adults + (action.payload.newData.adults || 0),
              children: item.children + (action.payload.newData.children || 0),
            });
          } else if (
            !(
              item.tourId === action.payload.tourId &&
              compareDates(item.startingDate, action.payload.prevStartingDate)
            )
          ) {
            updatedItems.push(item);
          }
        });
      }
      return { ...state, items: updatedItems };
    case CART_ACTION_TYPES.CLEAR_CART:
      console.log("CLEAR CART REDUCER");
      return CART_INITIAL_STATE;
    default:
      return state;
  }
};
