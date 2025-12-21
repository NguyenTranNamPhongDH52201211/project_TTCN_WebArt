const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const authMiddleware = require("../Middleware/authen");
const requireAdmin = require("../Middleware/requireAdmin");

/* ===== USER TỰ QUẢN LÝ ===== */

// xem profile chính mình
router.get("/me", authMiddleware, UserController.getById);

// cập nhật thông tin cá nhân
router.put("/me/profile", authMiddleware, UserController.updateProfile);

// đổi mật khẩu
router.put("/me/password", authMiddleware, UserController.changePassword);


/* ===== ADMIN QUẢN LÝ USER ===== */

router.get("/",UserController.getAll);

// admin xem user bất kỳ
router.get("/:id",UserController.getById);

// admin đổi role
router.put("/:id/role",UserController.updateRole);

// admin đổi trạng thái
router.put("/:id/status",UserController.updateStatus);

// admin deactivate
router.delete("/:id/deactivate", UserController.deactivate);

module.exports = router;
