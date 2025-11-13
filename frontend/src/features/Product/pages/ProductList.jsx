import React from "react";
import styles from "./ProductList.module.css";
import lock from "../../../assets/lock.png";

export default function ProductList() {
  const products = [
    { image: lock, name: "Cọ thư pháp Lobeo", price: "120.000đ" },
    { image: "/images/paint.jpg", name: "Màu nước Sakura", price: "90.000đ" },
    { image: "/images/canvas.jpg", name: "Giấy vẽ cao cấp", price: "150.000đ" },
    { image: "/images/pen.jpg", name: "Bút kỹ thuật Artline", price: "70.000đ" },
    { image: "/images/palette.jpg", name: "Bảng pha màu", price: "50.000đ" },
    { image: "/images/stand.jpg", name: "Giá vẽ gỗ mini", price: "230.000đ" },
    { image: "/images/marker.jpg", name: "Bút marker Touch", price: "110.000đ" },
    { image: "/images/sketch.jpg", name: "Sổ sketch Artbook", price: "80.000đ" },
    { image: "/images/knife.jpg", name: "Dao pha màu", price: "60.000đ" },
    { image: "/images/eraser.jpg", name: "Tẩy họa sĩ Staedtler", price: "30.000đ" },
  ];

  return (
    <div className={styles.container}>
      {products.map((p, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.imageWrapper}>
            <img src={p.image}  className={styles.image} />
          </div>
          <h3 className={styles.name}>{p.name}</h3>
          <p className={styles.price}>{p.price}</p>
        </div>
      ))}
    </div>
  );
}
