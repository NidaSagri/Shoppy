import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails } from "../../actions/orderAction";

let initialState = {
    order:{},
    loading: false,
    error: null,
  };

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    clearErrors(state) {
        state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
  },
});

export const { clearErrors } = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;
