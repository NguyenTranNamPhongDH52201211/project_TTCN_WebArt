import styles from "./Amount.module.css";
import React from "react";

export default function Amount({ qty=1, onIncrease, onDecrease }) {
  
  return (
    <div className={styles["quantity-container"]}>
      <button className={styles.btn} onClick={onDecrease}>−</button>
      <span className={styles.quantity}>{qty}</span>
      <button className={styles.btn} onClick={onIncrease}>+</button>
    </div>
  );
}
