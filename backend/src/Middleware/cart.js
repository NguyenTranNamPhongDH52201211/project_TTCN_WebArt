const CartService = require("../services/CartService");
 async function cartMiddleware(req, res, next) {
  try {
    const cart = await CartService.getOrCreateCart({
      user_id: req.userId || null,
      cart_id: req.cookies.cart_id || null,
    });

    // ⭐ set cookie cho guest (1 nơi DUY NHẤT)
    if (!req.userId && !req.cookies.cart_id) {
      res.cookie("cart_id", cart.cart_id, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });
    }

    req.cart = cart;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports =cartMiddleware;