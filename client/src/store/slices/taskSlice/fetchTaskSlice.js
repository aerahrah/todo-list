import { createSlice } from "@reduxjs/toolkit";
import { getSingleTask, getAllTask } from "../../../api/taskAPI";

const fetchTaskSlice = createSlice({
  name: "fetch",
  initialState: {
    status: "idle",
    singleTaskData: null,
    singleTaskDataStatic: null,
    allTaskData: null,
    error: false,
  },
  reducers: {
    setSingleTaskDataStatic: (state, action) => {
      state.singleTaskDataStatic = action.payload;
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
      })
      .addCase(getSingleTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.singleTaskData = action.payload;
        state.error = false;
      })
      .addCase(getSingleTask.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error;
        state.error = true;
      });
  },
});

export const { setSingleTaskDataStatic } = fetchTaskSlice.actions;
export default fetchTaskSlice.reducer;
