import { createSlice } from '@reduxjs/toolkit';
import { getProductDetails } from '../../actions/productAction';

const initialState = {
    product: {},
    loading: false,
    error: null,
};

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state)=>{
        state.loading = true})
      .addCase(getProductDetails.fulfilled, (state, action)=>{
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { clearErrors } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
