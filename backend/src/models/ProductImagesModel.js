const db = require("../config/db");

class ProductImagesModel {
     static async create(data) {
        const sql = `
            INSERT INTO Product_Image (image_product_id,image_url)
            VALUES (?, ?)
        `;

        const values = [
          data.image_product_id,
          data.image_url
        ];

        const [result] = await db.execute(sql, values);
        return result.insertId;
    }


  static deleteByProductId(productId) {
    return db.execute("DELETE FROM Product_Image WHERE image_product_id = ?", [productId]);
  }

  static getByProductId(productId) {
    return db.execute("SELECT * FROM Product_Image WHERE image_product_id = ?", [productId]);
  }
}

module.exports= ProductImagesModel;