import styles from "./Login.module.css";
import React, { useContext } from "react";
import logo from "../../../assets/logo/logo.png";
import { CiLock } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { FaFacebook } from "react-icons/fa6";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      await login(email, password);
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Email hoặc mật khẩu sai");
      setPassword("");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      alert("Đăng nhập Google thành công!");
      navigate("/");
    } catch (err) {
      alert("Đăng nhập Google thất bại!");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook();
      alert("Đăng nhập Facebook thành công!");
      navigate("/");
    } catch (err) {
      alert("Đăng nhập Facebook thất bại!");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img src={logo} className={styles.logo} />

        <h2>Đăng nhập</h2>
        <p className={styles.sub}>Vui lòng nhập thông tin để tiếp tục</p>
        <p className={styles.error}>{error}</p>

        <form onSubmit={handleLogin}>
          <div className={styles.text}>Nhập email</div>
          <div className={styles.input}>
            <IoPerson />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.text}>Nhập mật khẩu</div>
          <div className={styles.input}>
            <CiLock />
         <input
  type={showPassword ? "text" : "password"}
  placeholder="Mật khẩu"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<span
  className={styles.eye}
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</span>

          </div>

          <div className={styles.options}>
            <Link to="/forgot">Quên mật khẩu</Link>
            <Link to="/signup">Tạo tài khoản</Link>
          </div>

          <button className={styles.mainBtn}>Đăng nhập</button>

          <div className={styles.divider}>Hoặc</div>

          <button className={styles.socialBtn} onClick={handleGoogleLogin}>
            <FcGoogle size={22} />
            Đăng nhập bằng Google
          </button>

          <button className={styles.socialBtn} onClick={handleFacebookLogin}>
            <FaFacebook size={22} color="#1877F2" />
            Đăng nhập bằng Facebook
          </button>
        </form>
      </div>
    </div>
  );
}
