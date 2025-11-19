import styles from "./Action.module.css";
import React from "react";
export default function Action() {
  return (
    <div className={styles["action"]}>
      <button className={styles["add-to-cart"]}>Thêm vào giỏ hàng</button>
      <button className={styles["payment"]}>Thanh toán</button>
    </div>
  );
}
