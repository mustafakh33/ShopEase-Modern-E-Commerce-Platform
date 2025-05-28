import { createSlice } from "@reduxjs/toolkit";
import actGetBrands from "./thunk/actGetBrands";
import { TLoading } from "src/types/shared";
import { isString } from "src/types/guards";

interface IBrand {
  _id: string;
  name: string;
  image: string;
}

interface IBrands {
  allBrands: IBrand[];
  loading: TLoading;
  error: null | string;
}

const initialState: IBrands = {
  allBrands: [],
  loading: "idle",
  error: null,
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    brandCleanUp: (state) => {
      state.allBrands = [];
    },
  },
  extraReducers: (builder) => {
    // get brands from api
    builder.addCase(actGetBrands.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetBrands.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allBrands = action.payload;
    });
    builder.addCase(actGetBrands.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export const { brandCleanUp } = brandsSlice.actions;
export default brandsSlice.reducer;
