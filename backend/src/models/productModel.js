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
      c.cate_name AS category_name
    FROM Product p
    LEFT JOIN Category c ON p.product_category_id = c.cate_id`);
    return rows;
  }

  static async getById(id) {
    // Lấy sản phẩm theo id
    const rows = await db.query("SELECT * FROM product WHERE product_id = ?", [id]);

    return rows;
  }


  static async create(data) {
    try {
      // MySQL có thể không chấp nhận insertId với UUID
      const [result] = await db.query("INSERT INTO product SET ?", [data]);

      // Trả về product_id từ data (vì UUID được tạo từ frontend)
      return data.product_id || result.insertId;
    } catch (error) {
      console.error("Model Error:", error);
      throw error;
    }
  }

  static async delete(id) {
    // Xóa sản phẩm
    const [result] = await db.query("DELETE FROM product WHERE product_id = ?", [id]);
    return result.affectedRows > 0; // trả về số row bị xóa
  }

  static async update(id, data) {
    // Cập nhật sản phẩm
    const [result] = await db.query("UPDATE product SET ? WHERE product_id = ?", [data, id]);
    return result.affectedRows; // số row bị cập nhật
  }
}

module.exports = ProductModel;
