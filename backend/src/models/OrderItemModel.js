const db = require("../config/db");

class OrderItemModel {

    // Lấy danh sách item theo order_id
    static async getByOrderId(order_id) {
        const [rows] = await db.execute(
            "SELECT * FROM Order_Item WHERE order_id = ?",
            [order_id]
        );
        return rows;
    }

    // Thêm item vào order
    static async insert(data) {
        const {
            order_id,
            product_id,
            product_name,
            quantity,
            unit_price,
            discount_amount,
            subtotal
        } = data;

        const [result] = await db.execute(
            `INSERT INTO Order_Item (
                order_id,
                product_id,
                product_name,
                quantity,
                unit_price,
                discount_amount,
                subtotal
            ) VALUES (?,?,?,?,?,?,?)`,
            [
                order_id,
                product_id,
                product_name,
                quantity,
                unit_price,
                discount_amount || 0,
                subtotal
            ]
        );

        return result;
    }
}

module.exports = OrderItemModel;
