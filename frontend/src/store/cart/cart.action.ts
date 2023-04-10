import { Action, ActionWithPayload } from "../../types/actions";
import { TItem } from "../../types/booking";
import { CART_ACTION_TYPES } from "./cart.type";

export type AddItem = ActionWithPayload<CART_ACTION_TYPES.ADD_ITEM, TItem>;
export type RemoveItem = ActionWithPayload<
  CART_ACTION_TYPES.REMOVE_ITEM,
  { tourId: string; startingDate: Date }
>;
export type ClearCart = Action<CART_ACTION_TYPES.CLEAR_CART>;

export type CartDipatchTypes = AddItem | RemoveItem | ClearCart;

export const addItem = (item: TItem): AddItem => {
  return { type: CART_ACTION_TYPES.ADD_ITEM, payload: item };
};

export const removeItem = (tourId: string, startingDate: Date): RemoveItem => {
  return {
    type: CART_ACTION_TYPES.REMOVE_ITEM,
    payload: { tourId, startingDate },
  };
};

export const clearCart = (): ClearCart => {
  return { type: CART_ACTION_TYPES.CLEAR_CART };
};
