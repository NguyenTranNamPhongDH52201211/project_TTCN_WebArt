import Amount from "./Amount.jsx";
import styles from "./TData.module.css";
import React from "react";
import { useCart } from "../../../context/CartContext.jsx";
import { FaTrash } from "react-icons/fa"; // import icon thùng rác

export default function TData({ id, image, name, price, qty }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <tr className={styles["data-container"]}>
      <td className={styles['img-name']}>
        <img src={image} className={styles["product-img"]} /> 
        <p>{name}</p>
      </td>
      <td>{price}</td>
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
