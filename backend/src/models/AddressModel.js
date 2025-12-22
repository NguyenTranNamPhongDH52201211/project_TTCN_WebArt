const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class AddressModel {

    // Lấy tất cả địa chỉ của user
    
    static async getAddressesByUser(user_id) {
        const [rows] = await db.execute(
            "SELECT * FROM Shipping_Address WHERE address_user_id = ?",
            [user_id]
        );
        return rows;
    }


    // Lấy 1 địa chỉ để validate khi tạo order

    static async getUserAddress(address_id, user_id) {
        const [rows] = await db.execute(
            `SELECT * FROM Shipping_Address 
             WHERE address_id = ? AND address_user_id = ?`,
            [address_id, user_id]
        );
        return rows[0] || null;
    }

  
    // Tạo địa chỉ mới
 
    static async createAddress(data) {
        const address_id = uuidv4();

        const [result] = await db.execute(
            `INSERT INTO Shipping_Address (
                address_id,
                address_user_id,
                address_recipient_name,
                address_phone,
                address_line,
                address_city,
                address_district,
                address_ward,
                address_country,
                address_is_default
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                address_id,
                data.user_id,
                data.recipient_name,
                data.phone,
                data.line,
                data.city,
                data.district || null,
                data.ward || null,
                data.country || "Vietnam",
                data.is_default || false
            ]
        );

        return { address_id, result };
    }

    // Cập nhật địa chỉ
   
    static async updateAddress(address_id, data) {
        const [result] = await db.execute(
            `UPDATE Shipping_Address
             SET address_recipient_name = ?,
                 address_phone = ?,
                 address_line = ?,
                 address_city = ?,
                 address_district = ?,
                 address_ward = ?,
                 address_country = ?
             WHERE address_id = ?`,
            [
                data.recipient_name,
                data.phone,
                data.line,
                data.city,
                data.district || null,
                data.ward || null,
                data.country || "Vietnam",
                address_id
            ]
        );

        return result;
    }

    // Xóa địa chỉ
    static async deleteAddress(address_id) {
        const [result] = await db.execute(
            "DELETE FROM Shipping_Address WHERE address_id = ?",
            [address_id]
        );
        return result;
    }
}

module.exports = AddressModel;
