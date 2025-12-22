const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");
const authMiddleware = require("../Middleware/authen");


// ===== MOMO =====
router.post("/momo/create", authMiddleware, PaymentController.createMomo);
router.post("/momo/callback", PaymentController.momoCallback);

// ===== VNPAY =====
router.post("/vnpay/create", authMiddleware, PaymentController.createVnpay);
router.get("/vnpay/callback", PaymentController.vnpayCallback);

module.exports = router;
