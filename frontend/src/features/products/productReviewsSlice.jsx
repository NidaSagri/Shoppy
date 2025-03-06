import { createSlice } from '@reduxjs/toolkit';
import { getAllReviews } from '../../actions/productAction';

const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

const productReviewsSlice = createSlice({
    name: 'productReviews',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviews.pending, (state)=>{
        state.loading = true})
      .addCase(getAllReviews.fulfilled, (state, action)=>{
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { clearErrors } = productReviewsSlice.actions;

export default productReviewsSlice.reducer;
