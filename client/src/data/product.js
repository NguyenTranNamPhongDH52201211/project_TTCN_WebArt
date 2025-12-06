// product.js
import axios from "axios";
import { formatProducts } from "./customeProductfield";
export async function getProducts() {
  const res = await axios.get("http://localhost:3000/api/products");
  const rows = res.data;
  return formatProducts(rows); // gọi helper

}
