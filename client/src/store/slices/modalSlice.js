import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    updateTaskModal: false,
    createTaskModal: false,
    isSideBarOpen: false,
  },
  reducers: {
    toggleUpdateTaskModal: (state) => {
      state.updateTaskModal = !state.updateTaskModal;
      console.log(state.updateTaskModal);
    },
    toggleCreateTaskModal: (state) => {
      state.createTaskModal = !state.createTaskModal;
    },
    toggleIsSidebarOpen: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

export const {
  toggleUpdateTaskModal,
  toggleCreateTaskModal,
  toggleIsSidebarOpen,
} = modalSlice.actions;
export default modalSlice.reducer;
