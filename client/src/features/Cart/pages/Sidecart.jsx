import styles from "./Sidecart.module.css";
import Tabledata from "../components/Tabledata";
import React, { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { getProducts } from "../../../api/productService";
import { useNavigate } from "react-router-dom";
export default function Sidecart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);
  const navigate = useNavigate();
  const { getDetailedCart } = useCart();
  const detailedCart = getDetailedCart();

  // Tạo mảng sản phẩm đầy đủ

  const navigateToMaincart = () => {
    navigate("/maincart");
  };
  const naviagateToHome = () => {
    navigate("/");
  };
  return (
    <div className={styles["price-container"]}>
      <h1>Bảng giá sản phẩm</h1>

      <Tabledata data={detailedCart} />

      <div className={styles["direct"]}>
        <a href="#" onClick={navigateToMaincart}>
          Vào giỏ hàng chính
        </a>
        <div className={styles["styleButton"]}>
          <button onClick={naviagateToHome}>Đóng</button>
          <button onClick={navigateToMaincart}>Thanh toán</button>
        </div>
      </div>
    </div>
  );
}
