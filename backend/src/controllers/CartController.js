const CartService = require("../services/CartService");

class CartController {

    // Lấy giỏ hàng của user
    static async getCart(req, res) {
        try {
            const user_id = req.params.user_id;
            const cart = await CartService.getByUserId(user_id);
            res.json(cart);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

    // Tạo giỏ hàng mới cho user
    static async createCart(req, res) {
        try {
            const user_id = req.body.user_id;
            const cart = await CartService.create(user_id);
            res.status(201).json(cart);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: err.message });
        }
    }

}

module.exports = CartController;
