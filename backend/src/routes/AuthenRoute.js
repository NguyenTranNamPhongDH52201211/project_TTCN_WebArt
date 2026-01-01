const express = require("express");
const router = express.Router();
const AuthenController = require("../controllers/AuthenController");
const authMiddleware = require("../Middleware/authen");

// ===== AUTH =====

// Login
router.post("/login", AuthenController.login);

// Signup
router.post("/signup", AuthenController.signup);

// Lấy thông tin user hiện tại
router.get("/me", authMiddleware, AuthenController.me);

// Logout
router.post("/logout", authMiddleware, AuthenController.logout);

// ===== USER TỰ QUẢN LÝ =====

// Cập nhật profile (name, phone, email)
router.put("/me/profile", authMiddleware, AuthenController.updateProfile);

// Đổi mật khẩu
router.put("/me/password", authMiddleware, AuthenController.updatePassword);

router.post("/forgot-password", AuthenController.sendResetPasswordOTP);
router.post("/reset-password", AuthenController.resetPassword);


module.exports = router;
