import {
  FaMoneyBillWave,
  FaUniversity,
  FaQrcode,
  FaWallet,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import styles from "./FormInfo.module.css";
import React from "react";
export default function Info() {
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
          <input type="text" placeholder="Mã giảm giá" />
          <button>Sử dụng</button>
        </div>

        <div className={styles["summary-item"]}>
          <span>Tạm tính</span>
          <span>48.000₫</span>
        </div>

        <div className={styles["summary-item"]}>
          <span>Phí vận chuyển</span>
          <span>0₫</span>
        </div>

        <p className={styles["note"]}>
          Quý khách vui lòng quay video khi nhận hàng để đảm bảo quyền lợi nếu
          có phát sinh khiếu nại. Mọi thắc mắc xin liên hệ qua Fanpage Facebook
          hoặc số điện thoại hỗ trợ.
        </p>

        <div className={`${styles["total"]} ${styles["summary-item"]}`}>
          <span>TỔNG CỘNG</span>
          <span>48.000₫</span>
        </div>

        <div className={styles["product"]}>
          <img src="https://via.placeholder.com/60" alt="Sản phẩm" />
          <span>Cọ vẽ thư pháp Loboo - Ngọc Lam</span>
        </div>
      </div>
    </div>
  );
}
