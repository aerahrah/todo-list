import { createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "../../api/authAPI";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    message: "",
    error: false,
  },
  reducers: {
    clearAuthError: (state) => {
      state.error = false;
    },
    clearAuthMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        const { token, message } = action.payload;
        localStorage.setItem("token", token);
        state.message = message;
        state.status = "succeeded";
        state.error = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload.message;
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.message = action.payload.message;
        state.error = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
        state.error = true;
      });
  },
});

export const { clearAuthError, clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;
