import styles from "./Amount.module.css"
import bin from "../../../assets/bin.png"

export default function Amount(){
    return(
        <div className={styles['quantity-container']}>
  <button className="btn minus">−</button>
  <span className="quantity">1</span>
  <button className="btn plus">+</button>
  <button className="btn delete" ><img src={bin} alt="" /></button>
</div>
    )
}