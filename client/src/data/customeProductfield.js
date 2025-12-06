// customData.js
export function formatProducts(rows) {
  return rows.map((p) => ({
    id: p.product_id,       // trùng format tĩnh
    name: p.product_name,   // "
    code: p.product_code,   // "
    price: p.product_base_price, // "
    brand: p.product_brand, // "
    category: p.category_name, // "
    colors: [],             // dữ liệu tĩnh -> mảng rỗng
    image: p.images,        // giữ nguyên
  }));
}
