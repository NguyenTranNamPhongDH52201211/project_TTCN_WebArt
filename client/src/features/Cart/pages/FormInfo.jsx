import {
  FaMoneyBillWave,
  FaUniversity,
  FaQrcode,
  FaWallet,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import styles from "./FormInfo.module.css";
import React, { useState,useEffect } from "react";
import { useCart } from "../../../context/CartContext";
export default function Info() {
  const {
    getTotalPrice,
    getFinalTotal,
    applyDiscount,
    appliedDiscount,
    shippingFee,
  } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [subtotal, setSubtotal] = useState(getTotalPrice()); // tạm tính

  // cập nhật subtotal khi cartItems thay đổi
  useEffect(() => {
    setSubtotal(getTotalPrice());
  }, [getTotalPrice]); // getTotalPrice là function trong context
  const handleApplyDiscount = () => {
    const success = applyDiscount(discountCode);
    if (success) {
      alert("Áp dụng mã thành công: " + discountCode.toUpperCase());
    } else {
      alert("Mã giảm giá không hợp lệ!");
    }
  };
function formatVND(amount) {
  if (!amount) return "0 vn₫";
  return amount.toLocaleString("vi-VN") + " vn₫";
}

  return (
    <div className={styles["container"]}>
      <div className={styles["form-section"]}>
        <h3>Thông tin giao hàng</h3>
        <form>
          <input
            type="text"
            placeholder="Họ và tên"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Vui lòng nhập họ và tên")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <div className={styles["row"]}>
            <input
              type="email"
              placeholder="Email"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Vui lòng nhập email")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Vui lòng nhập số điện thoại")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>
          <input
            type="text"
            placeholder="Địa chỉ"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Vui lòng nhập địa chỉ")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <div className={styles["row"]}>
            <select
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Vui lòng chọn Tỉnh/Thành phố")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            >
              <option>Chọn Tỉnh/Thành phố</option>
            </select>
            <select
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Vui lòng chọn Quận/Huyện")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            >
              <option>Chọn Quận/Huyện</option>
            </select>
          </div>
          <select
            required
            onInvalid={(e) =>
              e.target.setCustomValidity("Vui lòng chọn Phường/Xã")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          >
            <option>Chọn Phường/Xã</option>
          </select>
          <textarea rows={3} placeholder="Ghi chú"></textarea>
          <div className={styles["payment-method"]}>
            <h4>Phương thức thanh toán</h4>

            <div className={styles["payment-options"]}>
              <input type="radio" id="cod" name="payment" defaultChecked />
              <label htmlFor="cod">
                <FaMoneyBillWave /> COD
              </label>

              <input type="radio" id="bank" name="payment" />
              <label htmlFor="bank">
                <FaUniversity /> Chuyển khoản
              </label>

              <input type="radio" id="qr" name="payment" />
              <label htmlFor="qr">
                <FaQrcode /> QR
              </label>

              <input type="radio" id="momo" name="payment" />
              <label htmlFor="momo">
                <FaWallet /> Momo
              </label>

              <input type="radio" id="zalopay" name="payment" />
              <label htmlFor="zalopay">
                <SiZalo /> ZaloPay
              </label>

              <input type="radio" id="other" name="payment" />
              <label htmlFor="other">
                <FaWallet /> Ví khác
              </label>
            </div>
          </div>

          <button type="submit">Hoàn tất đơn hàng</button>
        </form>
      </div>

      <div className={styles["summary-section"]}>
        <div className={styles["discount"]}>
          <input
            type="text"
            placeholder="Mã giảm giá"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button type="button" onClick={handleApplyDiscount}>
            Sử dụng
          </button>
        </div>

       <div className={styles["summary-item"]}>
  <span>Tạm tính</span>
  <span>{formatVND(getTotalPrice())}</span>
</div>

<div className={styles["summary-item"]}>
  <span>Phí vận chuyển</span>
  <span>{formatVND(shippingFee)}</span>
</div>

        <p className={styles["note"]}>
          Quý khách vui lòng quay video khi nhận hàng để đảm bảo quyền lợi nếu
          có phát sinh khiếu nại. Mọi thắc mắc xin liên hệ qua Fanpage Facebook
          hoặc số điện thoại hỗ trợ.
        </p>
       {appliedDiscount && (
  <div className={styles["summary-item"]}>
    <span>Giảm giá ({appliedDiscount.code})</span>
    <span>
      -{formatVND((subtotal * appliedDiscount.value) / 100)}
    </span>
  </div>
)}
       <div className={`${styles["total"]} ${styles["summary-item"]}`}>
  <span>TỔNG CỘNG</span>
  <span>{formatVND(getFinalTotal())}</span>
</div>
      </div>
    </div>
  );
}
