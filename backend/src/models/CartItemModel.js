const db = require("../config/db");

class CartItemModel {

    // Lấy tất cả item trong giỏ hàng
    static async getByCartId(cart_id) {
        const [rows] = await db.execute(
            "SELECT * FROM Cart_Item WHERE cart_id = ?",
            [cart_id]
        );
        return rows;
    }

    // Lấy một item theo cart_id và product_id
    static async getItem(cart_id, product_id) {
        const [rows] = await db.execute(
            "SELECT * FROM Cart_Item WHERE cart_id = ? AND cart_product_id = ?",
            [cart_id, product_id]
        );
        return rows.length ? rows[0] : null;
    }

    // Thêm item mới
    static async insert(cart_id, product_id, quantity, price) {
        const [result] = await db.execute(
            "INSERT INTO Cart_Item (cart_id, cart_product_id, cart_quantity, cart_price_at_add) VALUES (?, ?, ?, ?)",
            [cart_id, product_id, quantity, price]
        );
        return result;
    }

    // Cập nhật item
    static async update(cart_item_id, quantity) {
        const [result] = await db.execute(
            "UPDATE Cart_Item SET cart_quantity = ?, cart_added_at = CURRENT_TIMESTAMP WHERE cart_item_id = ?",
            [quantity, cart_item_id]
        );
        return result;
    }

    // Xóa item
    static async delete(cart_item_id) {
        const [result] = await db.execute(
            "DELETE FROM Cart_Item WHERE cart_item_id = ?",
            [cart_item_id]
        );
        return result;
    }

    // Xóa tất cả item theo cart_id
    static async deleteByCartId(cart_id) {
        const [result] = await db.execute(
            "DELETE FROM Cart_Item WHERE cart_id = ?",
            [cart_id]
        );
        return result;
    }

  

    
}

module.exports = CartItemModel;
