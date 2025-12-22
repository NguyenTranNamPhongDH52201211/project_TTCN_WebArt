const CartService = require("../services/CartService");

class CartController {
  // Lấy giỏ hàng của user
  static async getCart(req, res) {
    try {
      const cart = await CartService.getCartWithItems({
        user_id: req.userId || null,
        cart_id: req.cookies.cart_id || null,
      });

      res.json(cart);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = CartController;
