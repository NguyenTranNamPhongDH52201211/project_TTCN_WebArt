const db = require("../config/db");

class ProductImagesModel {
    static async create(data) {
    const [result] = await db.query("INSERT INTO Product_Image SET ?", [data]);
    return result.insertId;
  }

  static deleteByProductId(productId) {
    return db.query("DELETE FROM Product_Image WHERE image_product_id = ?", [productId]);
  }

  static getByProductId(productId) {
    return db.query("SELECT * FROM Product_Image WHERE image_product_id = ?", [productId]);
  }
}

module.exports= ProductImagesModel;