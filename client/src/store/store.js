import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";
import toastReducer from "./slices/toastSlice";
import modalReducer from "./slices/modalSlice";
import fetchReducer from "./slices/taskSlice/fetchTaskSlice";
import darkModeReducer from "./slices/darkModeSlice";
import projectReducer from "./slices/projectSlice/fetchProjectSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    toast: toastReducer,
    fetch: fetchReducer,
    project: projectReducer,
    modal: modalReducer,
    theme: darkModeReducer,
  },
});

export default store;
