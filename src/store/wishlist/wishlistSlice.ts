import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "src/types/product";
import { TLoading } from "src/types/shared";
import actGetUserWishlist from "./thunk/actGetUserWishlist";
import actAddProductToWishList from "./thunk/actAddProductToWishList";
import actRemoveProductFromWishList from "./thunk/actRemoveProductFromWishList";
import { isString } from "src/types/guards";

interface IWishlist {
  addWishList: { status: string; message: string; data: string[] };
  removeWishList: { status: string; message: string; data: string[] };
  allWishList: { count: number; data: IProduct[] };
  error: null | string;
  loading: TLoading;
}

const initialState: IWishlist = {
  addWishList: { status: "", message: "", data: [] },
  removeWishList: { status: "", message: "", data: [] },
  allWishList: { count: 0, data: [] },
  error: null,
  loading: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.allWishList = { count: 0, data: [] };
    },
    // إضافة reducer جديد لحذف المنتج محليًا
    removeProductLocally: (state, action) => {
      const productId = action.payload;
      state.allWishList.data = state.allWishList.data.filter(
        (product) => product._id !== productId
      );
      state.allWishList.count = state.allWishList.data.length;
    },
  },
  extraReducers: (builder) => {
    // add product to wislist
    builder.addCase(actAddProductToWishList.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actAddProductToWishList.fulfilled, (state, action) => {
      state.addWishList = action.payload;
    });
    builder.addCase(actAddProductToWishList.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    /// get all product to wislist
    builder.addCase(actGetUserWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetUserWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allWishList = action.payload;
    });
    builder.addCase(actGetUserWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // remove product to wislist
    builder.addCase(actRemoveProductFromWishList.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actRemoveProductFromWishList.fulfilled, (state, action) => {
      state.removeWishList = action.payload;
      // حذف المنتج من الـ state محليًا بعد نجاح العملية
      const productIds = action.payload.data;
      state.allWishList.data = state.allWishList.data.filter((product) =>
        productIds.includes(product._id)
      );
      state.allWishList.count = state.allWishList.data.length;
    });
    builder.addCase(actRemoveProductFromWishList.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { clearWishlist, removeProductLocally } = wishlistSlice.actions;
export default wishlistSlice.reducer;