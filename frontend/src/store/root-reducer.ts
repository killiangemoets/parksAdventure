import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { tourReducer } from "./tour/tour.reducer";
import { toursReducer } from "./tours/tours.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  tours: toursReducer,
  tour: tourReducer,
  cart: cartReducer,
});