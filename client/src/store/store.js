import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";
import toastReducer from "./slices/toastSlice";

const store = configureStore({
  reducer: { auth: authReducer, filter: filterReducer, toast: toastReducer },
});

export default store;
