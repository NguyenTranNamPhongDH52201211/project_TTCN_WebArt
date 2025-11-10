import styles from "./Sidecart.module.css";
import Tabledata from "../components/Tabledata";
export default function Sidecart() {
  return (
    <div className={styles["price-container"]}>
      <h1>Bảng giá sản phẩm</h1>
      <Tabledata />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <a href="#">Vào giỏ hàng chính</a>
        <div>
          {" "}
          <button style={{ marginRight: "10px" }}>Đóng</button>
          <button>Thanh toán</button>
        </div>
      </div>
    </div>
  );
}
