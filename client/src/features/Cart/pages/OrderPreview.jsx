// OrderPreview.jsx
import React, { useState } from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../../context/OrderContext";

import {
  createVnpayPayment,
  createMomoPayment,
} from "../../../api/paymentService";
import styles from "./OrderPreview.module.css";
import { formatVND } from "../../../helpers/formatVND";
import { useAddress } from "../../../context/AddressContext";
import { createAddress } from "../../../api/addressService";
import { useAuth } from "../../../context/AuthContext";

export default function OrderPreview() {
  const navigate = useNavigate();
  const { getDetailedCart, clearCart } = useCart();
  const { checkout } = useOrder();
  const { addAddress } = useAddress();
  const { user } = useAuth();

  const preview = JSON.parse(sessionStorage.getItem("orderPreview"));
  const items = getDetailedCart();

  // 🔥 PAYMENT METHOD STATE
  const [paymentMethod, setPaymentMethod] = useState("cod");

  if (!preview) {
    return (
      <div className={styles["order-preview-empty"]}>
        <p>Không có dữ liệu đơn hàng</p>
      </div>
    );
  }

  const handleConfirmPayment = async () => {
    try {
          let addressRes;

      // 1️⃣ TẠO ĐỊA CHỈ TRƯỚC
      if (user?.user_id) {
        // 👉 USER: dùng AddressContext
        addressRes = await addAddress({
          address_recipient_name: preview.customer.fullName || "",
          address_phone: preview.customer.phone,
          address_line: preview.customer.address,
          address_ward: preview.customer.ward?.name,
          address_district: preview.customer.district?.name,
          address_city: preview.customer.province?.name,
        });
      } else {
        // 👉 GUEST: gọi API trực tiếp
        addressRes = await createAddress({
          address_user_id: null,
          address_recipient_name: preview.customer.fullName || "",
          address_phone: preview.customer.phone,
          address_line: preview.customer.address,
          address_ward: preview.customer.ward?.name,
          address_district: preview.customer.district?.name,
          address_city: preview.customer.province?.name,
        });
      }

      const addressId = addressRes.result.address_id;
      // 2️⃣ TẠO ORDER
      const orderRes = await checkout(
        {
          order_number: `ORD-${Date.now()}`,
          order_user_id: user?.user_id || null,
          order_address_id: addressId,
          order_subtotal: preview.pricing.subtotal,
          order_shipping_fee: preview.pricing.shippingFee,
          order_discount_amount: preview.pricing.discount
            ? (preview.pricing.subtotal * preview.pricing.discount.value) / 100
            : 0,
          order_total_amount: preview.pricing.total,
          guest_email: user ? null : preview.customer.email,
          order_notes: preview.customer.note,
          payment_method: paymentMethod,
        },
        items.map((i) => ({
          product_id: i.id,
          product_name: i.name,
          quantity: i.qty,
          unit_price: i.price,
          subtotal: i.price * i.qty,
        }))
      );

      const orderId = orderRes.order.order_id;
      if (paymentMethod === "cod") {
        clearCart();
        sessionStorage.removeItem("orderPreview");
        navigate("/order-success");
        return;
      }

      // if (paymentMethod === "vnpay") {
      //   await createVnpayPayment({ orderId, amount: preview.pricing.total });
      //     clearCart();
      //   sessionStorage.removeItem("orderPreview");
      //   navigate("/order-success");
      //   return;
      // }

      // if (paymentMethod === "momo") {
      //   await createMomoPayment({ orderId, amount: preview.pricing.total });
      //     clearCart();
      //   sessionStorage.removeItem("orderPreview");
      //   navigate("/order-success");
      //   return;
      // }

      //Thanh toan ao
      if (paymentMethod === "vnpay" || paymentMethod === "momo") {
        console.warn("MOCK PAYMENT SUCCESS:", paymentMethod);

        clearCart();
        sessionStorage.removeItem("orderPreview");

        navigate("/order-success", {
          state: {
            paymentMethod,
            mock: true,
          },
        });
        return;
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Thanh toán thất bại");
    }
  };

  return (
    <div className={styles["order-preview-container"]}>
      <h2 className={styles["order-preview-title"]}>Chi tiết đơn hàng</h2>

      {/* ===== THÔNG TIN KHÁCH HÀNG ===== */}
      <section className={styles["customer-info"]}>
        <h3>Thông tin khách hàng</h3>
        <p>
          <strong>Họ tên:</strong> {preview.customer.fullName}
        </p>
        <p>
          <strong>Email:</strong> {preview.customer.email}
        </p>
        <p>
          <strong>Điện thoại:</strong> {preview.customer.phone}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {preview.customer.address},{" "}
          {preview.customer.ward?.name}, {preview.customer.district?.name},{" "}
          {preview.customer.province?.name}
        </p>
        {preview.customer.note && (
          <p>
            <strong>Ghi chú:</strong> {preview.customer.note}
          </p>
        )}
      </section>

      {/* ===== DANH SÁCH SẢN PHẨM ===== */}
      <section className={styles["order-items"]}>
        <h3>Sản phẩm đã chọn</h3>
        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.qty}</td>
                <td>{formatVND(i.price)}</td>
                <td>{formatVND(i.price * i.qty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ===== TÓM TẮT ĐƠN HÀNG ===== */}
      <section className={styles["order-summary"]}>
        <h3>Tóm tắt đơn hàng</h3>

        <div className={styles["summary-row"]}>
          <span>Tạm tính:</span>
          <span>{formatVND(preview.pricing.subtotal)}</span>
        </div>

        <div className={styles["summary-row"]}>
          <span>Phí vận chuyển:</span>
          <span>{formatVND(preview.pricing.shippingFee)}</span>
        </div>

        {preview.pricing.discount && (
          <div className={`${styles["summary-row"]} ${styles["discount"]}`}>
            <span>Giảm giá ({preview.pricing.discount.code}):</span>
            <span>
              -
              {formatVND(
                (preview.pricing.subtotal * preview.pricing.discount.value) /
                  100
              )}
            </span>
          </div>
        )}

        <hr />

        <div className={styles["summary-total"]}>
          <span>Tổng thanh toán:</span>
          <span className={styles["total-amount"]}>
            {formatVND(preview.pricing.total)}
          </span>
        </div>
      </section>

      {/* ===== HÌNH THỨC THANH TOÁN ===== */}
      <div className={styles["payment-method"]}>
        <h3>Hình thức thanh toán</h3>

        <div className={styles["payment-options"]}>
          {/* COD */}
          <label
            className={`${styles["payment-option"]} ${
              paymentMethod === "cod" ? styles["active"] : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <div className={styles["payment-label"]}>
              <span className={styles["payment-title"]}>
                Thanh toán khi nhận hàng (COD)
              </span>
              <span className={styles["payment-desc"]}>
                Trả tiền mặt khi giao hàng
              </span>
            </div>
          </label>

        
          {/* <label
            className={`${styles["payment-option"]} ${
              paymentMethod === "vnpay" ? styles["active"] : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="vnpay"
              checked={paymentMethod === "vnpay"}
              onChange={() => setPaymentMethod("vnpay")}
            />
            <div className={styles["payment-label"]}>
              <span className={styles["payment-title"]}>VNPay</span>
              <span className={styles["payment-desc"]}>
                Thanh toán qua VNPay QR / ATM
              </span>
            </div>
          </label>

        
          <label
            className={`${styles["payment-option"]} ${
              paymentMethod === "momo" ? styles["active"] : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              value="momo"
              checked={paymentMethod === "momo"}
              onChange={() => setPaymentMethod("momo")}
            />
            <div className={styles["payment-label"]}>
              <span className={styles["payment-title"]}>MoMo</span>
              <span className={styles["payment-desc"]}>Ví điện tử MoMo</span>
            </div>
          </label> */}
        </div>
      </div>

      {/* ===== CONFIRM ===== */}
      <button className={styles["confirm-btn"]} onClick={handleConfirmPayment}>
        Xác nhận đặt hàng
      </button>
    </div>
  );
}
