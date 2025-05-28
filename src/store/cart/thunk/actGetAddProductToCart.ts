import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";

export const actGetAddProductToCart = createAsyncThunk(
  "cart/actGetCart",
  async (body: { productId: string }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const response = await baseUrl.post("/api/v1/cart", body, {
        headers: {
          token: auth.token,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetAddProductToCart;
