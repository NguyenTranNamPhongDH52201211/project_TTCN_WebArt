
import styles from "./Sidecart.module.css"
import Amount from "../components/Amount";
import lock from "../../../assets/lock.png";
export default function Sidecart(){
    return (
        <div className={styles["price-container"]}>
  <h1>Bảng giá sản phẩm</h1>
  <table className={styles["price-table"]}>
    <thead>
      <tr>
        <th>Tên sản phẩm</th>
        <th>Giá</th>
        <th>Số lượng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <div><img src={lock} alt="" /> <p>Sản phẩm A</p></div></td>
        <td>250.000₫</td>
        <td><Amount/>
</td>
      </tr>
      <tr>
        <td>
          <div><img src={lock} alt="" /> <p>Sản phẩm B</p></div></td>
        <td>180.000₫</td>
        <td><Amount/></td>
      </tr>
      <tr>
       <td>
          <div><img src={lock} alt="" /> <p>Sản phẩm C</p></div></td>
        <td>320.000₫</td>
        <td><Amount/></td>
      </tr>
      <tr>
        <td style={{textAlign:"right"}}colSpan={2} >   Tổng cộng </td>
          <td>0đ</td>
    
      </tr>
      
    </tbody>
  </table>
  <div style={{display:"flex",justifyContent:"space-between"}}>
<a href="#">Vào giỏ hàng chính</a>
  <div> <button style={{marginRight:"10px"}}>Đóng</button>
      <button>Thanh toán</button></div>

  </div>
  
 
</div>

    )
}