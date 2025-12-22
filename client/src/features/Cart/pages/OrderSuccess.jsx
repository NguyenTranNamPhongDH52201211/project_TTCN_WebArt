// OrderSuccess.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderSuccess.module.css";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className={styles["success-container"]}>
      <div className={styles["success-card"]}>
        <FaCheckCircle className={styles["success-icon"]} />

        <h2>Đặt hàng thành công!</h2>
        <p className={styles["success-desc"]}>
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận và đang được
          xử lý.
        </p>

        <div className={styles["success-actions"]}>
          <button onClick={() => navigate("/")}>
            Tiếp tục mua sắm
          </button>
          <button
            className={styles["outline"]}
            onClick={() => navigate("/orders")}
          >
            Xem đơn hàng
          </button>
        </div>

        <p className={styles["note"]}>
          📦 Bạn sẽ nhận được email xác nhận đơn hàng trong ít phút.
        </p>
      </div>
    </div>
  );
}
