import React from "react";
import styles from "./ProductList.module.css";
import ProductItem from "./ProductItem";

export default function ProductList({ itemAmount = 20, filterArr = [] }) {
  // Chỉ dùng filterArr
  const itemList = filterArr.length !== 0 ? filterArr : [];

  // Nếu muốn giới hạn số lượng
  const limitedList = itemList.slice(0, itemAmount);

  return (
    <div className={styles.container}>
      {limitedList.map((p, i) => (
        <ProductItem key={i} i={i} p={p} />
      ))}
    </div>
  );
}
