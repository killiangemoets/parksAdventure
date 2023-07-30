import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import thunk from "redux-thunk";
import { Dispatch } from "react";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["user", "cart"], // to only store the user and cart slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch | Dispatch<any>;
