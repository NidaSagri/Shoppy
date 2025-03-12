import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Create Order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const { data } = await axios.post("https://shoppy-acc9.onrender.com/api/v1/order/new", order, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// My Orders
export const myOrders = createAsyncThunk(
  "order/createOrder",
  async (_, { rejectWithValue }) => {
    try {
      axios.get("https://shoppy-acc9.onrender.com/api/v1/orders/me", {
        withCredentials: true,
      });
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get Order Details
export const getOrderDetails = createAsyncThunk(
    "order/getOrderDetails",
    async (id, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`https://shoppy-acc9.onrender.com/api/v1/order/${id}`,
          { withCredentials: true });
        return data.order;
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
    }
  );


// Get All Orders (admin)
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://shoppy-acc9.onrender.com/api/v1/admin/orders",
        { withCredentials: true });
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update order
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({id, order}, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `https://shoppy-acc9.onrender.com/api/v1/admin/order/${id}`,
        order,
        config
      );

      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`https://shoppy-acc9.onrender.com/api/v1/admin/order/${id}`,
        { withCredentials: true });
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
