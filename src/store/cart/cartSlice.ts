import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/shared";
import { ICartResponse } from "src/types/cartItem";
import actGetAddProductToCart from "./thunk/actGetAddProductToCart";
import actGetAllProductInCart from "./thunk/actGetAllProductInCart";
import actGetClearCart from "./thunk/actGetClearCart";
import actGetRemoveItemFromCart from "./thunk/actGetRemoveItemFromCart";
import actGetUpdateCartProductQuantity from "./thunk/actGetUpdateCartProductQuantity";
import { isString } from "src/types/guards";

// Define a type for the slice state
interface ICartState {
  addToCart: { count: number; product: string }[];
  cartItems: ICartResponse | null;
  loading: TLoading;
  error: string | null;
}

// Define the initial state using that type
const initialState: ICartState = {
  addToCart: [],
  cartItems: null,
  loading: "idle",
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = null;
    },
  },
  extraReducers: (builder) => {
    //add to cart
    builder.addCase(actGetAddProductToCart.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actGetAddProductToCart.fulfilled, (state, action) => {
      state.addToCart = action.payload.products;
    });
    builder.addCase(actGetAddProductToCart.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    //get all cart items
    builder.addCase(actGetAllProductInCart.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetAllProductInCart.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.cartItems = action.payload;

        // حفظ القيم في localStorage
  if (action.payload.cartId) {
    localStorage.setItem("cartId", action.payload.cartId);
  }

  if (action.payload.data.cartOwner) {
    localStorage.setItem("cartOwner", action.payload.data.cartOwner);
  }
    });
    builder.addCase(actGetAllProductInCart.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    //clearAll cart Item
    builder.addCase(actGetClearCart.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actGetClearCart.fulfilled, (state) => {
      state.cartItems = null;
    });
    builder.addCase(actGetClearCart.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    //delete cart Item
    builder.addCase(actGetRemoveItemFromCart.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actGetRemoveItemFromCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
    builder.addCase(actGetRemoveItemFromCart.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // update cart product quantity
    builder.addCase(actGetUpdateCartProductQuantity.pending, (state) => {
      state.error = null;
    });
    builder.addCase(
      actGetUpdateCartProductQuantity.fulfilled,
      (state, action) => {
        state.cartItems = action.payload;
      }
    );
    builder.addCase(
      actGetUpdateCartProductQuantity.rejected,
      (state, action) => {
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      }
    );
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
