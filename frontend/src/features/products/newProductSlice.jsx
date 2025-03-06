import { createSlice } from '@reduxjs/toolkit';
import { createProduct } from '../../actions/productAction';

const initialState = {
    product:{},
    success: null,
    loading: false,
    error: null,
};

const newProductSlice = createSlice({
    name: 'newProduct',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
    resetProductState: (state) => {
        state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state)=>{
        state.loading = true})
      .addCase(createProduct.fulfilled, (state, action)=>{
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(createProduct.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { clearErrors, resetProductState } = newProductSlice.actions;

export default newProductSlice.reducer;
