import styles from "./ProductDescription.module.css";

export default function ProductDescription(){
   const description = [
  "Cọ vẽ thư pháp Lobeo - Vân được thiết kế tinh tế với phần thân làm từ gỗ tự nhiên, đầu cọ mềm mịn, phù hợp cho các nét vẽ nghệ thuật, thư pháp hoặc vẽ minh họa.",
  "",
  "Sản phẩm mang lại cảm giác cầm chắc tay, độ đàn hồi cao, giúp bạn dễ dàng điều khiển từng nét vẽ.",
  "Thích hợp cho cả người mới bắt đầu và họa sĩ chuyên nghiệp."
].join("\n");


    return (
          <div className={styles["product-description"]}>
                <h2>Mô tả sản phẩm</h2>
                <p>{description}</p>
              </div>
    )
}