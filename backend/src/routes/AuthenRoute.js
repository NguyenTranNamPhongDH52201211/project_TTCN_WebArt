const express = require("express");
const router = express.Router();
const AuthenController = require("../controllers/AuthenController");
const authMiddleware = require("../Middleware/authen");


// Login
router.post("/login", AuthenController.login);

// Lấy thông tin user hiện tại
router.get("/me", authMiddleware, AuthenController.me);

// Logout
router.post("/logout", AuthenController.logout);
router.post("/signup", AuthenController.signup);

module.exports = router;
