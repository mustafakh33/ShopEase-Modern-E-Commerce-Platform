import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";

//get all cart items
export const actAddProductToWishList = createAsyncThunk(
  "wishlist/actAddProductToWishList",
  async (body: { productId: string }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const response = await baseUrl.post("/api/v1/wishlist", body, {
        headers: { token: auth.token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAddProductToWishList;
