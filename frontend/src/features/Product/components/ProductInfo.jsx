import styles from "./ProductInfo.module.css";
import ColorOption from "./ColorOption";
import Action from "./Action";
import Amount from "../../Cart/components/Amount";
export default function ProductInfo(){
    return (
          <div className={styles["product-info"]}>
                <h1>CỌ VẼ THƯ PHÁP LOBEO - VÂN</h1>
                <p>Mã sản phẩm: 2000214260984</p>
        
                <div className={styles.price}>120,000 đ</div>
        
                <ColorOption/>

                <p>Số lượng</p>
                <Amount />
                <Action/>      
              </div>
    )
}