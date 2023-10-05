import { RootState } from "../store";
import { PaymentState } from "./payment.reducer";

export const selectPaymentReducer = (state: RootState): PaymentState => {
  return state.payment;
};
