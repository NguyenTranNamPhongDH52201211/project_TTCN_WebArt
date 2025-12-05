import React from "react"; // Thêm dòng này
import styles from "./CategoriesItemList.module.css";
import { products } from "../../../data/product";
import ProductList from "../../Product/pages/ProductList";
import { useLocation } from "react-router-dom";
const CategoriesItemList = () => {
  const location = useLocation();
  const { categoryId, subName } = location.state || {};
  const filterProduct = (categoryId, subName) => {
    // Lọc theo category trước
    const productsByCategory = products.filter(
      (item) => item.category === categoryId
    );

    // Lọc tiếp theo subName dựa trên các từ đầu tiên
    const filtered = productsByCategory.filter((item) => {
      // Lấy số từ của subName
      const subNameWords = subName.trim().split(/\s+/);
      // Lấy số từ tương ứng của item.name
      const itemWords = item.name
        .trim()
        .split(/\s+/)
        .slice(0, subNameWords.length);
      // So sánh các từ đầu
      return (
        itemWords.join(" ").toLowerCase() ===
        subNameWords.join(" ").toLowerCase()
      );
    });

    return filtered;
  };
  return (
    <div className={styles["content-container"]}>
      <div className={styles["block"]}>
        <ProductList filterArr={filterProduct(categoryId,subName)} />
      </div>
    </div>
  );
};

export default CategoriesItemList;
