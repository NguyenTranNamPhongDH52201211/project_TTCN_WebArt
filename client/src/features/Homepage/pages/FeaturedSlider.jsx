import React, { useState, useEffect } from "react";
import styles from "./FeaturedSlider.module.css";

import thumb10 from "../../../assets/Productimage/thumb10.png";
import thumb11 from "../../../assets/Productimage/thumb11.png";
import thumb14 from "../../../assets/Productimage/thumb14.png";
import thumb13 from "../../../assets/Productimage/thumb13.png";

const images = [
  { src: thumb10, title: "Sản phẩm nổi bật", desc: "Giảm giá tới 40% hôm nay" },
  { src: thumb11, title: "Công nghệ mới", desc: "Khám phá dòng sản phẩm 2025" },
  { src: thumb14, title: "Flash Sale", desc: "Nhanh tay - số lượng có hạn" },
  { src: thumb13, title: "Best Seller", desc: "Mua ngay giá ưu đãi" },
];

export default function FeaturedSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      {images.map((img, i) => (
        <div
          key={i}
          className={`${styles.slide} ${i === index ? styles.active : ""}`}
          style={{ backgroundImage: `url(${img.src})` }}
        >
          <div className={styles.overlay}></div>

          <div className={styles.textBox}>
            <h2>{img.title}</h2>
            <p>{img.desc}</p>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className={styles.dots}>
        {images.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
}
