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

export const deleteTask = async (id) => {
  try {
    await Axios.delete(`${url}/tasks/${id}`);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const updateTask = async (id, name, title, isCompleted) => {
  try {
    await Axios.patch(`${url}/tasks/${id}`, {
      name: name,
      title: title,
      completed: isCompleted,
    });
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};

export const createTask = async (title, name, projectId, taskType) => {
  try {
    const response = await Axios.post(`${url}/tasks`, {
      project: projectId,
      title: title,
      name: name,
      taskType: taskType,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
};
