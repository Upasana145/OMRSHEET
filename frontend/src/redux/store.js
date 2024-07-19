import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authSlice from "./slices/authSlice";
import persistStore from "redux-persist/es/persistStore";
import projectSlice from "./slices/projectSlice";

const reducers = combineReducers({
  auth: authSlice,
  projectType: projectSlice,
});

const persistConfig = {
  key: "upu",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
