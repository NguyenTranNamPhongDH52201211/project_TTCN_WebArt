const db = require("../config/db");
const { v4: uuidv4 } = require("uuid"); // npm install uuid

class OrderModel {
  // Lấy order theo order_id
  static async getById(order_id) {
    const [rows] = await db.execute("SELECT * FROM Orders WHERE order_id = ?", [
      order_id,
    ]);
    return rows.length ? rows[0] : null;
  }

  // Tạo order mới
  static async insert(data) {
    const {
      order_number,
      order_user_id,
      order_address_id,
      order_subtotal,
      order_shipping_fee,
      order_tax_amount,
      order_discount_amount,
      order_total_amount,
      guest_email,
      order_notes,
    } = data;

    // 🔹 Tạo UUID tại đây
    const order_id = uuidv4();

    await db.execute(
      `INSERT INTO Orders (
            order_id,
            order_number,
            order_user_id,
            order_address_id,
            order_subtotal,
            order_shipping_fee,
            order_tax_amount,
            order_discount_amount,
            order_total_amount,
            guest_email,
            order_notes
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        order_id,
        order_number,
        order_user_id,
        order_address_id,
        order_subtotal,
        order_shipping_fee || 0,
        order_tax_amount || 0,
        order_discount_amount || 0,
        order_total_amount,
        guest_email || null,
        order_notes || null,
      ]
    );

    // 🔹 Trả về luôn order_id
    return { order_id };
  }

  // Cập nhật trạng thái order
  static async updateStatus(order_id, order_status, payment_status) {
    const [result] = await db.execute(
      `UPDATE Orders
       SET order_status = ?, order_payment_status = ?
       WHERE order_id = ?`,
      [order_status, payment_status, order_id]
    );
    return result;
  }

  // Lấy lịch sử order của user
  static async getHistoryByUserId(user_id) {
    const [rows] = await db.execute(
      `SELECT 
          order_id,
          order_number,
          order_total_amount,
          order_status,
          order_payment_status,
          order_created_at
       FROM Orders
       WHERE order_user_id = ?
       ORDER BY order_created_at DESC`,
      [user_id]
    );
    return rows;
  }
  static async mergeGuestOrders(userId, email) {
    await db.execute(
      `
    UPDATE Orders
    SET 
      order_user_id = ?,
      guest_email = NULL
    WHERE 
      guest_email = ?
      AND order_user_id IS NULL
    `,
      [userId, email]
    );
  }
}

module.exports = OrderModel;
