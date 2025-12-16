const express = require("express");
const CartController = require("../controllers/CartController");
const router = express.Router();

// Lấy giỏ hàng của user
router.get("/:user_id", CartController.getCart);

// Tạo giỏ hàng mới
router.post("/", CartController.createCart);

module.exports = router;
