import { createSlice } from "@reduxjs/toolkit";
import { getAllProject } from "../../../api/projectAPI";

const fetchProjectSlice = createSlice({
  name: "fetchProject",
  initialState: {
    status: "idle",
    allProjectData: [],
    refetchData: false,
    error: false,
  },
  reducers: {
    toggleRefetchProjectData: (state) => {
      state.refetchData = !state.refetchData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
        console.log(action.payload);
        state.allProjectData = action.payload.project;
        state.status = "succeeded";
        state.error = false;
      })
      .addCase(getAllProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { toggleRefetchProjectData } = fetchProjectSlice.actions;
export default fetchProjectSlice.reducer;
