import React from "react";
import styles from "./ProductDetail.module.css";
import ProductImage from "../components/ProductImage";
import ProductInfo from "../components/ProductInfo";
import ProductDescription from "../components/ProductDescription";
import { useParams } from "react-router-dom";
import { ProductProvider, useProduct } from "../../../context/ProductContext";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <ProductProvider id={id}>
      <InnerProductDetail />
    </ProductProvider>
  );
}

function InnerProductDetail() {
  const { loading } = useProduct();

  if (loading) return <div className={styles["loading"]}>Đang tải sản phẩm...</div>;

  return (
    <div className={styles["container"]}>
      <ProductImage />
      <ProductInfo />
      <ProductDescription />
    </div>
  );
}
