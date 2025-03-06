import { createSlice } from "@reduxjs/toolkit";
import { myOrders } from "../../actions/orderAction";

let initialState = {
    orders:[],
    loading: false,
    error: null,
  };

const newOrderSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    clearErrors(state) {
        state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(myOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
  },
});

export const { clearErrors } = newOrderSlice.actions;

export default newOrderSlice.reducer;
