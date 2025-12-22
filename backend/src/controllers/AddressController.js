const AddressService = require("../services/AddressService");

class AddressController {

    // GET /api/addresses/:user_id
    static async getByUser(req, res) {
        try {
            const { user_id } = req.params;
            const data = await AddressService.getUserAddresses(user_id);
            res.json(data);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // GET /api/addresses/:user_id/default
    static async getDefault(req, res) {
        try {
            const { user_id } = req.params;
            const data = await AddressService.getDefaultAddress(user_id);
            res.json(data);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // POST /api/addresses
    static async create(req, res) {
        try {
            const result = await AddressService.createAddress(req.body);
            res.status(201).json({ success: true, result });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // PUT /api/addresses/:address_id/default
    static async setDefault(req, res) {
        try {
            const { address_id } = req.params;
            const { user_id } = req.body;
            const result = await AddressService.setDefaultAddress(
                address_id,
                user_id
            );
            res.json({ success: true, result });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // DELETE /api/addresses/:address_id
    static async delete(req, res) {
        try {
            const { address_id } = req.params;
            const result = await AddressService.deleteAddress(address_id);
            res.json({ success: true, result });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = AddressController;
