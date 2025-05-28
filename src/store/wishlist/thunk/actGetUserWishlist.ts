import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";

//get all cart items
export const actGetUserWishlist = createAsyncThunk(
  "wishlist/actGetUserWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    if (!auth.token) {
      return rejectWithValue("User is not authenticated");
    }
    try {
      const response = await baseUrl.get("/api/v1/wishlist", {
        signal,
        headers: { token: auth.token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetUserWishlist;
