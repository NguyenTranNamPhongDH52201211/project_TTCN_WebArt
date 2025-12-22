const db = require("../config/db");

class ShippingModel {

    static async createShipping(shipping_id, order_id) {
        const [result] = await db.execute(
            `INSERT INTO Shipping (
                shipping_id,
                shipping_order_id,
                shipping_status
            ) VALUES (?, ?, 'preparing')`,
            [shipping_id, order_id]
        );

        return result;
    }

    static async updateStatus(order_id, status) {
        const [result] = await db.execute(
            "UPDATE Shipping SET shipping_status = ? WHERE shipping_order_id = ?",
            [status, order_id]
        );
        return result;
    }
}

module.exports = ShippingModel;
