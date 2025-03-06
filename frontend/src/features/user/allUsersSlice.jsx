import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from "../../actions/userAction";

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState,
    reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state)=>{
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action)=>{
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })

  }
})

export const { clearErrors } = allUsersSlice.actions;

export default allUsersSlice.reducer;
