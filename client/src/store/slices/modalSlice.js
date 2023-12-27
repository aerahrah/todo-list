import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    updateTaskModal: false,
    createTaskModal: false,
  },
  reducers: {
    toggleUpdateTaskModal: (state) => {
      state.updateTaskModal = !state.updateTaskModal;
      console.log(state.updateTaskModal);
    },
    toggleCreateTaskModal: (state) => {
      state.createTaskModal = !state.createTaskModal;
    },
  },
});

export const { toggleUpdateTaskModal, toggleCreateTaskModal } =
  modalSlice.actions;
export default modalSlice.reducer;
