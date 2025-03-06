import React from "react";
import "./App.css";
import { useEffect, useState, useMemo } from "react";
import ResponsiveAppBar from "./component/layout/Header/Header";
import { Routes, Route } from "react-router";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import { store } from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import UpdateProfile from "./component/User/UpdateProfile";
import Profile from "./component/User/Profile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "./component/layout/Loader/Loader";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/NotFound/NotFound";


const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  const stripePromise = useMemo(() => stripeApiKey ? loadStripe(stripeApiKey) : null, [stripeApiKey]);

  return (
    <>
      <ResponsiveAppBar />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword?" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />

        {isAuthenticated && <Route path="/me" element={<Profile />} />}
        {isAuthenticated && (
          <Route path="/me/update" element={<UpdateProfile />} />
        )}
        {isAuthenticated && (
          <Route path="/password/update" element={<UpdatePassword />} />
        )}
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        {isAuthenticated && <Route path="/shipping" element={<Shipping />} />}
        {isAuthenticated && (
          <Route path="/order/confirm" element={<ConfirmOrder />} />
        )}


        <Route
          path="/process/payment"
          element={
            stripeApiKey ? (
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            ) : (
              <Loader />
            )
          }
        />

        {isAuthenticated && <Route path="/success" element={<OrderSuccess />} />}
        {isAuthenticated && <Route path="/orders/me" element={<MyOrders />} />}
        {isAuthenticated && <Route path="/order/:id" element={<OrderDetails/>} />}
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/dashboard" Component={Dashboard} />}    
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/products" Component={ProductList} />}    
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/product" Component={NewProduct} />}    
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/product/:id" Component={UpdateProduct} />}    
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/orders" Component={OrderList} />}    
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/order/:id" Component={ProcessOrder} />}    
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/users" Component={UsersList} />}    
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/user/:id" Component={UpdateUser} />}    
        {isAuthenticated && user.role==="admin" && <Route exact path="/admin/reviews" Component={ProductReviews} />}    
        <Route path="*" element={<NotFound />} />


      </Routes>
      
      <Footer />
    </>
  );
};

export default App;
