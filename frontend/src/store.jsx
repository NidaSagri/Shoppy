import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../src/features/products/productsSlice';
import productDetailsReducer from './features/products/productDetailsSlice';
import userReducer from './features/user/userSlice'
import profileReducer from './features/user/userProfileSlice'
import forgotPasswordReducer from './features/user/forgotPasswordSlice'
import cartReducer from './features/cart/cartSlice'
import newOrderReducer from './features/order/newOrderSlice'
import myOrdersReducer from './features/order/myOrdersSlice'
import orderDetailsReducer from './features/order/orderDetailsSlice'
import newReviewReducer from './features/products/newReviewSlice'
import newProductReducer from './features/products/newProductSlice'
import productReducer from './features/products/productSlice'
import allOrdersReducer from './features/order/allOrdersSlice'
import orderReducer from './features/order/orderSlice'
import allUsersReducer from './features/user/allUsersSlice'
import userDetailsReducer from './features/user/userDetailsSlice'
import productReviewsReducer from './features/products/productReviewsSlice'
import reviewReducer from './features/products/reviewSlice'


export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer


    
  },
})