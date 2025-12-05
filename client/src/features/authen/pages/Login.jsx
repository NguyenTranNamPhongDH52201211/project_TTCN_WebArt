import styles from "./Login.module.css";
import React,{useContext} from "react";
import logo from "../../../assets/logo.png";
import { CiLock } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "./firebase";
import { users } from "../../../data/userAccount";
import { AuthContext } from "../../../context/AuthContext";
export default function Login() {
     const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function findUser(email){
    return users.find(userSpicify=>userSpicify.email==email)
  }
const handleLogin = (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  // 1. Kiểm tra mảng users ảo
  let found = users.find(
    (u) => u.email === email && u.password === password
  );

  // 2. Nếu không tìm thấy, kiểm tra user đã đăng ký từ localStorage
  if (!found) {
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (
      registeredUser &&
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      found = registeredUser;
    }
  }

  if (!found) {
    setError("Tài khoản hoặc mật khẩu sai");
    setPassword(""); // xóa password
  } else {
    setError("");
    alert("Đăng nhập thành công!");
    login(found); // gọi login từ AuthContext
    navigate("/");
  }
};

 const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const gUser = result.user;

    // Tạo user Data theo format của bạn
    const userData = {
      userId: gUser.uid,
      name: gUser.displayName,
      tel: gUser.phoneNumber || "",
      email: gUser.email,
      avatar: gUser.photoURL,
    };

    login(userData); // <-- rất quan trọng
    alert("Đăng nhập Google thành công!");
    navigate("/");
  } catch (error) {
    console.log(error);
    alert("Đăng nhập Google thất bại!");
  }
};

  const handleFacebookLogin = async () => {
  try {
    facebookProvider.addScope("email");
    facebookProvider.addScope("public_profile");

    facebookProvider.setCustomParameters({
      auth_type: "reauthenticate",
      display: "popup",
    });

    const result = await signInWithPopup(auth, facebookProvider);
    const fbUser = result.user;

    const userData = {
      userId: fbUser.uid,
      name: fbUser.displayName,
      tel: fbUser.phoneNumber || "",
      email: fbUser.email,
      avatar: fbUser.photoURL,
    };

    login(userData);

    alert("Đăng nhập Facebook thành công!");
    navigate("/");
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
            <Link to="/forgot">Quên mật khẩu</Link>
            <Link to="/signin">Chưa có tài khoản</Link>
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
