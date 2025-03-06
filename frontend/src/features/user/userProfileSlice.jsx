import { createSlice } from '@reduxjs/toolkit';
import { updateProfile , updatePassword, updateUser, deleteUser} from "../../actions/userAction";

const initialState = {
    isUpdated: false,
    isDeleted: false,
    loading: false,
    error: null,
    message: null,
};

const userSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
    resetUpdateState: (state) => {
        state.isUpdated = false;
    },
    resetDeleteState: (state) => {
        state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state)=>{
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action)=>{
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProfile.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state)=>{
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action)=>{
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updatePassword.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state)=>{
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateUser.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state)=>{
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.isDeleted = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
      
  }
})

export const { clearErrors, resetUpdateState , resetDeleteState} = userSlice.actions;

export default userSlice.reducer;
