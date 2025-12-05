import React, { useContext, useState, useEffect } from "react";
import styles from "./PersonalInfo.module.css";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function PersonalInfo({ user }) {
  const navigate=useNavigate();
  const { login, logout } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setTel(user.tel);
      setAvatar(user.avatar);
    }
  }, [user]);

  const previewAvatar = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const onClickChangeData = () => setIsEditing(true);

  const onSave = () => {
    const updatedUser = { ...user, name, email, tel, avatar };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    login(updatedUser);

    setIsEditing(false);
    setShowDialog(true);
  };
  const onLogoutClick=()=>{
    logout();
    navigate("/");
  }
  return (
    <div className={styles["profile-content"]}>
      <h3>Thông tin cá nhân</h3>

      <div className={styles["avatar-section"]}>
        <div className={styles["avatar-preview"]}>
          <img src={avatar} alt="Avatar" />
        </div>

        <div>
          <label
            htmlFor="avatarUpload"
            className={styles["upload-btn"]}
            style={{
              opacity: isEditing ? 1 : 0.5,
              pointerEvents: isEditing ? "auto" : "none",
            }}
          >
            Chọn ảnh
          </label>

          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            onChange={previewAvatar}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <div className={styles["form-group"]}>
        <label>Họ & tên</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!isEditing}
          className={isEditing ? styles.editable : styles.readonly}
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!isEditing}
          className={isEditing ? styles.editable : styles.readonly}
        />
      </div>

      <div className={styles["form-group"]}>
        <label>Số điện thoại</label>
        <input
          type="tel"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          readOnly={!isEditing}
          className={isEditing ? styles.editable : styles.readonly}
        />
      </div>

      {!isEditing ? (
        <>
          <button className={styles["change-btn"]} onClick={onClickChangeData}>
            Thay đổi thông tin
          </button>
          <button className={styles["logout-btn"]} onClick={onLogoutClick}>
            Đăng xuất
          </button>
        </>
      ) : (
        <>
          <button className={styles["save-btn"]} onClick={onSave}>
            Lưu thay đổi
          </button>
          <button className={styles["logout-btn"]} onClick={onLogoutClick}>
            Đăng xuất
          </button>
        </>
      )}

      {showDialog && (
        <div className={styles["dialog-overlay"]}>
          <div className={styles["dialog-box"]}>
            <h4>✔ Lưu thành công!</h4>
            <p>Thông tin của bạn đã được cập nhật.</p>
            <button onClick={() => setShowDialog(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}
