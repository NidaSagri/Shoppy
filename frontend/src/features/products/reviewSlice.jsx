import { createSlice } from '@reduxjs/toolkit';
import { deleteReviews } from '../../actions/productAction';

const initialState = {
    isDeleted: false,
    loading: false,
    error: null,
};

const reviewSlice = createSlice({
    name: 'reviewSlice',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
    resetReviewState: (state) => {
        state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteReviews.pending, (state)=>{
        state.loading = true})
      .addCase(deleteReviews.fulfilled, (state, action)=>{
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteReviews.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { clearErrors , resetReviewState} = reviewSlice.actions;

export default reviewSlice.reducer;