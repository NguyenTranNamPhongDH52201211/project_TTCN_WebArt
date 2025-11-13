import React from "react";
import styles from "./Categories.module.css";

const categories = [
  {
    id: "but-co",
    title: "BÚT VẼ, CỌ VẼ",
    children: ["Bút Đi Nét", "Cọ Vẽ", "Bút Gel", "Bút Sắt", "Bút Lông Mực"],
  },
  {
    id: "mau-ve",
    title: "MÀU VẼ",
    children: ["Màu Nước", "Marker", "Màu Chì", "Acrylic", "Sơn Dầu"],
  },
  {
    id: "giay-ve",
    title: "GIẤY VẼ",
    children: ["Giấy Vẽ", "Sổ Vẽ", "Canvas", "Bảng Vải"],
  },
  {
    id: "phac-thao",
    title: "PHÁC THẢO",
    children: ["Bút Chì", "Than Chì", "Ngòi Chì", "Tẩy", "Thước"],
  },
  {
    id: "thu-cong",
    title: "THỦ CÔNG (DIY)",
    children: ["Dụng Cụ Cắt", "Giấy Trang Trí", "Nguyên Liệu DIY"],
  },
  {
    id: "phu-tro",
    title: "DỤNG CỤ BỔ TRỢ",
    children: ["Khay Pha Màu", "Giá Vẽ", "Bình Rửa Cọ", "Túi Đựng Cọ"],
  },
  {
    id: "van-phong",
    title: "VĂN PHÒNG PHẨM",
    children: ["Sổ Tay", "Bút Viết", "Dụng Cụ Học Tập", "Sticker", "Washi Tape"],
  },
];

export default function Categories({ onSelect }) {
  const handleSelect = (cat, sub) => {
    if (onSelect) onSelect({ category: cat, subcategory: sub });
  };

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
                  onClick={() => handleSelect(cat.title, sub)}
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
