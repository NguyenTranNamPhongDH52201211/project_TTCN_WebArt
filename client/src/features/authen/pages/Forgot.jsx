import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Forgot.module.css";

export default function Forgot() {
  const { sendResetPasswordOtp, resetPassword } = useAuth();

  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập OTP + mật khẩu mới
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Vui lòng nhập email");

    try {
      const msg = await sendResetPasswordOtp(email);
      setMessage(msg);
      setStep(2);
    } catch (err) {
      setMessage(err);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword) return setMessage("Vui lòng nhập OTP và mật khẩu mới");

    try {
      const msg = await resetPassword(email, otp, newPassword);
      setMessage(msg);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      setMessage(err);
    }
  };

  return (
    <div className={styles["forgot-container"]}>
      <h2 className={styles["title"]}>Quên mật khẩu</h2>

      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["input"]}
          />
          <button type="submit" className={styles["button"]}>Gửi OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <input
            type="text"
            placeholder="Nhập OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={styles["input"]}
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles["input"]}
          />
          <button type="submit" className={styles["button"]}>Đặt lại mật khẩu</button>
        </form>
      )}

      {message && <p className={styles["message"]}>{message}</p>}
    </div>
  );
}
