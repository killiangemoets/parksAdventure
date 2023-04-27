import { Action, ActionWithPayload } from "../../types/actions";
import { TItem, TItemWithTourInfo, TUpdateItem } from "../../types/booking";
import { CART_ACTION_TYPES } from "./cart.type";

export type AddItem = ActionWithPayload<CART_ACTION_TYPES.ADD_ITEM, TItem>;
export type RemoveItem = ActionWithPayload<
  CART_ACTION_TYPES.REMOVE_ITEM,
  { tourId: string; startingDate: Date }
>;
export type UpdateItem = ActionWithPayload<
  CART_ACTION_TYPES.UPDATE_ITEM,
  {
    tourId: string;
    prevStartingDate: Date;
    newData: TUpdateItem;
  }
>;

export type ClearCart = Action<CART_ACTION_TYPES.CLEAR_CART>;

export type SetOrder = ActionWithPayload<
  CART_ACTION_TYPES.SET_ORDER,
  TItemWithTourInfo[]
>;

export type CartDipatchTypes =
  | AddItem
  | RemoveItem
  | UpdateItem
  | ClearCart
  | SetOrder;

export const addItem = (item: TItem): AddItem => {
  return { type: CART_ACTION_TYPES.ADD_ITEM, payload: item };
};

export const removeItem = (tourId: string, startingDate: Date): RemoveItem => {
  return {
    type: CART_ACTION_TYPES.REMOVE_ITEM,
    payload: { tourId, startingDate },
  };
};

export const updateItem = (
  tourId: string,
  prevStartingDate: Date,
  newData: TUpdateItem
): UpdateItem => {
  return {
    type: CART_ACTION_TYPES.UPDATE_ITEM,
    payload: {
      tourId,
      prevStartingDate,
      newData,
    },
  };
};

export const clearCart = (): ClearCart => {
  return { type: CART_ACTION_TYPES.CLEAR_CART };
};

export const setOrder = (order: TItemWithTourInfo[]): SetOrder => {
  return { type: CART_ACTION_TYPES.SET_ORDER, payload: order };
};
