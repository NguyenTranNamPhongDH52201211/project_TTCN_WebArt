import styles from "./ProductDetail.module.css";
import ProductImage from "../components/ProductImage";
import ProductInfo from "../components/ProductInfo";
import ProductDescription from "../components/ProductDescription";
import { useParams } from "react-router-dom";
import { products } from "../../../data/product";
import React from "react";
import Header from "../../Homepage/layouts/Header/Header";
import Footer from "../../Homepage/layouts/Footer/Footer";
import { ProductContext } from "../../../context/ProductContext";

export default function ProductDetail() {
  const { id } = useParams();
  const item = products.find((x) => x.id == id);

  // lấy ảnh cùng category
  let imageArr = products
    .filter((x) => x.category === item.category && x.id !== item.id)
    .map((x) => x.image);

  // random 4 ảnh
  const imageArrRand = [...imageArr]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const value = {
    item,
    imageArrRand
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
