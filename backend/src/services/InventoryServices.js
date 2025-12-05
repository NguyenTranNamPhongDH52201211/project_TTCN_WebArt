const InventoryModel = require('../models/InventoryModel');

class InventoryService {

    static async getAllInventory() {
        return await InventoryModel.getAll();
    }

    static async getInventoryByProductId(productId) {
        const inventory = await InventoryModel.getById(productId);
        if (!inventory) throw new Error("Inventory record not found");
        return inventory;
    }

    static async createInventory(productId) {
        return await InventoryModel.create(productId);
    }

    static async updateInventory(productId, data) {
        const updated = await InventoryModel.update(productId, data);
        if (!updated) throw new Error("Inventory record not found");
        return updated;
    }


    static async restock(productId, quantity) {
        const updated = await InventoryModel.restock(productId, quantity);
        if (!updated) throw new Error("Inventory record not found");
        return updated;
    }

    static async reserve(productId, amount) {
        const updated = await InventoryModel.reserve(productId, amount);
        if (!updated) throw new Error("Inventory record not found");
        return updated;
    }

    static async unreserve(productId, amount) {
        const updated = await InventoryModel.unreserve(productId, amount);
        if (!updated) throw new Error("Inventory record not found");
        return updated;
    }
}

module.exports = InventoryService;
