import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import thunk from "redux-thunk";
import { Dispatch } from "react";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { userReducer } from "./user/user.reducer";
import { toursReducer } from "./tours/tours.reducer";
import { tourReducer } from "./tour/tour.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { paymentReducer } from "./payment/payment.reducer";

export type RootState = ReturnType<typeof rootReducer>;
export type PaymentState = ReturnType<typeof paymentReducer>;

const paymentPersistConfig: PersistConfig<PaymentState> = {
  key: "payment",
  storage: storageSession,
};

const rootReducer = combineReducers({
  user: userReducer,
  tours: toursReducer,
  tour: tourReducer,
  cart: cartReducer,
  payment: persistReducer(paymentPersistConfig, paymentReducer),
});

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["user", "cart", "payment"], // to only store the user and cart slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch | Dispatch<any>;
