import styles from "./Sidecart.module.css";
import Tabledata from "../components/Tabledata";
import React from "react";
export default function Sidecart() {
  return (
    <div className={styles["price-container"]}>
      <h1>Bảng giá sản phẩm</h1>
      <Tabledata />
      <div className={styles["direct"]}>
        <a href="#">Vào giỏ hàng chính</a>
        <div className={styles["styleButton"]}>
          <button>Đóng</button>
          <button>Thanh toán</button>
        </div>
      </div>
    </div>
  );
}
