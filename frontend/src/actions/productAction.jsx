import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Products (For User)
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (args = {}, { rejectWithValue }) => {
    const {
      keyword = "",
      currentPage = 1,
      price = [0, 25000],
      category,
      ratings = 0,
    } = args;
    try {
      let link = `https://shoppy-acc9.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) link += `&category=${category}`;

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get All Products (For Admin)
export const getAdminProduct = createAsyncThunk(
  "products/getAdminProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("https://shoppy-acc9.onrender.com/api/v1/admin/products");
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create Product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async ({ productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        `https://shoppy-acc9.onrender.com/api/v1/admin/product/new`,
        productData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(
        `https://shoppy-acc9.onrender.com/api/v1/admin/product/${id}`,
        productData,
        config
      );

      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`https://shoppy-acc9.onrender.com/api/v1/admin/product/${id}`);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get Product Details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://shoppy-acc9.onrender.com/api/v1/product/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// new review
export const newReview = createAsyncThunk(
  "products/newReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(`https://shoppy-acc9.onrender.com/api/v1/review`, reviewData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// get all reviews of a product -- Admin
export const getAllReviews = createAsyncThunk(
  "products/getAllReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://shoppy-acc9.onrender.com/api/v1/reviews?id=${productId}`);

      return data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete Review of a Product
export const deleteReviews = createAsyncThunk(
  "products/deleteReviews",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `https://shoppy-acc9.onrender.com/api/v1/reviews?id=${reviewId}&productId=${productId}`);

      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
