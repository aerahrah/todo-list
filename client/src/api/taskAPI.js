import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utils/axios";

const url = "http://localhost:3500/api/v1";

export const getAllTask = createAsyncThunk(
  "fetchAll",
  async ({ filterTask, sortTask, projectId, taskType }) => {
    try {
      console.log(filterTask);
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
  "create",
  async ({ projectId, formData, taskType }) => {
    try {
      console.log(formData);
      const response = await Axios.post(`${url}/tasks`, {
        project: projectId,
        title: formData.title,
        name: formData.content,
        taskType: taskType,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.errors[0]);
    }
  }
);

export const deleteTask = createAsyncThunk("delete", async (id) => {
  try {
    await Axios.delete(`${url}/tasks/${id}`);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
});

export const updateTask = createAsyncThunk(
  "update",
  async ({ id, formData, isTaskComplete }) => {
    try {
      await Axios.patch(`${url}/tasks/${id}`, {
        name: formData.content,
        title: formData.title,
        completed: isTaskComplete,
      });
      console.log("hello");
    } catch (error) {
      throw new Error(error.response.data.errors[0]);
    }
  }
);
