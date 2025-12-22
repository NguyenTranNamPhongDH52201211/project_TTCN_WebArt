import styles from "./Maincart.module.css";
import Table from "../components/Tabledata";
import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router";

export default function Maincart() {
  const navigate = useNavigate();
  const { getDetailedCart, getTotalPrice } = useCart();

  const detailedCart = getDetailedCart();
  const total = getTotalPrice();

  const [note, setNote] = useState("");

  function formatVND(amount) {
    if (!amount) return "0 ₫";
    return amount.toLocaleString("vi-VN") + " ₫";
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lưu ghi chú đơn hàng
    sessionStorage.setItem("cartNote", note);

    navigate("/forminfocart");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["section1"]}>
        {/* ================= GIỎ HÀNG ================= */}
        <div className={styles["cart-section"]}>
          <h2>GIỎ HÀNG</h2>
          <Table data={detailedCart} />
        </div>

        {/* ================= THÔNG TIN ĐƠN HÀNG ================= */}
        <div className={styles["order-info"]}>
          <h2>THÔNG TIN ĐƠN HÀNG</h2>

          <div className={styles["order-summary"]}>
            <p>
              Tổng: <strong>{formatVND(total)}</strong>
            </p>

            <ul>
              <li>- Miễn phí ship đơn hàng trên 1 triệu</li>
              <li>- Tổng đơn hàng hiện chưa bao gồm phí vận chuyển.</li>
              <li>
                - Phí vận chuyển sẽ hiển thị ở trang thanh toán sau khi điền đầy
                đủ thông tin giao hàng.
              </li>
            </ul>

            {/* ✅ CHỈ FORM HÓA NÚT THANH TOÁN */}
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className={styles["checkout-btn"]}
              >
                THANH TOÁN
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= GHI CHÚ ================= */}
      <div className={styles["note-section"]}>
        <div className={styles["note-textarea"]}>
          <h2>Ghi Chú Đơn Hàng</h2>
          <textarea
            placeholder="Nhập ghi chú của bạn..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div className={styles["note-text"]}>
          <p>
            - Quý khách vui lòng quay video khi nhận hàng để đảm bảo quyền lợi
            đổi trả, bảo hành.
            <br />
            - Các sản phẩm bị thiếu hàng trong quá trình đóng gói, bị lỗi do
            NSX, hoặc lỗi do vận chuyển khách hàng vui lòng gửi phản hồi trong
            vòng 48h.
            <br />
            - Quý khách mua tại cửa hàng sang nhắn hàng qua Fanpage Facebook
            hoặc Lỗ Store.
            <br />
            <em>Xin cảm ơn!</em>
          </p>
        </div>
      </div>
    </div>
  );
}
