import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../utils/axios";

const url = import.meta.env.VITE_API_URL;

export const getAllProject = createAsyncThunk("getAllProject", async () => {
  try {
    const response = await Axios.get(`${url}/projects`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
});

export const deleteProject = createAsyncThunk("deleteProject", async (id) => {
  try {
    await Axios.delete(`${url}/projects/${id}`);
  } catch (error) {
    throw new Error(error.response.data.errors[0]);
  }
});
export const createProject = createAsyncThunk(
  "createProject",
  async (title) => {
    try {
      await Axios.post(`${url}/projects`, {
        projectTitle: title,
      });
    } catch (error) {
      throw new Error(error.response.data.errors[0]);
    }
  }
);
export const updateProject = createAsyncThunk(
  "updateProject",
  async ({ title, id }) => {
    try {
      const response = await Axios.patch(`${url}/projects/${id}`, {
        projectTitle: title,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.errors[0]);
    }
  }
);
