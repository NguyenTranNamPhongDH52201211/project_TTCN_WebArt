const AddressModel = require("../models/AddressModel");

class AddressService {

    // ==========================
    // USER: LẤY DANH SÁCH ADDRESS
    // ==========================   
    static async getUserAddresses(user_id) {
        if (!user_id) throw new Error("user_id is required");
        return await AddressModel.getByUserId(user_id);
    }

    // ==========================
    // USER: LẤY ADDRESS DEFAULT
    // ==========================
    static async getDefaultAddress(user_id) {
        if (!user_id) throw new Error("user_id is required");

        const address = await AddressModel.getDefaultByUserId(user_id);
        if (!address) throw new Error("User chưa có địa chỉ");

        return address;
    }

    // ==========================
    // USER + GUEST: CREATE ADDRESS
    // ==========================
    static async createAddress(data) {
        const requiredFields = [
            "address_recipient_name",
            "address_phone",
            "address_line",
            "address_city"
        ];

        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // Guest → user_id = null
        const addressData = {
            address_user_id: data.address_user_id || null,
            address_recipient_name: data.address_recipient_name,
            address_phone: data.address_phone,
            address_line: data.address_line,
            address_city: data.address_city,
            address_district: data.address_district || null,
            address_ward: data.address_ward || null,
            address_is_default: data.address_user_id ? !!data.address_is_default : false
        };

        return await AddressModel.create(addressData);
    }

    // ==========================
    // USER: SET DEFAULT ADDRESS
    // ==========================
    static async setDefaultAddress(address_id, user_id) {
        if (!address_id) throw new Error("address_id is required");
        if (!user_id)
            throw new Error("Guest không có địa chỉ mặc định");

        return await AddressModel.setDefault(address_id, user_id);
    }

    // ==========================
    // USER / ADMIN: DELETE
    // ==========================
    static async deleteAddress(address_id) {
        if (!address_id) throw new Error("address_id is required");
        return await AddressModel.delete(address_id);
    }
}

module.exports = AddressService;
