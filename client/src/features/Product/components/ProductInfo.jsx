import React from "react";
import styles from "./ProductInfo.module.css";
import ColorOption from "./ColorOption";
import Action from "./Action";
import Amount from "../../Cart/components/Amount";
import { useProduct } from "../../../context/ProductContext";

export default function ProductInfo() {
  const { item, quantity, handleIncrease, handleDecrease } = useProduct();

  if (!item) return null;

  return (
    <div className={styles["product-info"]}>
      <h1>{item.name}</h1>
      <p>Mã sản phẩm: {item.code}</p>

      <div className={styles.price}>{item.price}</div>

      <ColorOption />

      <p>Số lượng</p>
      <Amount qty={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />

      <Action quantity={quantity} />
    </div>
  );
}
