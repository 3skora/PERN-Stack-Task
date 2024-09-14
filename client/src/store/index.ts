import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../store/apiSlice";
import formReducer from "../store/formSlice";
import modalReducer from "../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// Define the root state type

// Combine reducers
const rootReducer = combineReducers({
  form: formReducer,
  modal: modalReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
