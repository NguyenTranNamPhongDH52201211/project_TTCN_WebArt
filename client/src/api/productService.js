// product.js
import axios from "axios";
import { formatProductDetail, formatProducts } from "../helpers/formatProduct";
export async function getProducts() {
  try {
    const res = await axios.get("http://localhost:3000/api/products");
    const rows = res.data;
    return formatProducts(rows); // gọi helper
  } catch (error) {
    console.error("Lỗi khi load sản phẩm:", error);
    return []; // trả về mảng rỗng thay vì undefined
  }
}

export async function filterProducts(id) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/products/filter/${id}`
    );
    return formatProducts(res.data);
  } catch (error) {
    console.error("Lỗi khi load sản phẩm:", error);
    return []; // trả về mảng rỗng thay vì undefined
  }
}

// productService.js
export async function getDetail(id) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/products/detail/${id}`
    );
    return formatProductDetail(res.data);
  } catch (error) {
    console.error("Lỗi khi load chi tiết sản phẩm:", error);
    return {};
  }
}
