import styles from "./ProductImage.module.css";
import thumb1 from "../../../assets/Productimage/thumb1.png";
import thumb2 from "../../../assets/Productimage/thumb2.png";
import thumb3 from "../../../assets/Productimage/thumb3.png";
import thumb4 from "../../../assets/Productimage/thumb4.png";
import productmain from "../../../assets/Productimage/product-main.png";


export default function ProductImage() {
 

  return (
    <div className={styles["product-image"]}>
        <img src={productmain} alt="Cọ vẽ thư pháp Lobeo - Vân" />
        <div className={styles["thumbnail-list"]}>
          <img src={thumb1} alt="Ảnh phụ 1" />
          <img src={thumb2} alt="Ảnh phụ 2" />
          <img src={thumb3} alt="Ảnh phụ 3" />
          <img src={thumb4} alt="Ảnh phụ 4" />
        </div>
      </div>
  );
}
