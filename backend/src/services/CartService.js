const CartModel = require("../models/CartModel");

class CartService {

    static async getByUserId(user_id) {
        if (!user_id) throw new Error("user_id is required");

        const cart = await CartModel.getByUserId(user_id);

        if (!cart) {
            await CartModel.insert(user_id);
            return await CartModel.getByUserId(user_id);
        }

        return cart;
    }


    // Tạo giỏ hàng mới
    static async create(user_id) {
        if (!user_id) throw new Error("user_id is required");
        return await CartModel.insert(user_id);
    }
}

module.exports = CartService;
