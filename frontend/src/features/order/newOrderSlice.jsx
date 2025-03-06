import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "../../actions/orderAction";

let initialState = {
    order:{},
    loading: false,
    error: null,
  };

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState,
  reducers: {
    clearErrors(state) {
        state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
  },
});

export const { clearErrors } = newOrderSlice.actions;

export default newOrderSlice.reducer;
