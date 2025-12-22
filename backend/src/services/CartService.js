const CartModel = require("../models/CartModel");
const CartItemService = require("./CartItemService");
const { v4: uuidv4 } = require("uuid");

class CartService {
  static async getByUserId({ user_id }) {
    if (!user_id) throw new Error("user_id is required");

    const cart = await CartModel.getByUserId(user_id);

    if (!cart) {
      await CartModel.insert(user_id);
      return await CartModel.getByUserId(user_id);
    }

    return cart;
  }
  static async getOrCreateCart({ user_id, cart_id }) {
    // 🟢 USER
    if (user_id) {
      let cart = await CartModel.getByUserId(user_id);
      if (!cart) {
        await CartModel.insert(user_id);
        cart = await CartModel.getByUserId(user_id);
      }
      return cart;
    }

    // 🟡 GUEST
    if (!cart_id) {
      cart_id = uuidv4();
      await CartModel.insertGuest(cart_id);
    }

    let cart = await CartModel.getById(cart_id);
    if (!cart) {
      await CartModel.insertGuest(cart_id);
      cart = await CartModel.getById(cart_id);
    }
    return cart;
  }
  static async getCartWithItems({ user_id, cart_id }) {
    const cart = await this.getOrCreateCart({ user_id, cart_id });
    const items = await CartItemService.getItemsByCartId(cart.cart_id);

    return {
      ...cart,
      items,
    };
  }
}

module.exports = CartService;
