import React, { useContext, useState } from "react";
import styles from "./PersonalProfile.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import PersonalInfo from "../components/PersonalInfo";
import ChangePassword from "../components/ChangePassword";

export default function PersonalProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("info"); // info | password

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles["profile-container"]}>
      {/* Sidebar */}
      <div className={styles["sidebar"]}>
        <h3>Tài khoản của tôi</h3>

        <div
          className={`${styles["menu-item"]} ${
            activeTab === "info" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("info")}
        >
          Thông tin cá nhân
        </div>

        <div
          className={`${styles["menu-item"]} ${
            activeTab === "password" ? styles["active"] : ""
          }`}
          onClick={() => setActiveTab("password")}
        >
          Đổi mật khẩu
        </div>

        <div className={styles["menu-item"]} onClick={handleLogout}>
          Thoát
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles["main-content"]}>
        {activeTab === "info" && <PersonalInfo user={user} />}
        {activeTab === "password" && <ChangePassword />}
      </div>
    </div>
  );
}
