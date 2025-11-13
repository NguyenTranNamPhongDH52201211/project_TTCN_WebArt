import React from "react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ image, name, price, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.price}>{price}</p>
    </div>
  );
}
