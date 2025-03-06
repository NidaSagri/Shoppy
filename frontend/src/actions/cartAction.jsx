import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add to cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, {rejectWithValue}) => {
    try {
      const { data } = await axios.get(`/api/v1/product/${id}`);
      const item = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0]?.url || "", 
        stock: data.product.Stock,
        quantity,
      };

      return item;

    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// save shipping info
export const saveShippingInfo = createAsyncThunk(
  "cart/saveShippingInfo",
  async (data, {rejectWithValue}) => {
    try {
      localStorage.setItem("shippingInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);