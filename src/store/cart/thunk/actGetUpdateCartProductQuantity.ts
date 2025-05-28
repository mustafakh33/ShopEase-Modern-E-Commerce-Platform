import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";

const actGetUpdateCartProductQuantity = createAsyncThunk(
  "cart/actGetUpdateCartProductQuantity",
  async ({ id, body }: { id: string; body: { count: string } }, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const response = await baseUrl.put(`/api/v1/cart/${id}`, body, {
        headers: { token: auth.token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetUpdateCartProductQuantity;
