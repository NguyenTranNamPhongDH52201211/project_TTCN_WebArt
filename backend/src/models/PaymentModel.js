const db = require("../config/db");

class PaymentModel {

    static async createPayment(payment) {
        const {
            payment_id,
            order_id,
            amount,
            method
        } = payment;

        const [result] = await db.execute(
            `INSERT INTO Payment (
                payment_id,
                payment_order_id,
                payment_method,
                payment_amount,
                payment_status
            ) VALUES (?, ?, ?, ?, 'pending')`,
            [payment_id, order_id, method, amount]
        );

        return result;
    }

    static async updateStatus(order_id, status) {
        const [result] = await db.execute(
            "UPDATE Payment SET payment_status = ? WHERE payment_order_id = ?",
            [status, order_id]
        );
        return result;
    }
}

module.exports = PaymentModel;
