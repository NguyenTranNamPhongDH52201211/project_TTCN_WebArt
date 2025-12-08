import React, { useState, useEffect, useContext } from "react";
import styles from "./Home.module.css";

import Categories from "../../Categories/pages/Categories";
import ProductList from "../../Product/pages/ProductList";
import FeaturedSlider from "./FeaturedSlider";

import { getProducts } from "../../../api/productService";
import { SearchContext } from "../../../context/SearchContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { keyword } = useContext(SearchContext);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  const filterArr = keyword
    ? products.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
      )
    : products;

  return (
    <div className={styles["home-content"]}>
      <div className={styles["top-row"]}>
        <Categories />
        <FeaturedSlider />
      </div>

      <ProductList filterArr={filterArr} />
    </div>
  );
};

export default Home;
