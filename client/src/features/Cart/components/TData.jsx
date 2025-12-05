import Amount from "./Amount.jsx";
import styles from "./TData.module.css";
import React from "react";
import { useCart } from "../../../context/CartContext.jsx";
import { FaTrash } from "react-icons/fa"; // import icon thùng rác
import defaultImage from "../../../assets/Productimage/thumb1.png"
export default function TData({ id, image, name, price, qty }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();
const formatPrice = (value) => {
  return value.toLocaleString("vi-VN") + " ₫";
};
  return (
    <tr className={styles["data-container"]}>
      <td className={styles["img-name"]}>
<img src={image || defaultImage} className={styles["product-img"]} />
        <div className={styles["product-info"]}>
          <p>{name}</p>
        </div>
      </td>
<td className={styles["price"]}>{formatPrice(price)}</td>
      <td>
        <Amount
          qty={qty}
          onIncrease={() => increaseQty(id)}
          onDecrease={() => decreaseQty(id)}
        />
      </td>
      <td>
        <button
          className={styles["delete-btn"]}
          onClick={() => removeFromCart(id)}
          title="Xóa sản phẩm"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
