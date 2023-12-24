import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: { auth: authReducer, filter: filterReducer },
});

export default store;
