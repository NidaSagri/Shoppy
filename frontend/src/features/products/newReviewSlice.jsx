import { createSlice } from '@reduxjs/toolkit';
import { newReview } from '../../actions/productAction';

const initialState = {
    success: null,
    loading: false,
    error: null,
};

const newReviewSlice = createSlice({
    name: 'newReview',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
    resetReviewState: (state) => {
        state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newReview.pending, (state)=>{
        state.loading = true})
      .addCase(newReview.fulfilled, (state, action)=>{
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(newReview.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { clearErrors, resetReviewState } = newReviewSlice.actions;

export default newReviewSlice.reducer;
