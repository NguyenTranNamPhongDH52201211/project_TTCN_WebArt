const express = require("express");
const OrderController = require("../controllers/OrderController");
const router = express.Router();


router.get("/history/:user_id", OrderController.getOrderHistory);

// Tạo order
router.post("/", OrderController.createOrder);

// Cập nhật trạng thái order
router.put("/:order_id/status", OrderController.updateStatus);

// Lấy chi tiết order (ĐỂ CUỐI)
router.get("/:order_id", OrderController.getOrderDetail);

module.exports = router;
