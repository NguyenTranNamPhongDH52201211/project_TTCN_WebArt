import styles from "./Signup.module.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth } from "../../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

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
  const [rules, setRules] = useState({
    length6: false,
    length8: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });
  const getPasswordRules = (pwd) => {
    return {
      length6: pwd.length >= 6,
      length8: pwd.length >= 8,
      lower: /[a-z]/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };
  };

  // Đánh giá mật khẩu
  const checkPasswordStrength = (pwd) => {
    let score = 0;

    if (pwd.length >= 6) score++; // Đủ dài tối thiểu
    if (pwd.length >= 8) score++; // Dài tốt
    if (/[a-z]/.test(pwd)) score++; // Chữ thường
    if (/[A-Z]/.test(pwd)) score++; // Chữ hoa
    if (/[0-9]/.test(pwd)) score++; // Số
    if (/[^A-Za-z0-9]/.test(pwd)) score++; // Ký tự đặc biệt

    if (score <= 2) return "Yếu";
    if (score <= 4) return "Trung bình";
    return "Mạnh";
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(checkPasswordStrength(pwd));
    setRules(getPasswordRules(pwd)); // ← cập nhật từng tiêu chí
    
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

    async function load() {
      try {
        await signup(name, email, password, tel);
        alert("Đăng ký thành công!");
        navigate("/login");
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi kết nối server!");
      }
    }
    load();
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
          <>
            {/* Mức độ mật khẩu */}
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

            {/* Các tiêu chí */}
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
                • Có ký tự đặc biệt (!@#$%)
              </p>
            </div>
          </>
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
