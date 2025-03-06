import { createSlice } from "@reduxjs/toolkit";
import { addItemsToCart, saveShippingInfo } from "../../actions/cartAction";

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
    loading: false,
    error: null,
  };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItemsFromCart: (state, action) => {
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        const item = action.payload;

        const isItemExist = state.cart.cartItems.find(
          (i) => i.product === item.product
        );

        if (isItemExist) {
          state.cart.cartItems = state.cart.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          );
        } else {
          state.cart.cartItems.push(item);
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
        state.loading = false;
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveShippingInfo.fulfilled, (state, action) => {
        state.cart.shippingInfo = action.payload;
      })
      .addCase(saveShippingInfo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { removeItemsFromCart } = cartSlice.actions;

export default cartSlice.reducer;
