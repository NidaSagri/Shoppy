import { createSlice } from '@reduxjs/toolkit';
import { login, register, loadUser, logout } from "../../actions/userAction";

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userLoginSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state)=>{
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state,action)=>{
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state)=>{
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state,action)=>{
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(loadUser.pending, (state)=>{
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state,action)=>{
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state)=>{
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state)=>{
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { clearErrors } = userLoginSlice.actions;

export default userLoginSlice.reducer;
