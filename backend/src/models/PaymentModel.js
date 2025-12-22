const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class PaymentModel {
  static async create({ orderId, method, amount }) {
    const paymentId = uuidv4();

    await db.query(
      `INSERT INTO Payment
      (payment_id, payment_order_id, payment_method, payment_amount)
      VALUES (?, ?, ?, ?)`,
      [paymentId, orderId, method, amount]
    );

    return paymentId;
  }

  static async complete({ orderId, transactionId, details }) {
    await db.query(
      `UPDATE Payment
       SET payment_status='completed',
           payment_transaction_id=?,
           payment_date=NOW(),
           payment_details=?
       WHERE payment_order_id=?`,
      [transactionId, JSON.stringify(details), orderId]
    );
  }

  static async fail(orderId, details) {
    await db.query(
      `UPDATE Payment
       SET payment_status='failed',
           payment_details=?
       WHERE payment_order_id=?`,
      [JSON.stringify(details), orderId]
    );
  }
}

module.exports = PaymentModel;
