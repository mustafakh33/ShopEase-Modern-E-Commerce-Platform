import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";
import { RootState } from "@store/store";

const actCreateOrder = createAsyncThunk(
  "orders/actCreateOrder",
  async (id: string, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    if (!auth.token) {
      return rejectWithValue("User is not authenticated");
    }
    try {
      const response = await baseUrl.post<{ data: { user: string } }>(
        `/api/v1/orders/${id}`,
        {},
        {
          signal,
          headers: { token: auth.token },
        }
      );
    
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actCreateOrder;
