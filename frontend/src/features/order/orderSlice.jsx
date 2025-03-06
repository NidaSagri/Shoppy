import { createSlice } from '@reduxjs/toolkit';
import { updateOrder, deleteOrder} from '../../actions/orderAction';

const initialState = {
  isDeleted: false,
  isUpdated: false,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
    deleteOrderResetState(state){
        state.isDeleted = false;
    },
    updateOrderResetState(state){
        state.isUpdated = false;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors , deleteOrderResetState, updateOrderResetState} = orderSlice.actions;

export default orderSlice.reducer;
