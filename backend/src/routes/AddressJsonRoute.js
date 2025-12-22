const express = require("express");
const router = express.Router();
const addressController = require("../controllers/AddressJsonController");

// Lấy tất cả tỉnh
router.get("/provinces", addressController.getProvinces);

// Lấy quận theo tỉnh
router.get("/districts/:provinceCode", addressController.getDistricts);

// Lấy phường theo quận
router.get("/wards/:districtCode", addressController.getWards);

module.exports = router;
