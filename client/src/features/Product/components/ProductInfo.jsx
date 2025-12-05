// ProductInfo.jsx
import React, { useState } from "react";
import styles from "./ProductInfo.module.css";
import ColorOption from "./ColorOption";
import Action from "./Action";
import Amount from "../../Cart/components/Amount";
import { useProduct } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";

export default function ProductInfo() {
  const { item } = useProduct(); // sản phẩm hiện tại
  const { addToCart } = useCart();

  // Quản lý số lượng riêng cho trang chi tiết
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

  

  return (
    <div className={styles["product-info"]}>
      <h1>{item?.name}</h1>
      <p>Mã sản phẩm: {item?.code}</p>

      <div className={styles.price}>{item?.price}</div>

      <ColorOption />

      <p>Số lượng</p>
      <Amount
        qty={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />

      <Action quantity={quantity} />
    </div>
  );
}
