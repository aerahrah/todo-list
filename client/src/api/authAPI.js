import { createAsyncThunk } from "@reduxjs/toolkit";

import Axios from "axios";

const url = "http://localhost:3500/api/v1";

export const signin = createAsyncThunk("auth/signin", async (userInfo) => {
  try {
    const response = await Axios.post(`${url}/auth/signin`, {
      username: userInfo.username,
      password: userInfo.password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
});

export const signup = createAsyncThunk("auth/signup", async (userInfo) => {
  try {
    console.log(url);
    const response = await Axios.post(`${url}/auth/signup`, {
      username: userInfo.username,
      password: userInfo.password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
});
