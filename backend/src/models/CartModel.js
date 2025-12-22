const db = require("../config/db");

class CartModel {
  // Lấy giỏ hàng mới nhất của user
  static async getByUserId(user_id) {
    const [rows] = await db.execute(
      `SELECT * FROM Cart 
             WHERE cart_user_id = ? 
             ORDER BY cart_created_at DESC 
             LIMIT 1`,
      [user_id]
    );
    return rows.length ? rows[0] : null;
  }

  // Thêm giỏ hàng mới cho user
  static async insert(user_id) {
    const [result] = await db.execute(
      "INSERT INTO Cart (cart_user_id) VALUES (?)",
      [user_id]
    );
    return result;
  }
  static async getById(cart_id) {
    const [rows] = await db.execute("SELECT * FROM Cart WHERE cart_id = ?", [
      cart_id,
    ]);
    return rows[0] || null;
  }
  static async insertGuest(cart_id) {
    await db.execute(
      "INSERT INTO Cart (cart_id, cart_user_id) VALUES (?, NULL)",
      [cart_id]
    );
  }
}

module.exports = CartModel;
