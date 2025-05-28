import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "src/utils";
import baseUrl from "src/Api/baseURL";

const actGetBrands = createAsyncThunk(
  "brands/actGetBrands ",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await baseUrl.get("/api/v1/brands", {
        signal,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetBrands;
