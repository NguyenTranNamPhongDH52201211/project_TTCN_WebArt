// customData.js
export function formatProducts(rows) {
  if(Array.isArray(rows))
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
  else{
    return {
       id: rows.product_id,       // trùng format tĩnh
    name: rows.product_name,   // "
    code: rows.product_code,   // "
    price: rows.product_base_price, // "
    brand: rows.product_brand, // "
    category: rows.category_name, // "
    colors: [],             // dữ liệu tĩnh -> mảng rỗng
    image: rows.images,     
    }
  }

}
// helpers/formatProductDetail.js
export function formatProductDetail(p) {
  return {
    id: p.product_id,
    name: p.product_name,
    code: p.product_code,
    price: p.product_base_price,
    brand: p.product_brand,
    category: p.category_name,
    colors: [],
    image: Array.isArray(p.image)
      ? p.image
      : typeof p.image === "string"
      ? p.image.split(",")
      : [],
  };
}

