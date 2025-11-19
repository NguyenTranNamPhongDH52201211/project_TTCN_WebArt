import styles from "./Login.module.css";
import React from "react";
import logo from "../../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup   } from "firebase/auth";
import { auth, googleProvider,facebookProvider} from "./firebase";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { userId: "1", email: "nguyenvana@gmail.com", password: "123" },
    { userId: "2", email: "lethib@gmail.com", password: "124" },
    { userId: "3", email: "tranthic@gmail.com", password: "125" },
  ];
  const handleLogin = (e) => {
    if (email != "" && password != "") {
      e.preventDefault();
      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!found) {
        setError("Tài khoản hoặc mật khẩu sai");
        setPassword(""); // xóa password
      } else {
        setError("");
        alert("Đăng nhập thành công!");
      }
    } else {
      setError("");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("Login thành công:", user);
      alert("Đăng nhập Google thành công!");
    } catch (error) {
      console.log(error);
      alert("Đăng nhập Google thất bại!");
    }
  };
const handleFacebookLogin = async () => {
  try {
    // Thêm scope
    facebookProvider.addScope('email');
    facebookProvider.addScope('public_profile');

    // Ép popup hiện chọn tài khoản khác
    facebookProvider.setCustomParameters({
      auth_type: 'reauthenticate', // luôn yêu cầu xác thực lại
      display: 'popup'
    });

    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    console.log("Login Facebook thành công:", user);
    alert("Đăng nhập Facebook thành công!");
  } catch (error) {
    console.log(error);
    alert("Đăng nhập Facebook thất bại!");
  }
};
  return (
    <div className={styles["app-container"]}>
      <div className={styles["logo-container"]}>
        <img src={logo} alt="" />
      </div>
      <div className={styles["login-container"]}>
        <h2>Đăng nhập</h2>
        <form>
          <p>Vui lòng điền thông tin đăng nhập</p>
          <p className={styles["error"]}>{error}</p>
          <label>Tên đăng nhập hoặc email</label>
          <div className={styles["input-style"]}>
            <IoPerson />
            <input
              type="email"
              value={email}
              placeholder="Nhập email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label>Mật khẩu</label>
          <div className={styles["input-style"]}>
            <CiLock />
            <input
              type="password"
              value={password}
              placeholder="Nhập mật khẩu"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/Forgot">Quên mật khẩu</Link>
            <Link to="/Signin">Chưa có tài khoản</Link>
          </div>
          <div
            style={{ display: "flex", gap: "50px", justifyContent: "center" }}
          >
            <button
              onClick={handleGoogleLogin}
              style={{ background: "none", border: "none" }}
            >
              <FcGoogle size={50} />
            </button>
            <button
              onClick={handleFacebookLogin}
              style={{ background: "none", border: "none" }}
            >
              <FaFacebook size={50} color="#1877F2" />
            </button>
          </div>
          <button type="submit" onClick={handleLogin}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
