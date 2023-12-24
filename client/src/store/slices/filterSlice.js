import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterTask: "",
    sortTask: "",
    taskType: "notes",
    projectId: "",
  },
  reducers: {
    setFilterTask: (state, action) => {
      state.filterTask = action.payload;
    },
    setSortTask: (state, action) => {
      state.sortTask = action.payload;
    },
    setTaskType: (state, action) => {
      state.taskType = action.payload;
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
  },
});

export const { setFilterTask, setSortTask, setProjectId, setTaskType } =
  filterSlice.actions;
export default filterSlice.reducer;
