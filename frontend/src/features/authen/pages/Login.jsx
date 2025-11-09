import styles from "./Login.module.css";

import logo from "../../../assets/logo.png";
import lock from "../../../assets/lock.png";
import person from "../../../assets/person.png";
import google from "../../../assets/google.png";
import facebook from "../../../assets/facebook.png";

export default function Login() {
  return (
    <div className={styles["app-container"]}>
      <div className={styles["logo-container"]}>
        <img src={logo} alt="" />
      </div>
      <div className={styles["login-container"]}>
        <h2>Đăng nhập</h2>
        <form>
          <div
            style={{  display: "flex", alignItems: "center",backgroundColor:"rgb(219, 219, 219)",width:"9 0%"}}
          >
            <img src={lock} alt="" style={{ width: "15px", height: "15px" }} />

            <p>Vui lòng điền thông tin đăng nhập</p>
          </div>
          <label htmlFor="email">Tên đăng nhập hoặc email</label>
          <div
            style={{ display: "flex",  alignItems: "center"}}
          >
            <img
              src={person}
              alt=""
              style={{ width: "5%", height: "100%" }}
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email"
              required=""
            />
          </div>

          <label htmlFor="password">Mật khẩu</label>
          <div
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={lock} alt="" style={{ width: "5%",height: "100%"  }} />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              required=""
            />
          </div>

          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <a href="#">Quên mật khẩu</a>
            <a href="#">Chưa có tài khoản</a>
          </div>
          <div style={{display:"flex", gap:"50px", justifyContent:"center"}}>
            <a href="#"><img src={facebook} alt="" style={{width:"50px",height:"50px"}}/></a>
           <a href="#"><img src={google} alt="" style={{width:"50px",height:"50px"}}/></a>

          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}
