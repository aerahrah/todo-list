import { createSlice } from "@reduxjs/toolkit";
import { getAllTask } from "../../../api/taskAPI";

const fetchTaskSlice = createSlice({
  name: "fetch",
  initialState: {
    status: "idle",
    singleTaskData: {},
    allTaskData: null,
    error: false,
  },
  reducers: {
    setSingleTaskData: (state, action) => {
      state.singleTaskData = action.payload;
    },
    clearSingleTaskData: (state) => {
      state.singleTaskData = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        console.log(action.payload.tasks);
        state.allTaskData = action.payload.tasks;
        state.status = "succeeded";
        state.error = false;
      })
      .addCase(getAllTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { setSingleTaskData, clearSingleTaskData } =
  fetchTaskSlice.actions;
export default fetchTaskSlice.reducer;
