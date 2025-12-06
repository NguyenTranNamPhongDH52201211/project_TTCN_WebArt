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

    // ✅ THÊM: lấy ảnh cho từng sản phẩm
    for (const product of rows) {
      const [images] = await db.query(
        "SELECT image_url FROM Product_Image WHERE image_product_id = ?",
        [product.product_id]
      );
      product.images = images.map((img) => img.image_url); // gán mảng ảnh vào mỗi sản phẩm
    }

    return rows;
  }
  static async filterByParentOfChild(childCateId) {
    const [childRow] = await db.query(
      "SELECT cate_name FROM Category WHERE cate_id = ?",
      [childCateId]
    );
    if (!childRow.length) return [];
    const childName = childRow[0].cate_name;

    // tách các từ trong cate_name
    const words = childName.split(/\s+/).filter(Boolean);

    // build query dynamically
    const likeConditions = words
      .map((_) => "p.product_name LIKE ?")
      .join(" OR ");
    const params = words.map((w) => `%${w}%`);

    const [rows] = await db.query(
      `SELECT p.*, i.invent_quantity_available AS product_stock
     FROM Product p
     LEFT JOIN Inventory i ON i.invent_product_id = p.product_id
     WHERE ${likeConditions}`,
      params
    );

    // Lấy ảnh
    for (const product of rows) {
      const [images] = await db.query(
        "SELECT image_url FROM Product_Image WHERE image_product_id = ?",
        [product.product_id]
      );
      product.images = images.map((img) => img.image_url);
    }

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
    const [result] = await db.query(
      "DELETE FROM product WHERE product_id = ?",
      [id]
    );
    return result.affectedRows > 0; // trả về số row bị xóa
  }

  static async update(id, data) {
    // Cập nhật sản phẩm
    const [result] = await db.query(
      "UPDATE product SET ? WHERE product_id = ?",
      [data, id]
    );
    return result.affectedRows; // số row bị cập nhật
  }
}

module.exports = ProductModel;
