import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";

 const  actGetClearCart= createAsyncThunk(
    "cart/actGetClearCart",
    async (_, thunkAPI) => {
      const { rejectWithValue,getState } = thunkAPI;
      const { auth } = getState() as RootState;
      try {
        const response = await baseUrl.delete("/api/v1/cart", {
          headers: { token:  auth.token },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
      }
    }
  );

export default actGetClearCart;