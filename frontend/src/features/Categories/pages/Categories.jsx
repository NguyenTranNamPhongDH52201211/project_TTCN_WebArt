import React from "react";
import styles from "./Categories.module.css";
import { categories } from "../../../data/ProductConTextType";
import { useNavigate } from "react-router-dom"; // nhớ là react-router-dom chứ ko phải react-router

export default function Categories() {
  const navigate = useNavigate(); // gọi hook ở top-level component

  const handleSelect = (cat, sub) => {  
    navigate("/categoriesitemlist", {
      state: { categoryId: cat, subName: sub }
    });
  }
  return (
    <aside className={styles["catalog"]}>
      <h3 className={styles["catalog-title"]}>Danh mục sản phẩm</h3>
      <ul className={styles["category-list"]}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles["category-item"]}>
            <div className={styles["category-name"]}>{cat.title}</div>

            {/* hiển thị submenu bên phải */}
            <ul className={styles["subcategory-popup"]}>
              {cat.children.map((sub) => (
                <li
                  key={sub}
                  className={styles["subcategory-item"]}
                  onClick={() => handleSelect(cat.id, sub)}
                >
                  {sub}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
