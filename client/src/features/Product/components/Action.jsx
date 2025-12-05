import React from "react";
import styles from "./Action.module.css";
import { useProduct } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Action({quantity}) {
  const { item } = useProduct();
  const { addToCart, toggleSideCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(item.id,quantity); 
    toggleSideCart();
  };

  const handlePayment = () => {
    addToCart(item.id,quantity);
    navigate("/maincart");
  };

  return (
    <div className={styles["action"]}>
      <button className={styles["add-to-cart"]} onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </button>
      <button className={styles["payment"]} onClick={handlePayment}>
        Thanh toán
      </button>
    </div>
  );
}
