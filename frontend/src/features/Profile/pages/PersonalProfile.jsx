import React from "react";
import styles from "./PersonalProfile.module.css";
export default function PersonalProfile() {
  const previewAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = document.getElementById("avatarImg");
      const text = document.querySelector(`.${styles["avatar-text"]}`);
      img.src = URL.createObjectURL(file);
      img.style.display = "block";
      text.style.display = "none"; // ẩn chữ khi có ảnh
    }
  };

  return (
    <div className={styles["profile-container"]}>
      {/* Sidebar */}
      <div className={styles["sidebar"]}>
        <h3>Tài khoản của tôi</h3>
        <div className={`${styles["menu-item"]} ${styles["active"]}`}>
          Thông tin cá nhân
        </div>
        <div className={styles["menu-item"]}>Đổi mật khẩu</div>
        <div className={styles["menu-item"]}>Số điện thoại</div>
        <div className={styles["menu-item"]}>Thoát</div>
      </div>

      {/* Main Content */}
      <div className={styles["profile-content"]}>
        <h3>Thông tin cá nhân</h3>

        <div className={styles["avatar-section"]}>
          <div className={styles["avatar-preview"]}>
            <img
              id="avatarImg"
              src=""
              alt="Avatar"
              style={{ display: "none" }}
            />
            <span className={styles["avatar-text"]}>Avatar</span>
          </div>
          <div>
            <label htmlFor="avatarUpload" className={styles["upload-btn"]}>
              Chọn ảnh
            </label>
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              onChange={previewAvatar}
              style={{ display: "none" }}
            />
            <p style={{ fontSize: "13px", color: "#888", marginTop: "8px" }}>
              Dung lượng tối đa 2MB
            </p>
          </div>
        </div>
        <div className={styles["form-group"]}>
          <label>Họ & Tên</label>
          <input type="text" placeholder="Nhập họ tên của bạn" />
        </div>

        <div className={styles["form-group"]}>
          <label>Email</label>
          <input type="email" placeholder="example@gmail.com" />
        </div>

        <div className={styles["form-group"]}>
          <label>Số điện thoại</label>
          <input type="tel" placeholder="0123456789" />
        </div>

        <button className={styles["save-btn"]}>Lưu thay đổi</button>
        <button className={styles["logout-btn"]}>Đăng xuất</button>
      </div>
    </div>
  );
}
