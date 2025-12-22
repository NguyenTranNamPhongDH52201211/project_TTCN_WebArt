const express = require("express");
const AddressController = require("../controllers/AddressController");
const router = express.Router();

// Lấy danh sách địa chỉ của user
router.get("/:user_id", AddressController.getByUser);

// Lấy địa chỉ mặc định
router.get("/:user_id/default", AddressController.getDefault);

// Tạo địa chỉ mới
router.post("/", AddressController.create);

// Set địa chỉ mặc định
router.put("/:address_id/default", AddressController.setDefault);

// Xoá địa chỉ
router.delete("/:address_id", AddressController.delete);

module.exports = router;
