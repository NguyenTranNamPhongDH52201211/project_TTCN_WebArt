import styles from "./Signin.module.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // Check email hợp lệ
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Check số điện thoại
  const validateTel = (tel) => {
    const regex = /^[0-9]{10}$/; // chỉ số, dài 9-12 số
    return regex.test(tel);
  };

  // Đánh giá mật khẩu
  const checkPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "Yếu";
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8)
      return "Mạnh";
    return "Trung bình";
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStrength(checkPasswordStrength(e.target.value));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // kiểm tra tất cả trường
    if (!name || !email || !password || !tel) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email không hợp lệ!");
      return;
    }
    if (!validateTel(tel)) {
      setError("Số điện thoại phải là số và có 10 chữ số!");
      return;
    }
    if (passwordStrength === "Yếu") {
      setError("Mật khẩu quá yếu!");
      return;
    }

    // Lưu thông tin vào localStorage
    const newUser = { userId: Date.now(), name, email, password, tel };
    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    alert("Đăng ký thành công!");
    navigate("/login"); // chuyển về trang đăng nhập
  };

  return (
    <div className={styles["signin-container"]}>
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSignup}>
        {error && <p className={styles["error"]}>{error}</p>}

        <label>Họ và tên</label>
        <input
          type="text"
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={handlePasswordChange}
        />
        {password && (
          <p className={styles["password-strength"]}>
            Mức độ mật khẩu: {passwordStrength}
          </p>
        )}

        <label>Số điện thoại</label>
        <input
          type="text"
          placeholder="Số điện thoại"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
