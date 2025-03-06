import { createSlice } from '@reduxjs/toolkit';
import { getUserDetails } from "../../actions/userAction";

const initialState = {
    user: {},
    loading: false,
    error: null,
};

const userDetailsSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state)=>{
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })

  }
})

export const { clearErrors } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
