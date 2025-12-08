import React, { useState, useEffect } from "react";
import styles from "./CategoriesItemList.module.css";
import ProductList from "../../Product/pages/ProductList";
import { useLocation } from "react-router-dom";
import { filterProducts } from "../../../api/productService";
const CategoriesItemList = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { subCategoryId } = location.state || {};

  useEffect(() => {
    if (!subCategoryId) return;
    async function load() {
      try {
        const data = await filterProducts(subCategoryId);
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi load sản phẩm:", error);
      }
    }
    load();
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
