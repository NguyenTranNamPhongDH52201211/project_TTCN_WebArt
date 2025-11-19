import styles from "./Tabledata.module.css";
import React from "react";
import TData from "./TData.jsx";
export default function Table() {
  return (
    <table className={styles["price-table"]}>
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
        </tr>
      </thead>
      <tbody>
        <TData />
        <TData />
        <TData />
      </tbody>
    </table>
  );
}
