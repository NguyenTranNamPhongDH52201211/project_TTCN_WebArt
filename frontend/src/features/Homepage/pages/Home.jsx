import React, {useState,useEffect, useContext } from "react";
import styles from "./Home.module.css";
import Categories from '../../Categories/pages/Categories';
import ProductList from '../../Product/pages/ProductList';
import { getProducts } from '../../../data/product';
import { SearchContext } from "../../../context/SearchContext";

const Home = () => {
   const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);
  const { keyword } = useContext(SearchContext);

  // Lọc sản phẩm dựa trên keyword, không phân biệt chữ hoa/thường
  const filterArr = keyword
    ? products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
    : [];

  return (
    <div className={styles['home-content']}>
      <Categories className={styles['block']} />
      <ProductList className={styles['block']} filterArr={filterArr} />
    </div>
  );
};

export default Home;
