import React, { useState, useEffect } from "react";
import styles from "./CategoriesItemList.module.css";
import ProductList from "../../Product/pages/ProductList";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { formatProducts } from "../../../data/customeProductfield";
const CategoriesItemList = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { subCategoryId } = location.state || {};

  useEffect(() => {
    if (!subCategoryId) return;

    async function fetchProducts() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/filter/${subCategoryId}`
        );
        const formatted = formatProducts(res.data); // dùng helper để format dữ liệu
        setProducts(formatted);
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
      }
    }

    fetchProducts();
  }, [subCategoryId]);

  return (
    <div className={styles["content-container"]}>
      <div className={styles["block"]}>
        <ProductList filterArr={products} />
      </div>
    </div>
  );
};

export default CategoriesItemList;
