const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");

// Lấy tất cả inventory
router.get("/", InventoryController.getAll);

// Lấy inventory theo product id
router.get("/:id", InventoryController.getById);

// Tạo inventory mới
router.post("/", InventoryController.create);

// Cập nhật inventory theo id
router.put("/:id", InventoryController.update);

// Restock inventory theo id
router.put("/:id/restock", InventoryController.restock);

// Reserve inventory theo id
router.put("/:id/reserve", InventoryController.reserve);

module.exports = router;
