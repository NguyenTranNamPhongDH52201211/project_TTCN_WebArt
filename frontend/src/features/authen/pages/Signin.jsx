import styles from "./Signin.module.css";

export default function Signin() {
  return (
    <div className={styles["signin-container"]}>
      <h2>Đăng ký tài khoản</h2>
      <form>
        <p>Vui lòng điền thông tin đăng ký</p>
        <label>Nhập họ tên</label>
        <input type="text" placeholder="Họ và tên" required="" />
                <label>Nhập email</label>
        <input type ="text" placeholder="Email" required="" />  
        <label >Nhập mật khẩu</label>

        <input  type ="text" placeholder="Mật khẩu" required="" />
        <label >Nhập số điện thoại</label>

        <input  type ="text" placeholder="Số điện thoại" required="" />

        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
