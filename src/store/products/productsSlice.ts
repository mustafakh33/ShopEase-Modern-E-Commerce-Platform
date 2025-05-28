import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "../../types/shared";
import { IProduct } from "../../types/product";
import actGetProductsByCategoryId from "./thunk/actGetProductsByCategoryId";
import { isString } from "src/types/guards";
import actGetSpecificProductsById from "./thunk/actGetSpecificProductsById";
import { ProductResponse } from "src/types/productDetails";

interface ICategoriesState {
  records: IProduct[];
  specificProduct: ProductResponse | null;
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  specificProduct: null,
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    // 
    builder.addCase(actGetProductsByCategoryId.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCategoryId.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCategoryId.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    // 
    builder.addCase(actGetSpecificProductsById.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetSpecificProductsById.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.specificProduct = action.payload;
    });
    builder.addCase(actGetSpecificProductsById.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export const { productCleanUp } = productsSlice.actions;
export default productsSlice.reducer;
