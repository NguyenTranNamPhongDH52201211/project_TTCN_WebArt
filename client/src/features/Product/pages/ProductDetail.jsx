import styles from "./ProductDetail.module.css";
import ProductImage from "../components/ProductImage";
import ProductInfo from "../components/ProductInfo";
import ProductDescription from "../components/ProductDescription";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../data/product";
import React, { useState, useEffect } from "react";
import { ProductContext } from "../../../context/ProductContext";
export default function ProductDetail() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);
  const item = products.find((x) => x.id == id);

  if (!item) {
    return <div className={styles["loading"]}>Đang tải sản phẩm...</div>;
  }
  // lấy ảnh cùng category
  // Lấy tối đa 4 ảnh, bỏ ảnh đầu tiên
  const imageArrRand = item.image.slice(1, 5);

  const value = {
    item,
    imageArrRand,
  };

  return (
    <ProductContext.Provider value={value}>
      <div className={styles["container"]}>
        <ProductImage />
        <ProductInfo />
        <ProductDescription />
      </div>
    </ProductContext.Provider>
  );
}
