// FormInfo.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { formatVND } from "../../../helpers/formatVND";
import useVietnamAddress from "../../../hooks/useVietnamAddress";
import {
  FaMoneyBillWave,
  FaUniversity,
  FaQrcode,
  FaWallet,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import styles from "./FormInfo.module.css";

export default function Info() {
  const navigate = useNavigate();
  const { provinces, districts, wards, setProvinceCode, setDistrictCode } =
    useVietnamAddress();
  const {
    getTotalPrice,
    getFinalTotal,
    applyDiscount,
    appliedDiscount,
    shippingFee,
  } = useCart();
  const { user } = useAuth();

  // Form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [provinceObj, setProvinceObj] = useState(null);
  const [districtObj, setDistrictObj] = useState(null);
  const [wardObj, setWardObj] = useState(null);
  // Load user info when page loads
  useEffect(() => {
    if (!user?.user_id) return;

    const fullNameFromBE = `${user.first_name || ""} ${
      user.last_name || ""
    }`.trim();

    setFullName(fullNameFromBE);
    setEmail(user.email || "");
    setPhone(user.user_phone || ""); // nếu BE chưa trả thì để rỗng
  }, [user]);

  // Address codes
  const [provinceCodeLocal, setProvinceCodeLocal] = useState("");
  const [districtCodeLocal, setDistrictCodeLocal] = useState("");
  const [wardCode, setWardCode] = useState("");

  // Discount
  const [discountCode, setDiscountCode] = useState("");
  const [subtotal, setSubtotal] = useState(getTotalPrice());
  if (sessionStorage.getItem("orderPreview"))
    useEffect(() => {
      const raw = sessionStorage.getItem("orderPreview");
      if (!raw) return;

      const orderPreview = JSON.parse(raw);
      const c = orderPreview.customer;
      if (!c) return;
      setAddress(c.address || "");
      setNote(c.note || "");

      if (c.province?.code) {
        setProvinceCodeLocal(c.province.code);
        setProvinceCode(c.province.code);
      }

      if (c.district?.code) {
        setDistrictCodeLocal(c.district.code);
        setDistrictCode(c.district.code);
      }

      if (c.ward?.code) {
        setWardCode(c.ward.code);
      }
    }, []);
  // Load user
  useEffect(() => {
    if (user) {
      setFullName(
        `${user.user_first_name || ""} ${user.user_last_name || ""}`.trim()
      );
      setEmail(user.user_email || "");
      setPhone(user.user_phone || "");
    }
  }, [user]);

  // Update subtotal
  useEffect(() => {
    setSubtotal(getTotalPrice());
  }, [getTotalPrice]);

  const handleApplyDiscount = () => {
    const success = applyDiscount(discountCode);
    if (success) alert("Áp dụng mã thành công: " + discountCode.toUpperCase());
    else alert("Mã giảm giá không hợp lệ!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedProvince = provinces.find(
      (p) => String(p.code) === String(provinceCodeLocal)
    );

    const selectedDistrict = districts.find(
      (d) => String(d.code) === String(districtCodeLocal)
    );

    const selectedWard = wards.find((w) => String(w.code) === String(wardCode));

    const orderPreview = {
      customer: {
        user_id: user?.user_id || null,
        fullName,
        email,
        phone,
        address,
        note,

        province: {
          code: provinceCodeLocal,
          name: selectedProvince?.name || "",
        },
        district: {
          code: districtCodeLocal,
          name: selectedDistrict?.name || "",
        },
        ward: {
          code: wardCode,
          name: selectedWard?.name || "",
        },
      },

      pricing: {
        subtotal: getTotalPrice(),
        shippingFee,
        discount: appliedDiscount,
        total: getFinalTotal(),
      },
    };

    sessionStorage.setItem("orderPreview", JSON.stringify(orderPreview));
    navigate("/order-preview");
  };


  return (
    <div className={styles["container"]}>
      <div className={styles["form-section"]}>
        <h3>Thông tin giao hàng</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <div className={styles["row"]}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className={styles["row"]}>
            <select
              required
              value={provinceCodeLocal}
              onChange={(e) => {
                const p = provinces.find((x) => x.code === e.target.value);
                setProvinceObj(p);

                setProvinceCodeLocal(e.target.value);
                setProvinceCode(e.target.value);
                setDistrictCodeLocal(""); // reset district khi thay tỉnh
                setWardCode(""); // reset ward
              }}
            >
              <option value="">Chọn Tỉnh/Thành phố</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>

            <select
              required
              value={districtCodeLocal}
              onChange={(e) => {
                const d = districts.find((x) => x.code === e.target.value);
                setDistrictObj(d);

                setDistrictCodeLocal(e.target.value);
                setDistrictCode(e.target.value);
                setWardCode(""); // reset ward khi thay district
              }}
              disabled={!districts.length}
            >
              <option value="">Chọn Quận/Huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <select
            required
            value={wardCode}
            onChange={(e) => {
              const w = wards.find((x) => x.code === e.target.value);
              setWardObj(w);
              setWardCode(e.target.value);
            }}
            disabled={!wards.length}
          >
            <option value="">Chọn Phường/Xã</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name}
              </option>
            ))}
          </select>

          <textarea
            rows={3}
            placeholder="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit">Hoàn tất đơn hàng</button>
        </form>
      </div>

      {/* Summary */}
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
        {appliedDiscount && (
          <div className={styles["summary-item"]}>
            <span>Giảm giá ({appliedDiscount.code})</span>
            <span>-{formatVND((subtotal * appliedDiscount.value) / 100)}</span>
          </div>
        )}

        <p className={styles["note"]}>
          Quý khách vui lòng quay video khi nhận hàng để đảm bảo quyền lợi nếu
          có khiếu nại.
        </p>

        <div className={`${styles["total"]} ${styles["summary-item"]}`}>
          <span>TỔNG CỘNG</span>
          <span>{formatVND(getFinalTotal())}</span>
        </div>
      </div>
    </div>
  );
}
