import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import { IProduct } from "../../../types/product";
import baseUrl from "src/Api/baseURL";

const actGetProductsByCategoryId = createAsyncThunk(
  "products/actGetProductsByCategoryId",
  async (categoryId: string, thunkAPI) => {
    const { rejectWithValue,signal } = thunkAPI;
    try {
      let response;
      if (categoryId === "allProduct") {
        response = await baseUrl.get<{ data: IProduct[] }>(
          "https://ecommerce.routemisr.com/api/v1/products",
          {
            signal,
          }
        );
      } else {
        response = await baseUrl.get<{ data: IProduct[] }>(
          `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
        );
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByCategoryId;
