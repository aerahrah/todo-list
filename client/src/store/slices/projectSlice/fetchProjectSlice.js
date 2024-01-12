import { createSlice } from "@reduxjs/toolkit";
import { getAllProject } from "../../../api/projectAPI";

const fetchProjectSlice = createSlice({
  name: "fetchProject",
  initialState: {
    status: "idle",
    allProjectData: [],
    isHoverProject: null,
    isFocusProject: null,
    refetchData: false,
    error: false,
  },
  reducers: {
    toggleRefetchProjectData: (state) => {
      state.refetchData = !state.refetchData;
    },
    setIsHoverProject: (state, action) => {
      state.isHoverProject = action.payload;
    },
    setIsFocusProject: (state, action) => {
      state.isFocusProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProject.fulfilled, (state, action) => {
      
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

export const {
  toggleRefetchProjectData,
  setIsHoverProject,
  setIsFocusProject,
} = fetchProjectSlice.actions;
export default fetchProjectSlice.reducer;
