import { useProduct } from "../../../context/ProductContext";
import styles from "./ColorOption.module.css";
import React from "react";
export default function ColorOption() {
  const { item } = useProduct();
  return (
    <div className={styles["color-options"]}>
      <p>Màu sắc (vui lòng chọn màu để xem giá từng phân loại):</p>
      <div className={styles["color-buttons"]}>
        {item.colors.map((val,index) => (
          <button key={index} >{val}</button>
        ))}
      </div>
    </div>
  );
}
