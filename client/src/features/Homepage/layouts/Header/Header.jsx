import React, { useContext } from "react";
import styles from "./Header.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { useCart } from "../../../../context/CartContext"; // import CartContext

export default function Header({
  logo,
  searchPlaceholder,
  favoritesCount,
 
}) {
const { user } = useContext(AuthContext);
  const { toggleSideCart, getCartCount } = useCart();

  const cartCount = getCartCount();
  const navigate = useNavigate();

  const handleLogoClick = () => navigate("/");

  const handleCartClick = () => {
    navigate("/sidecart");
  };

  return (
    <header className={styles["header"]}>
      <div className={styles["logo"]} onClick={handleLogoClick}>
        <img src={logo} alt="Logo" className={styles["logo-img"]} />
      </div>

      <SearchBar placeholder={searchPlaceholder} />

      <div className={styles["icons"]}>
        {!user && (
          <Link to="/login" className={styles["login-button"]}>
            <FaUser style={{ fontSize: "14px" }} />
            Đăng nhập
          </Link>
        )}

        <Link to="/profile" className={styles["icon"]}>
          <FaUser />
        </Link>
        <span className={`${styles["icon"]} ${styles["with-badge"]}`}>
          <FaHeart />
          {favoritesCount > 0 && (
            <span className={styles["badge"]}>{favoritesCount}</span>
          )}
        </span>
        <span
          className={`${styles["icon"]} ${styles["with-badge"]}`}
          onClick={handleCartClick} // thêm action
        >
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className={styles["badge"]}>{cartCount}</span>
          )}
        </span>
      </div>
    </header>
  );
}
