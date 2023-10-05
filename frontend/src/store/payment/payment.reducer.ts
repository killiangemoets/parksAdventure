import { PaymentDipatchTypes } from "./payment.action";
import { PAYMENT_ACTION_TYPES } from "./payment.type";

export type PaymentState = {
  readonly cart?: string;
};

export const PAYMENT_INITIAL_STATE: PaymentState = {};

export const paymentReducer = (
  state = PAYMENT_INITIAL_STATE,
  action = {} as PaymentDipatchTypes
): PaymentState => {
  switch (action.type) {
    case PAYMENT_ACTION_TYPES.SET_CART:
      return {
        cart: action.payload,
      };
    case PAYMENT_ACTION_TYPES.REMOVE_CART:
      return {
        cart: undefined,
      };
    default:
      return state;
  }
};
