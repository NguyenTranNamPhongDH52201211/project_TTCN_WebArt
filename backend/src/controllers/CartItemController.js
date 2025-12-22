const CartItemService = require("../services/CartItemService");

class CartItemController {

   static async addItem(req, res) {
    try {
      const { product_id, quantity, price } = req.body;
      const cart_id = req.cart.cart_id;

      await CartItemService.addItem(
        cart_id,
        product_id,
        quantity,
        price
      );

      res.status(201).json({ message: "Item added" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // ✏️ Update qty
  static async updateQuantity(req, res) {
    try {
      const { cart_item_id, quantity } = req.body;
      await CartItemService.updateByItemId(cart_item_id, quantity);
      res.json({ message: "Updated" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // ❌ Delete item
  static async deleteItem(req, res) {
    try {
      const { cart_item_id } = req.params;
      await CartItemService.deleteItem(cart_item_id);
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // 🧹 Clear cart
  static async clearCart(req, res) {
    try {
      const cart_id = req.cart.cart_id;
      await CartItemService.clearCart(cart_id);
      res.json({ message: "Cart cleared" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}



module.exports = CartItemController;
