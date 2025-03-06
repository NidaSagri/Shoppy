import { createSlice } from '@reduxjs/toolkit';
import { getProducts, getAdminProduct } from '../../actions/productAction';

const initialState = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products (for User)
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Admin Products
      .addCase(getAdminProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors } = productsSlice.actions;

export default productsSlice.reducer;
