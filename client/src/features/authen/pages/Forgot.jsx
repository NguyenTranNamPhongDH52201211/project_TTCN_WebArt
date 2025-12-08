import { Link } from "react-router-dom";
import styles from "./Forgot.module.css";
import React, { useState } from "react";
import { users } from "../../../api/userAccount";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgot = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Vui lòng nhập email!");
      return;
    }

    // Kiểm tra trong mảng users ảo
    let found = users.find((u) => u.email === email);

    // Kiểm tra user đăng ký từ localStorage
    if (!found) {
      const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
      if (registeredUser && registeredUser.email === email) {
        found = registeredUser;
      }
    }

    if (!found) {
      setMessage("Email không tồn tại!");
    } else {
      // Hiển thị mật khẩu (chỉ demo)
      setMessage(`Mật khẩu của bạn là: ${found.password}`);
    }
  };

  return (
    <div className={styles["forgot-container"]}>
      <h2 className={styles["title"]}>Quên mật khẩu</h2>
      <form onSubmit={handleForgot}>
        <label className={styles["label"]}>Nhập email của bạn</label>
        <input
          className={styles["input"]}
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={styles["button"]} type="submit">
          Lấy lại mật khẩu
        </button>
        {message && <p className={styles["message"]}>{message}</p>}
        <Link className={styles["link"]} to="/login">
          Quay lại đăng nhập
        </Link>
      </form>
    </div>
  );
}
