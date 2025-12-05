import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import noimage from "../images/noimage.png";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <img
          src={
            product.image && product.image.trim() !== ""
              ? product.image
              : noimage
          }
          alt={product.name}
          className={styles.image}
        />
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>{product.price}</p>
    </div>
  );
}
