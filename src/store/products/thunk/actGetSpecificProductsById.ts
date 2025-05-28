import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";
import { ProductResponse } from "src/types/productDetails";

const actGetSpecificProductsById = createAsyncThunk(
  "products/actGetSpecificProductsById",
  async (id: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {

      const response = await baseUrl.get<{ data: ProductResponse }>(
        `/api/v1/products/${id}`,
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

export default actGetSpecificProductsById;
