import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
        navigate("/products");
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product | SHOPPY" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;