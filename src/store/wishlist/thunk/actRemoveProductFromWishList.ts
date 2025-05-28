import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "src/utils";
import baseUrl from "src/Api/baseURL";
import { RootState } from "@store/store";

//get all cart items
export const actRemoveProductFromWishList = createAsyncThunk(
  "wishlist/actRemoveProductFromWishList",
  async (id: string, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const response = await baseUrl.delete(`/api/v1/wishlist/${id}`, {
        headers: { token: auth.token },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actRemoveProductFromWishList;
