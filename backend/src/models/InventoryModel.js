const db = require("../config/db");


class InventoryModel {

    static async getAll() {
        // Lấy danh sách tồn kho kèm tên sản phẩm
        const [rows] = await db.execute(`
      SELECT 
        i.invent_product_id,
        p.product_name,
        p.product_code,
        i.invent_quantity_available,
        i.invent_quantity_reserved,
        i.invent_reorder_level,
        i.invent_last_restocked,
        i.invent_updated_at
      FROM Inventory i
      LEFT JOIN Product p ON i.invent_product_id = p.product_id
    `);
        return rows;
    }

    static async getById(productId) {
        const [rows] = await db.execute(
            "SELECT * FROM Inventory WHERE invent_product_id = ?",
            [productId]
        );
        return rows[0]; // trả về 1 record
    }


   static async create(data) {
    const sql = `
        INSERT INTO Inventory
        (invent_product_id, invent_quantity_available, invent_quantity_reserved, invent_reorder_level)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        data.invent_product_id,
        parseInt(data.invent_quantity_available, 10) || 0,
        parseInt(data.invent_quantity_reserved, 10) || 0,
        parseInt(data.invent_reorder_level, 10) || 10
    ];

    const [result] = await db.execute(sql, values);
    return result;
}
    static async update(productId, data) {
        const updateData = {
        invent_quantity_available: parseInt(data.invent_quantity_available),
        invent_quantity_reserved: parseInt(data.invent_quantity_reserved),
        invent_reorder_level: parseInt(data.invent_reorder_level)
    };
        // Cập nhật tồn kho
        const [result] = await db.execute(
            "UPDATE Inventory SET ? WHERE invent_product_id = ?",
            [upda, productId]
        );
    }

    static async restock(productId, quantity) {
        // Nhập thêm hàng
        const [result] = await db.execute(
            `UPDATE Inventory 
       SET invent_quantity_available = ?, 
           invent_last_restocked = NOW()
       WHERE invent_product_id = ?`,
            [quantity, productId]
        );
        return result.affectedRows;
    }

    static async reserve(productId, amount) {
        // Giảm tồn kho, tăng reserved (add to cart)
        const [result] = await db.execute(
            `UPDATE Inventory
       SET invent_quantity_available = invent_quantity_available - ?, 
           invent_quantity_reserved = invent_quantity_reserved + ?
       WHERE invent_product_id = ?`,
            [amount, amount, productId]
        );
        return result.affectedRows;
    }

    static async unreserve(productId, amount) {
        // Hủy đặt (remove from cart)
        const [result] = await db.execute(
            `UPDATE Inventory
       SET invent_quantity_available = invent_quantity_available + ?, 
           invent_quantity_reserved = invent_quantity_reserved - ?
       WHERE invent_product_id = ?`,
            [amount, amount, productId]
        );
        return result.affectedRows;
    }
}

module.exports = InventoryModel;
