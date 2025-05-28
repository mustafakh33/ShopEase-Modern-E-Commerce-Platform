import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import { RootState } from "@store/store";
import baseUrl from "src/Api/baseURL";

//get all cart items
export const actGetAllProductInCart = createAsyncThunk(
  "cart/getAllUserCartItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    console.log(auth.token)

    if (!auth.token) {
      return rejectWithValue("User is not authenticated");
    }
    try {
      const response = await baseUrl.get("/api/v1/cart", {
        signal,
        headers: { token: auth.token },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetAllProductInCart;
