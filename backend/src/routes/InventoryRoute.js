const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");


router.get("/", InventoryController.getAll);
router.get("/:id", InventoryController.getById);
router.post("/", InventoryController.create);
router.put("/:id", InventoryController.update);
router.put("/:id/restock", InventoryController.restock);
router.put("/:id/reserve", InventoryController.reserve);

module.exports = router;
