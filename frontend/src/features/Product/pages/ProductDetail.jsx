import styles from "./ProductDetail.module.css";
import ProductImage from "../components/ProductImage";
import ProductInfo from "../components/ProductInfo";
import ProductDescription from "../components/ProductDescription";
export default function ProductDetail() {
  
  return (
    <div className={styles["container"]}>
      <ProductImage/>
      <ProductInfo/>
      <ProductDescription/>
    </div>
  );
}
