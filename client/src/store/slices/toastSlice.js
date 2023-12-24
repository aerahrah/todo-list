import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toastMessage: "",
    displayToast: false,
  },
  reducers: {
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload;
    },
    toggleDisplayToast: (state) => {
      state.displayToast = !state.displayToast;
    },
  },
});

export const { setToastMessage, toggleDisplayToast } = toastSlice.actions;
export default toastSlice.reducer;
