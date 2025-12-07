import styles from "./ProductImage.module.css";
import React, { useState } from "react";
import { useProduct } from "../../../context/ProductContext";
import noimage from "../images/noimage.png";

export default function ProductImage() {
  const { item, imageArrRand } = useProduct();

  // ảnh chính vĩnh viễn
  const [mainImage, setMainImage] = useState(
    item.image && item.image.length > 0 ? item.image[0] : noimage
  );

  // ảnh hover tạm thời
  const [hoverImage, setHoverImage] = useState(null);

  // nếu hoverImage tồn tại thì hiển thị nó, không thì mainImage
  const displayedImage = hoverImage || mainImage;

  return (
    <div className={styles["product-image"]}>
      <img
        src={displayedImage}
        alt={item.name}
        className={styles["main-image"]}
      />

      <div className={styles["thumbnail-list"]}>
        {imageArrRand.map((img, i) => (
          <img
            key={i}
            src={img || noimage}
            alt={`Thumb ${i}`}
            className={mainImage === img ? "active" : ""}
            onMouseEnter={() => setHoverImage(img)}
            onMouseLeave={() => setHoverImage(null)}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
