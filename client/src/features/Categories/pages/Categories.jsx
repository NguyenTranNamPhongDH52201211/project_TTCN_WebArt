import React, { useState, useEffect } from "react";
import styles from "./Categories.module.css";
import { getCategories } from "../../../api/categoriesService";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi load categories:", error);
      }
    }
    load();
  }, []);
  const handleSelect = (subCateId) => {
    navigate("/categoriesitemlist", {
      state: { subCategoryId: subCateId },
    });
  };

  return (
    <aside className={styles.catalog}>
      <h3 className={styles["catalog-title"]}>Danh mục sản phẩm</h3>
      <ul className={styles["category-list"]}>
        {categories.map((cat) => (
          <li key={cat.id} className={styles["category-item"]}>
            <div className={styles["category-name"]}>{cat.title}</div>

            {/* hiển thị submenu */}
            <ul className={styles["subcategory-popup"]}>
              {cat.children.map((obj, i) => (
                <li
                  key={i}
                  className={styles["subcategory-item"]}
                  onClick={() => handleSelect(obj.id)}
                >
                  {obj.title}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}
