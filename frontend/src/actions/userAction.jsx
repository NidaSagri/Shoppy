import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" },
      withCredentials: true,};
      const { data } = await axios.post(
        "https://shoppy-acc9.onrender.com/api/v1/login",
        { email, password },
        config
      );

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// register
export const register = createAsyncThunk(
  "user/register",
  async (myForm, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" },
       withCredentials: true  };

      const { data } = await axios.post(
        `https://shoppy-acc9.onrender.com/api/v1/register`,
        myForm,
        config
      );

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Load User
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://shoppy-acc9.onrender.com/api/v1/me`,
        { withCredentials: true }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Logout User
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`https://shoppy-acc9.onrender.com/api/v1/logout`,
        { withCredentials: true });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// update user profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (myForm, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } ,
      withCredentials: true };

      const { data } = await axios.put(
        `https://shoppy-acc9.onrender.com/api/v1/me/update`,
        myForm,
        config
      );

      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// update password
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" },
      withCredentials: true  };

      const { data } = await axios.put(
        `https://shoppy-acc9.onrender.com/api/v1/password/update`,
        passwords,
        config
      );

      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// forgot password
export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" }};

      const { data } = await axios.post(
        `https://shoppy-acc9.onrender.com/api/v1/password/forgot`,
        email,
        config
      );

      return data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, passwords }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } ,
      withCredentials: true };

      const { data } = await axios.put(
        `https://shoppy-acc9.onrender.com/api/v1/password/reset/${token}`,
        passwords,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// get all users -- Admin
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://shoppy-acc9.onrender.com/api/v1/admin/users`,
        { withCredentials: true }
      );
      return data.users;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// get user details -- Admin
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `https://shoppy-acc9.onrender.com/api/v1/admin/user/${id}`,
        { withCredentials: true }
      );
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// update user role -- Admin
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } ,
      withCredentials: true };

      const { data } = await axios.put(
        `https://shoppy-acc9.onrender.com/api/v1/admin/user/${id}`,
        userData,
        config
      );

      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// delete user -- Admin
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `https://shoppy-acc9.onrender.com/api/v1/admin/user/${id}`,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
