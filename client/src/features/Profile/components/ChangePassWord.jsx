import React, { useState } from "react";
import styles from "./ChangePassword.module.css";
import { useAuth } from "../../../context/AuthContext";
import {
  getPasswordRules,
  checkPasswordStrength,
} from "../../../utils/passwordUtils";

export default function ChangePassword() {
  const { changePassword } = useAuth();

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");

  const [rules, setRules] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  // 👁 hiển thị mật khẩu
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showReNew, setShowReNew] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // xử lý mật khẩu mới
  const handleNewPassChange = (e) => {
    const pwd = e.target.value;
    setNewPass(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
    setRules(getPasswordRules(pwd));
  };

  const handleSubmit = async () => {
    setError("");

    if (!oldPass || !newPass || !reNewPass) {
      setError("❌ Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (passwordStrength === "Yếu") {
      setError("❌ Mật khẩu mới quá yếu");
      return;
    }

    if (newPass !== reNewPass) {
      setError("❌ Mật khẩu mới và nhập lại không khớp");
      return;
    }

    try {
      setLoading(true);
      await changePassword(oldPass, newPass);

      setShowDialog(true);

      // reset form
      setOldPass("");
      setNewPass("");
      setReNewPass("");
      setRules({});
      setPasswordStrength("");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["password-container"]}>
      <h3>Đổi mật khẩu</h3>

      {/* MẬT KHẨU CŨ */}
      <div className={styles["form-group"]}>
        <label>Mật khẩu cũ</label>
        <div className={styles["password-wrapper"]}>
          <input
            type={showOld ? "text" : "password"}
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <span onClick={() => setShowOld(!showOld)}>
            {showOld ? "🙈" : "👁"}
          </span>
        </div>
      </div>

      {/* MẬT KHẨU MỚI */}
      <div className={styles["form-group"]}>
        <label>Mật khẩu mới</label>
        <div className={styles["password-wrapper"]}>
          <input
            type={showNew ? "text" : "password"}
            value={newPass}
            onChange={handleNewPassChange}
          />
          <span onClick={() => setShowNew(!showNew)}>
            {showNew ? "🙈" : "👁"}
          </span>
        </div>
      </div>

      {/* STRENGTH + RULES */}
      {newPass && (
        <>
          <p
            className={`${styles["password-strength"]} ${
              passwordStrength === "Yếu"
                ? styles.weak
                : passwordStrength === "Trung bình"
                ? styles.medium
                : styles.strong
            }`}
          >
            Mức độ mật khẩu: {passwordStrength}
          </p>

          <div className={styles["rules-container"]}>
            <p className={rules.length6 ? styles.ok : styles.no}>
              • Dài ít nhất 6 ký tự
            </p>
            <p className={rules.length8 ? styles.ok : styles.no}>
              • Dài ít nhất 8 ký tự
            </p>
            <p className={rules.lower ? styles.ok : styles.no}>
              • Có chữ thường (a–z)
            </p>
            <p className={rules.upper ? styles.ok : styles.no}>
              • Có chữ hoa (A–Z)
            </p>
            <p className={rules.number ? styles.ok : styles.no}>
              • Có số (0–9)
            </p>
            <p className={rules.special ? styles.ok : styles.no}>
              • Có ký tự đặc biệt (!@#$)
            </p>
          </div>
        </>
      )}

      {/* NHẬP LẠI */}
      <div className={styles["form-group"]}>
        <label>Nhập lại mật khẩu mới</label>
        <div className={styles["password-wrapper"]}>
          <input
            type={showReNew ? "text" : "password"}
            value={reNewPass}
            onChange={(e) => setReNewPass(e.target.value)}
          />
          <span onClick={() => setShowReNew(!showReNew)}>
            {showReNew ? "🙈" : "👁"}
          </span>
        </div>
      </div>

      {error && <p className={styles["error"]}>{error}</p>}

      <button
        className={styles["save-btn"]}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Xác nhận"}
      </button>

      {/* DIALOG */}
      {showDialog && (
        <div className={styles["dialog-overlay"]}>
          <div className={styles["dialog-box"]}>
            <h4>✔ Thông báo</h4>
            <p>Đổi mật khẩu thành công!</p>
            <button onClick={() => setShowDialog(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
