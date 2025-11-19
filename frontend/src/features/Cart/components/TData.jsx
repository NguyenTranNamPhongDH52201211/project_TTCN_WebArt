import Amount from "./Amount.jsx";
import styles from"./TData.module.css"
import lock from "../../../assets/lock.png";
import React from "react";
export default function TData(name,price,amount){
return(
   <tr className={styles['data-container']}>
        <td >
                    <div><img src={lock} alt="" className={styles["product-img"]}/> <p>Sản phẩm A</p></div></td>
                  <td>250.000₫</td>
                  <td><Amount/>
          </td>
    </tr>
   
)
}