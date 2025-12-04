const InventoryService = require('../services/InventoryServices');

class InventoryController {

    static async getAll(req, res) {
        try {
            const inventoryList = await InventoryService.getAllInventory();
            res.json(inventoryList);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async getById(req, res) {
        try {
            const inventory = await InventoryService.getInventoryByProductId(req.params.id);
            res.json(inventory);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async create(req, res) {
        try {
            console.log("=== RAW REQ BODY ===", req.body);
            console.log("=== BODY TYPE ===", typeof req.body);
            console.log("=== KEYS ===", Object.keys(req.body || {}));

            // ✅ Check req.body tồn tại
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    message: "Request body is empty or invalid"
                });
            }

            // ✅ Check field bắt buộc
            if (!req.body.invent_product_id) {
                return res.status(400).json({
                    message: "Missing invent_product_id in request body",
                    received: req.body
                });
            }

            const result = await InventoryService.createInventory(req.body);

            res.status(201).json({
                success: true,
                message: "Inventory created successfully"
            });

        } catch (err) {
            console.error("=== CONTROLLER ERROR ===", err);
            res.status(400).json({
                message: err.message,
                stack: err.stack  // Debug
            });
        }
    }

    static async update(req, res) {
        try {
            const inventory = await InventoryService.updateInventory(req.params.id, req.body);
            res.json(inventory);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }


    static async restock(req, res) {
        try {
            const updated = await InventoryService.restock(req.params.id, req.body.amount);
            res.json({ message: "Restocked", updated });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    static async reserve(req, res) {
        try {
            const updated = await InventoryService.reserve(req.params.id, req.body.amount);
            res.json({ message: "Reserved", updated });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }


}

module.exports = InventoryController;
