import React from "react";
import styles from "./ProductImage.module.css";
import { useProduct } from "../../../context/ProductContext";
import noimage from "../images/noimage.png";

export default function ProductImage() {
  const { item, mainImage, setMainImage, hoverImage, setHoverImage, imageArrRand } = useProduct();

  if (!item) return <div>Đang tải ảnh...</div>;

  const displayedImage = hoverImage || mainImage || noimage;

  return (
    <div className={styles["product-image"]}>
      <img src={displayedImage} alt={item.name} className={styles["main-image"]} />

      <div className={styles["thumbnail-list"]}>
        {imageArrRand.map((img, i) => (
          <img
            key={i}
            src={img || noimage}
            alt={`Thumb ${i}`}
            className={mainImage === img ? styles.active : ""}
            onMouseEnter={() => setHoverImage(img)}
            onMouseLeave={() => setHoverImage(null)}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
