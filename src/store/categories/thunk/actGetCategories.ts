import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import { ICategory } from "../../../types/category";
import baseUrl from "src/Api/baseURL";

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue,signal } = thunkAPI;
    try {
      const response = await baseUrl.get<{ data: ICategory[] }>(
        "/api/v1/categories",
        {
          signal,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
