import React from "react";

import styles from "./ProductItem.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductItem({p,i}){
  const navigate = useNavigate();


  const handleClick = () => {
    console.log("Clicked product:", p); // kiểm tra p
    navigate(`/product/${p.id}`);
  };

return(
 <div  className={styles.card} onClick={handleClick}>
          <div className={styles.imageWrapper}>
            <img src={p.image}  className={styles.image} />
          </div>
          <h3 className={styles.name}>{p.name}</h3>
          <p className={styles.price}>{p.price}</p>
        </div>
)

}