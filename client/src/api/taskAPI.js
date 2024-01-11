import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utils/axios";

const url = "http://localhost:3500/api/v1";

export const getAllTask = createAsyncThunk(
  "getAllTask",
  async ({ filterTask, sortTask, projectId, taskType }) => {
    try {
      const response = await Axios.get(`${url}/tasks`, {
        params: {
          searchTerm: filterTask,
          sortBy: sortTask,
          projectId,
          taskType,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
  "createTask",
  async ({ projectId, formData, taskType, isTaskComplete, colorTheme }) => {
    try {
      const response = await Axios.post(`${url}/tasks`, {
        project: projectId,
        title: formData.title,
        name: formData.content,
        taskType: taskType,
        completed: isTaskComplete,
        color: colorTheme,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.errors[0]);
    }
  }
);

export const deleteTask = createAsyncThunk("deleteTask", async (id) => {
  try {
    await Axios.delete(`${url}/tasks/${id}`);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
});

export const updateTask = createAsyncThunk(
  "updateTask",
  async ({ id, formData, singleTaskDataIsComplete, colorTheme }) => {
    try {
      await Axios.patch(`${url}/tasks/${id}`, {
        name: formData.content,
        title: formData.title,
        completed: singleTaskDataIsComplete,
        color: colorTheme,
      });
      console.log("hello");
    } catch (error) {
      throw new Error(error.response.data.errors[0]);
    }
  }
);
