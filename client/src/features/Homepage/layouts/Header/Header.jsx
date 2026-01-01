import React from "react";
import styles from "./Header.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaBoxOpen, // 👈 icon đơn hàng
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useCart } from "../../../../context/CartContext";

export default function Header({ logo, searchPlaceholder, favoritesCount }) {
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className={styles["logo-img"]} />
      </div>

      <SearchBar placeholder={searchPlaceholder} />

      <div className={styles.icons}>
        {!user && (
          <Link to="/login" className={styles["login-button"]}>
            <FaUser style={{ fontSize: "14px" }} />
            Đăng nhập
          </Link>
        )}

        {user && (
          <>
            <Link to="/order-history" className={styles.icon}>
              <span className={styles.tooltipWrap}>
                <FaBoxOpen />
                <span className={styles.tooltip}>Đơn hàng của tôi</span>
              </span>
            </Link>

            {/* PROFILE */}
            <Link to="/profile" className={styles.icon}>
              <span className={styles.tooltipWrap}>
                <FaUser />
                <span className={styles.tooltip}>Tài khoản</span>
              </span>
            </Link>
          </>
        )}

      

        {/* CART */}
        <span
          className={`${styles.icon} ${styles["with-badge"]}`}
          onClick={() => navigate("/sidecart")}
        >
          <span className={styles.tooltipWrap}>
            <FaShoppingCart />
            <span className={styles.tooltip}>Giỏ hàng</span>
          </span>
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </span>
      </div>
    </header>
  );
}
