const db = require("../config/db"); // hoặc require nếu dùng CommonJS

class ProductModel {
  static async getAll() {
    // Lấy tất cả sản phẩm
    const [rows] = await db.execute(`SELECT 
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
      const [images] = await db.execute(
        "SELECT image_url FROM Product_Image WHERE image_product_id = ?",
        [product.product_id]
      );
      product.images = images.map((img) => img.image_url); // gán mảng ảnh vào mỗi sản phẩm
      // ✅ THÊM: lấy ảnh cho từng sản phẩm
      for (const product of rows) {
        const [images] = await db.execute(
          "SELECT image_url FROM Product_Image WHERE image_product_id = ?",
          [product.product_id]
        );
        product.images = images.map((img) => img.image_url); // gán mảng ảnh vào mỗi sản phẩm
      }

      return rows;
    }
  }

  static async filterByParentOfChild(childCateId) {
    const [childRow] = await db.execute(
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

    const [rows] = await db.execute(
      `SELECT p.*, i.invent_quantity_available AS product_stock
     FROM Product p
     LEFT JOIN Inventory i ON i.invent_product_id = p.product_id
     WHERE ${likeConditions}`,
      params
    );

    // Lấy ảnh
    for (const product of rows) {
      const [images] = await db.execute(
        "SELECT image_url FROM Product_Image WHERE image_product_id = ?",
        [product.product_id]
      );
      product.images = images.map((img) => img.image_url);
    }

    return rows;
  }

  static async getByCode(code) {
    const [rows] = await db.execute(
      "SELECT COUNT(*) AS total FROM product WHERE product_code = ?",
      [code]
    );
    return rows[0].total; // trả về số lượng trùng
  }

  static async getById(id) {
    // Lấy sản phẩm theo id
    const rows = await db.execute(
      "SELECT * FROM product WHERE product_id = ?",
      [id]
    );

    return rows;
  }

  static async create(data) {
    try {
      const productId = data.product_id;
      const sql = `
      INSERT INTO product 
      (product_id, product_name, product_category_id, product_brand, product_code, product_base_price, product_description) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

      const values = [
        productId,
        data.product_name,
        data.product_category_id,
        data.product_brand,
        data.product_code,
        data.product_base_price,
        data.product_description,
      ];

      await db.execute(sql, values);
      return productId;
    } catch (error) {
      console.error("Model Error:", error);
      throw error;
    }
  }

  static async delete(id) {
    // Xóa sản phẩm
    const [result] = await db.execute(
      "DELETE FROM product WHERE product_id = ?",
      [id]
    );
    return result.affectedRows > 0; // trả về số row bị xóa
  }

  static async update(id, data) {
    // Cập nhật sản phẩm
    const sql = `
    UPDATE product SET
      product_name = ?,
      product_category_id = ?,
      product_brand = ?,
      product_code = ?,
      product_base_price = ?,
      product_description = ?
    WHERE product_id = ?
  `;

    const values = [
      data.product_name,
      data.product_category_id,
      data.product_brand,
      data.product_code,
      data.product_base_price,
      data.product_description,
      id,
    ];

    return db.execute(sql, values); // số row bị cập nhật
  }
  // ProductModel.js
  static async getDetailWithImages(id) {
    const [[product]] = await db.execute(
      `SELECT 
      p.product_id,
      p.product_name,
      p.product_base_price,
      p.product_code,
      p.product_brand,
      p.product_description,
      c.cate_name AS category_name
     FROM Product p
     LEFT JOIN Category c 
       ON p.product_category_id = c.cate_id
     WHERE p.product_id = ?`,
      [id]
    );

    if (!product) return null;

    const [images] = await db.execute(
      "SELECT image_url FROM Product_Image WHERE image_product_id = ?",
      [id]
    );

    product.image = images.map((img) => img.image_url); 

    return product;
  }
}

module.exports = ProductModel;
