import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";
import toastReducer from "./slices/toastSlice";
import fetchReducer from "./slices/taskSlice/fetchTaskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    toast: toastReducer,
    fetch: fetchReducer,
  },
});

export default store;
