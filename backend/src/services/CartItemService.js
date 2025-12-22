const CartItemModel = require("../models/CartItemModel");

class CartItemService {
  // Lấy tất cả item của cart
  static async getItemsByCartId(cart_id) {
    return await CartItemModel.getByCartId(cart_id);
  }

  // Thêm item theo cart_id + product_id
  static async addItem(cart_id, product_id, quantity, price) {
    if (!quantity || quantity <= 0) throw new Error("quantity phải > 0");

    const existingItem = await CartItemModel.getItem(cart_id, product_id);

    if (existingItem) {
      const newQuantity = existingItem.cart_quantity + quantity;
      return await CartItemModel.update(existingItem.cart_item_id, newQuantity);
    }

    return await CartItemModel.insert(cart_id, product_id, quantity, price);
  }

  // Cập nhật số lượng theo cart_id + product_id
  static async updateQuantity(cart_id, product_id, quantity) {
    if (!quantity || quantity <= 0) throw new Error("quantity phải > 0");

    const item = await CartItemModel.getItem(cart_id, product_id);
    if (!item) throw new Error("Item không tồn tại trong giỏ hàng");

    return await CartItemModel.update(item.cart_item_id, quantity);
  }

  // Xóa item theo cart_item_id
  static async deleteItem(cart_item_id) {
    return await CartItemModel.delete(cart_item_id);
  }

  // Xóa toàn bộ item theo cart_id
  static async clearCart(cart_id) {
    return await CartItemModel.deleteByCartId(cart_id);
  }
  static async updateByItemId(cart_item_id, quantity) {
    if (quantity <= 0) throw new Error("quantity phải > 0");
    return await CartItemModel.update(cart_item_id, quantity);
  }
}

module.exports = CartItemService;
