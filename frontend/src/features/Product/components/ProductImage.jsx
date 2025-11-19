import styles from "./ProductImage.module.css";
import thumb1 from "../../../assets/Productimage/thumb1.png";
import React from "react";

import { useProduct } from "../../../context/ProductContext";

export default function ProductImage() {
  const { item,imageArrRand } = useProduct();

  return (
    <div className={styles["product-image"]}>
      <img src={item.image} alt="" />

      <div className={styles["thumbnail-list"]}>
        {imageArrRand.map((img, i) => (
          <img key={i} src={img || thumb1} alt={`Thumb ${i}`} />
        ))}
      </div>
    </div>
  );
}
