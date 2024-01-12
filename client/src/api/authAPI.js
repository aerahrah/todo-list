import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const signin = createAsyncThunk("auth/signin", async (userInfo) => {
  try {
    const response = await Axios.post(`${url}/auth/signin`, {
      username: userInfo.username,
      password: userInfo.password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const signup = createAsyncThunk("auth/signup", async (userInfo) => {
  try {
    const response = await Axios.post(`${url}/auth/signup`, {
      username: userInfo.username,
      password: userInfo.password,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
