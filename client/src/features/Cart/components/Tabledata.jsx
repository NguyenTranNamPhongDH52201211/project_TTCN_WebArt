import styles from "./Tabledata.module.css";
import React from "react";
import TData from "./TData.jsx";

export default function Tabledata({ data }) {
  return (
    <table border={1} className={styles["price-table"]}>
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Hành động</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <TData
            key={item.cart_item_id}
            cartItemId={item.cart_item_id}
            productId={item.id}
            qty={item.qty}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </tbody>
    </table>
  );
}
