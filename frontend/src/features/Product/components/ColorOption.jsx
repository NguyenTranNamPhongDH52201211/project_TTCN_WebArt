
import styles from "./ColorOption.module.css";

export default function ColorOption(){
    return (
           <div className={styles["color-options"]}>
                  <p>Màu sắc (vui lòng chọn màu để xem giá từng phân loại):</p>
                  <div className={styles["color-buttons"]}>
                    <button className={styles.active}>Thân đen</button>
                    <button>Thân nâu</button>
                  </div>
                </div>
    )
}