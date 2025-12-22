const db = require("../config/db");

class InventoryModel {

  
    static async getAll() {
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

    // LẤY TỒN KHO THEO PRODUCT ID
    static async getById(productId) {
        const [rows] = await db.execute(
            "SELECT * FROM Inventory WHERE invent_product_id = ?",
            [productId]
        );
        return rows[0] || null;
    }

    // TẠO RECORD TỒN KHO KHI TẠO SẢN PHẨM

    static async create(data) {
        const sql = `
            INSERT INTO Inventory
            (invent_product_id, invent_quantity_available, invent_quantity_reserved, invent_reorder_level)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            data.invent_product_id,
            parseInt(data.invent_quantity_available) || 0,
            parseInt(data.invent_quantity_reserved) || 0,
            parseInt(data.invent_reorder_level) || 10
        ];

        const [result] = await db.execute(sql, values);
        return result;
    }

  
    // UPDATE TỒN KHO
    static async update(productId, data) {
        const updateData = {
            invent_quantity_available: parseInt(data.invent_quantity_available),
            invent_quantity_reserved: parseInt(data.invent_quantity_reserved),
            invent_reorder_level: parseInt(data.invent_reorder_level)
        };

        const [result] = await db.execute(
            "UPDATE Inventory SET invent_quantity_available = ?, invent_quantity_reserved = ?, invent_reorder_level = ? WHERE invent_product_id = ?",
            [
                updateData.invent_quantity_available,
                updateData.invent_quantity_reserved,
                updateData.invent_reorder_level,
                productId
            ]
        );

        return result;
    }


    // NHẬP THÊM HÀNG
    static async restock(productId, quantity) {
        const [result] = await db.execute(
            `UPDATE Inventory 
            SET invent_quantity_available = invent_quantity_available + ?, 
                invent_last_restocked = NOW()
            WHERE invent_product_id = ?`,
            [quantity, productId]
        );
        return result.affectedRows;
    }


    // RESERVE (GIỮ HÀNG TRONG GIỎ)
    static async reserve(productId, amount) {
        const [result] = await db.execute(
            `UPDATE Inventory
             SET invent_quantity_available = invent_quantity_available - ?, 
                 invent_quantity_reserved = invent_quantity_reserved + ?
             WHERE invent_product_id = ?`,
            [amount, amount, productId]
        );
        return result.affectedRows;
    }


    // UNRESERVE (XÓA SẢN PHẨM KHỎI GIỎ)

    static async unreserve(productId, amount) {
        const [result] = await db.execute(
            `UPDATE Inventory
             SET invent_quantity_available = invent_quantity_available + ?, 
                 invent_quantity_reserved = invent_quantity_reserved - ?
             WHERE invent_product_id = ?`,
            [amount, amount, productId]
        );
        return result.affectedRows;
    }


    // CHECK STOCK (DÙNG CHO ORDER)
    static async getAvailableStock(productId) {
        const [rows] = await db.execute(
            `SELECT invent_quantity_available 
             FROM Inventory 
             WHERE invent_product_id = ?`,
            [productId]
        );

        return rows[0]?.invent_quantity_available ?? 0;
    }


    // GIẢM STOCK KHI TẠO ĐƠN HÀNG (DEDUCT)
    static async deduct(productId, quantity) {
        const [result] = await db.execute(
            `UPDATE Inventory
             SET invent_quantity_available = invent_quantity_available - ?
             WHERE invent_product_id = ?`,
            [quantity, productId]
        );

        return result.affectedRows;
    }

 
    // TĂNG STOCK KHI HỦY ĐƠN / REFUND
    static async returnStock(productId, quantity) {
        const [result] = await db.execute(
            `UPDATE Inventory
             SET invent_quantity_available = invent_quantity_available + ?
             WHERE invent_product_id = ?`,
            [quantity, productId]
        );

        return result.affectedRows;
    }
}

module.exports = InventoryModel;
