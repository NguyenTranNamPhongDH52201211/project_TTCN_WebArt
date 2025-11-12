import styles from "./Amount.module.css"

export default function Amount(){
    return (
    <div className={styles["quantity-container"]}>
      <button className={styles.btn}>−</button>
      <span className={styles.quantity}>1</span>
      <button className={styles.btn}>+</button>
    </div>
  );
}