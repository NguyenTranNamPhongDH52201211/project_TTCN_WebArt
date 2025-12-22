// routes/cartItemRoutes.js
const express = require("express");
const CartItemController = require("../controllers/CartItemController");
const authMiddleware = require("../Middleware/authen");
const cartMiddleware = require("../Middleware/cart");

const router = express.Router();

router.use(authMiddleware, cartMiddleware);

router.post("/", CartItemController.addItem);
router.put("/", CartItemController.updateQuantity);
router.delete("/clear/all", CartItemController.clearCart);
router.delete("/:cart_item_id", CartItemController.deleteItem);


module.exports = router;
 