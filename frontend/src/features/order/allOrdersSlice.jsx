import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders } from "../../actions/orderAction";

let initialState = {
    orders:[],
    loading: false,
    error: null,
  };

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState,
  reducers: {
    clearErrors(state) {
        state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
  },
});

export const { clearErrors } = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
