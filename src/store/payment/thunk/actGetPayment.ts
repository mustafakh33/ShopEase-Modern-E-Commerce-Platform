import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import baseUrl from "src/Api/baseURL";
import { RootState } from "@store/store";

const actGetPayment = createAsyncThunk(
  "payment/actGetPayment",
  async (id: string, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    if (!auth.token) {
      return rejectWithValue("User is not authenticated");
    }
    try {
      const response = await baseUrl.post(
        `/api/v1/orders/checkout-session/${id}`,
        {},
        {
          signal,
          headers: { token: auth.token },
        }
      );
        return {
        status: response.data.status,
        url: response.data.session.url,
        successUrl: response.data.session.success_url,
        cancelUrl: response.data.session.cancel_url,
      };
      // return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetPayment;
