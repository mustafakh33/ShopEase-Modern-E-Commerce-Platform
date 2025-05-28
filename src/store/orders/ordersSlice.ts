import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/shared";
import { isString } from "src/types/guards";
import { IOrderItem } from "src/types/order";
import actCreateOrder from "./thunk/actCreateOrder";
import actGetOrders from "./thunk/actGetOrders";

interface IOrderSlice {
  userId: string;
  orderList: IOrderItem[];
  loading: TLoading;
  error: string | null;
}

const initialState: IOrderSlice = {
  userId: "",
  orderList: [],
  loading: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderStatus: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // place order
    builder.addCase(actCreateOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actCreateOrder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.userId = action.payload;
    });
    builder.addCase(actCreateOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // get orders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});



export const { resetOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;
