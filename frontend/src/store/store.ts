import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { Dispatch } from "react";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
// import sessionStorage from "redux-persist/es/storage/session";

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  // storage: sessionStorage, // to store it in session Storage
  whitelist: ["user", "cart"], // to only store the user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch | Dispatch<any>;
