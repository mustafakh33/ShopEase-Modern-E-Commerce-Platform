import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";
import { IOrderItem } from "src/types/order";

type TResponse = IOrderItem[];

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (userId: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await baseUrl.get<TResponse>(`/api/v1/orders/user/${userId}`);

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetOrders;
