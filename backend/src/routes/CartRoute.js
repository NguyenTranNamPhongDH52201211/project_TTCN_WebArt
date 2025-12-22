// routes/cartRoutes.js
const express = require("express");
const CartController = require("../controllers/CartController");
const authMiddleware = require("../Middleware/authen");
const cartMiddleware = require("../Middleware/cart");

const router = express.Router();

router.get(
  "/",
  authMiddleware,   
  cartMiddleware,   
  CartController.getCart
);

module.exports = router;
