const db = require("../config/db"); // hoặc require nếu dùng CommonJS

class ProductModel {
  static async getAll() {
  // Lấy tất cả sản phẩm
  const [rows] = await db.query(`SELECT 
    p.product_id,
    p.product_name,
    p.product_base_price,
    p.product_code,
    p.product_brand,
    i.invent_quantity_available AS product_stock,
    c.cate_name AS category_name
  FROM Product p
  LEFT JOIN Category c ON p.product_category_id = c.cate_id
  LEFT JOIN Inventory i ON i.invent_product_id = p.product_id`);

  for (const product of rows) {
    const [images] = await db.query(
      "SELECT image_url FROM Product_Image WHERE image_product_id = ?",
      [product.product_id]
    );
    product.images = images.map(img => img.image_url); // gán mảng ảnh vào mỗi sản phẩm
  }

  return rows;
}

  static async getById(id) {
    
    const rows = await db.query("SELECT * FROM product WHERE product_id = ?", [id]);

    return rows;
  }


  static async create(data) {
    try {
     
      const [result] = await db.query("INSERT INTO product SET ?", [data]);

      return data.product_id || result.insertId;
    } catch (error) {
      console.error("Model Error:", error);
      throw error;
    }
  }

  static async delete(id) {
    
    const [result] = await db.query("DELETE FROM product WHERE product_id = ?", [id]);
    return result.affectedRows > 0; 
  }

  static async update(id, data) {
   
    const [result] = await db.query("UPDATE product SET ? WHERE product_id = ?", [data, id]);
    return result.affectedRows; 
  }
}

module.exports = ProductModel;
