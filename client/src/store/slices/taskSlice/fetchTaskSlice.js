import { createSlice } from "@reduxjs/toolkit";
import { getAllTask } from "../../../api/taskAPI";

const fetchTaskSlice = createSlice({
  name: "fetchTask",
  initialState: {
    status: "idle",
    singleTaskData: {},
    singleTaskDataIsComplete: "",
    allTaskData: [],
    refetchData: false,
    error: false,
  },
  reducers: {
    setSingleTaskData: (state, action) => {
      state.singleTaskData = action.payload;
    },
    setSingleTaskDataIsComplete: (state, action) => {
      state.singleTaskDataIsComplete = action.payload;
    },
    clearSingleTaskData: (state) => {
      state.singleTaskData = {};
    },
    toggleRefetchTaskData: (state) => {
      state.refetchData = !state.refetchData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        console.log(action.payload.tasks.completed);
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

export const {
  setSingleTaskData,
  clearSingleTaskData,
  toggleRefetchTaskData,
  setSingleTaskDataIsComplete,
} = fetchTaskSlice.actions;
export default fetchTaskSlice.reducer;
