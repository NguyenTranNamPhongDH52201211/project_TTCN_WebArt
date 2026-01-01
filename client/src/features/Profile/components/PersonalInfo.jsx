import React, { useState, useEffect } from "react";
import styles from "./PersonalInfo.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PersonalInfo() {
  const navigate = useNavigate();
  const { user, loading, logout, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Load dữ liệu từ AuthContext
  useEffect(() => {
    if (user) {
      setFirstName(user.user_first_name || "");
      setLastName(user.user_last_name || "");
      setEmail(user.user_email || "");
      setTel(user.user_phone || "");
    }
  }, [user]);

  if (loading) return <p>Đang tải...</p>;
  if (!user) return <p>Chưa đăng nhập</p>;

  const previewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const onSave = async () => {
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone: tel,
        email: email,
      });

      setIsEditing(false);
      setShowDialog(true);
    } catch (err) {
      console.error("Update profile error:", err);
      alert("Cập nhật thất bại");
    }
  };

  const onLogoutClick = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className={styles["profile-content"]}>
      <h3>Thông tin cá nhân</h3>

      <div className={styles["avatar-section"]}>
        <div className={styles["avatar-preview"]}>
          <img src={avatar || "/default-avatar.png"} alt="Avatar" />
        </div>

        <label
          className={styles["upload-btn"]}
          style={{ opacity: isEditing ? 1 : 0.5 }}
        >
          Chọn ảnh
          <input
            type="file"
            hidden
            disabled={!isEditing}
            accept="image/*"
            onChange={previewAvatar}
          />
        </label>
      </div>

      <div className={styles["form-group"]}>
        <label>Họ</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          readOnly={!isEditing}
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Tên</label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          readOnly={!isEditing}
        />
      </div>
      <div className={styles["form-group"]}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!isEditing} 
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Số điện thoại</label>
        <input
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          readOnly={!isEditing}
        />
      </div>

      {!isEditing ? (
        <>
          <button onClick={() => setIsEditing(true)}>Thay đổi thông tin</button>
          <button onClick={onLogoutClick}>Đăng xuất</button>
        </>
      ) : (
        <>
          <button onClick={onSave}>Lưu thay đổi</button>
          <button onClick={onLogoutClick}>Đăng xuất</button>
        </>
      )}

      {showDialog && (
        <div className={styles["dialog-overlay"]}>
          <div className={styles["dialog-box"]}>
            <h4>✔ Lưu thành công!</h4>
            <button onClick={() => setShowDialog(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
