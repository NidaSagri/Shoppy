import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData.jsx';
import {getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { clearErrors } from '../../features/products/productsSlice.jsx';
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Home = () => {
  const dispatch = useDispatch();
  const {products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error); 
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (<Loader />) : (
        <Fragment>
          <MetaData title="SHOPPY - ECOMMERCE" />
          <div className="banner">
            <p>Welcome to SHOPPY</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products && products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        </Fragment>
      )}
      <ToastContainer position="bottom-center" /> 
    </>
  );
}

export default Home;
