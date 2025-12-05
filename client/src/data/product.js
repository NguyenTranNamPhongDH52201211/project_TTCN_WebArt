// product.js
import axios from "axios";

export async function getProducts() {
  const res = await axios.get("http://localhost:3000/api/products");
  const rows = res.data;

  return rows.map((p) => ({
    id: p.product_id, // trùng format tĩnh
    name: p.product_name, // "
    code: p.product_code, // "
    price: p.product_base_price, // "
    brand: p.product_brand, // "
    category: p.category_name, // "
    colors: [], // dữ liệu tĩnh có -> tạo mảng rỗng
    image: "", // dữ liệu tĩnh có -> đặt rỗng
  }));
}
