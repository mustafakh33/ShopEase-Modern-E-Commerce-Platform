import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/shared";
import { isString } from "src/types/guards";
import actGetPayment from "./thunk/actGetPayment";

interface IPaymentSlice {
  url: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IPaymentSlice = {
  url: "",
  loading: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // place order
    builder.addCase(actGetPayment.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetPayment.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.url = action.payload.url;
    });
    builder.addCase(actGetPayment.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export default paymentSlice.reducer;
