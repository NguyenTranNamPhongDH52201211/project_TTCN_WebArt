import React, { useState } from "react";
import styles from "./ChangePassword.module.css";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");

  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = () => {
    setError("");

    // Kiểm tra input trống
    if (!oldPass || !newPass || !reNewPass) {
      setError("❌ Vui lòng điền đủ thông tin");
      return;
    }

    // Nếu mật khẩu cũ sai -> reset tất cả
    if (oldPass !== storedUser.password) {
      setError("❌ Mật khẩu cũ không đúng");
      setOldPass("");
      setNewPass("");
      setReNewPass("");
      return;
    }

    // Nếu mật khẩu mới không trùng -> reset 2 input mới
    if (newPass !== reNewPass) {
      setError("❌ Mật khẩu mới và nhập lại không trùng khớp");
      setNewPass("");
      setReNewPass("");
      return;
    }

    // Cập nhật mật khẩu
    const updatedUser = { ...storedUser, password: newPass };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Hiện dialog thành công
    setShowDialog(true);

    // Reset tất cả input
    setOldPass("");
    setNewPass("");
    setReNewPass("");
  };

  return (
    <div className={styles["password-container"]}>
      <h3>Đổi mật khẩu</h3>

      <div className={styles["form-group"]}>
        <label>Mật khẩu cũ</label>
        <input
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Mật khẩu mới</label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Nhập lại mật khẩu mới</label>
        <input
          type="password"
          value={reNewPass}
          onChange={(e) => setReNewPass(e.target.value)}
        />
      </div>

      {error && <p className={styles["error"]}>{error}</p>}

      <button className={styles["save-btn"]} onClick={handleSubmit}>
        Xác nhận
      </button>

      {showDialog && (
        <div className={styles["dialog-overlay"]}>
          <div className={styles["dialog-box"]}>
            <h4>✔ Thông báo</h4>
            <p>Cập nhật mật khẩu thành công!</p>
            <button onClick={() => setShowDialog(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
