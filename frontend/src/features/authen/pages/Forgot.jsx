import styles from "./Forgot.module.css";

export default function Forgot() {
  return (
    <div className={styles["forgot-container"]}>
      <h2>Quên mật khẩu</h2>
      <form>
        <label>Nhập email của bạn </label>
        <input type ="text" placeholder="Email" required="" />        
        <button type="submit">Lấy lại mật khẩu</button>
        <a href="#">Quay lại đăng nhập</a>
      </form>
    </div>
  );
}
  