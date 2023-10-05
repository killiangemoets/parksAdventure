import { Action, ActionWithPayload } from "../../types/actions";
import { PAYMENT_ACTION_TYPES } from "./payment.type";

export type SetCart = ActionWithPayload<PAYMENT_ACTION_TYPES.SET_CART, string>;
export type RemoveCart = Action<PAYMENT_ACTION_TYPES.REMOVE_CART>;

export type PaymentDipatchTypes = SetCart | RemoveCart;

export const setCart = (cart: string): SetCart => {
  return { type: PAYMENT_ACTION_TYPES.SET_CART, payload: cart };
};

export const removeCart = (): RemoveCart => {
  return { type: PAYMENT_ACTION_TYPES.REMOVE_CART };
};
