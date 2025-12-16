const CartItemService = require("../services/CartItemService");

class CartItemController {

    // Lấy tất cả item theo cart_id
    static async getItemsByCart(req, res) {
        try {
            const cart_id = req.params.cart_id;
            const items = await CartItemService.getItemsByCartId(cart_id);
            res.json(items);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    // Thêm item theo cart_id
    static async addItem(req, res) {
        try {
            const { cart_id, product_id, quantity, price } = req.body;
            const result = await CartItemService.addItem(cart_id, product_id, quantity, price);
            res.status(201).json({ message: "Item added/updated", result });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    // Cập nhật số lượng theo cart_id + product_id
    static async updateQuantity(req, res) {
        try {
            const { cart_id, product_id, quantity } = req.body;
            const result = await CartItemService.updateQuantity(cart_id, product_id, quantity);
            res.json({ message: "Cập nhật số lượng thành công", result });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    // Xóa item theo cart_item_id
    static async deleteItem(req, res) {
        try {
            const cart_item_id = req.params.cart_item_id;
            await CartItemService.deleteItem(cart_item_id);
            res.json({ message: "Item deleted" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    // Xóa toàn bộ giỏ hàng theo cart_id
    static async clearCart(req, res) {
        try {
            const cart_id = req.params.cart_id;
            await CartItemService.clearCart(cart_id);
            res.json({ message: "Cart cleared" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = CartItemController;
