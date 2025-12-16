const express = require("express");
const CartItemController = require("../controllers/CartItemController");
const router = express.Router();

// Lấy tất cả item theo cart_id
router.get("/:cart_id", CartItemController.getItemsByCart);

// Thêm item theo cart_id
router.post("/add", CartItemController.addItem);

// Cập nhật số lượng theo cart_id + product_id
router.put("/update", CartItemController.updateQuantity);

// Xóa item theo cart_item_id
router.delete("/:cart_item_id", CartItemController.deleteItem);

// Xóa toàn bộ giỏ hàng theo cart_id
router.delete("/clear/:cart_id", CartItemController.clearCart);

module.exports = router;
