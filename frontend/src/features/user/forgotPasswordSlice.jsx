import { createSlice } from '@reduxjs/toolkit';
import { forgotPassword, resetPassword} from "../../actions/userAction";

const initialState = {
    success: false,
    message:"",
    loading: false,
    error: null,
};

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state)=>{
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action)=>{
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state)=>{
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action)=>{
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPassword.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      
      
  }
})

export const { clearErrors } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
