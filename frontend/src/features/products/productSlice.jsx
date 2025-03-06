import { createSlice } from '@reduxjs/toolkit';
import { deleteProduct, updateProduct} from '../../actions/productAction';

const initialState = {
  isDeleted:false,
  isUpdated: false,
  success:null,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
    deleteProductResetState(state){
        state.isDeleted = false;
    },
    updateProductResetState(state){
        state.isUpdated = false;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.isDeleted = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.isUpdated = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors , deleteProductResetState, updateProductResetState} = productSlice.actions;

export default productSlice.reducer;
