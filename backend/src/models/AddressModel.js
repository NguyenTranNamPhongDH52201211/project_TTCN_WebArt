const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

class AddressModel {

    // Lấy danh sách địa chỉ theo user
    static async getByUserId(user_id) {
        const [rows] = await db.execute(
            `SELECT *
             FROM Shipping_Address
             WHERE address_user_id = ?
             ORDER BY address_is_default DESC, address_created_at DESC`,
            [user_id]
        );
        return rows;
    }

    // Lấy địa chỉ mặc định của user
    static async getDefaultByUserId(user_id) {
        const [rows] = await db.execute(
            `SELECT *
             FROM Shipping_Address
             WHERE address_user_id = ?
             ORDER BY address_is_default DESC, address_created_at DESC
             LIMIT 1`,
            [user_id]
        );
        return rows.length ? rows[0] : null;
    }

    // Lấy address theo id
    static async getById(address_id) {
        const [rows] = await db.execute(
            `SELECT * FROM Shipping_Address WHERE address_id = ?`,
            [address_id]
        );
        return rows.length ? rows[0] : null;
    }

   // Tạo address mới
static async create(data) {
    const {
        address_user_id,
        address_recipient_name,
        address_phone,
        address_line,
        address_city,
        address_district,
        address_ward,
        address_is_default
    } = data;

    const address_id = uuidv4(); // tạo UUID mới

    await db.execute(
        `INSERT INTO Shipping_Address (
            address_id,
            address_user_id,
            address_recipient_name,
            address_phone,
            address_line,
            address_city,
            address_district,
            address_ward,
            address_is_default
        ) VALUES (?,?,?,?,?,?,?,?,?)`,
        [
            address_id,
            address_user_id,
            address_recipient_name,
            address_phone,
            address_line,
            address_city,
            address_district || null,
            address_ward || null,
            address_is_default || false
        ]
    );

    return { address_id }; // trả về UUID vừa tạo
}


    // Set địa chỉ mặc định
    static async setDefault(address_id, user_id) {
        await db.execute(
            `UPDATE Shipping_Address
             SET address_is_default = 0
             WHERE address_user_id = ?`,
            [user_id]
        );

        const [result] = await db.execute(
            `UPDATE Shipping_Address
             SET address_is_default = 1
             WHERE address_id = ?`,
            [address_id]
        );

        return result;
    }

    // Xoá address
    static async delete(address_id) {
        const [result] = await db.execute(
            `DELETE FROM Shipping_Address WHERE address_id = ?`,
            [address_id]
        );
        return result;
    }
}

module.exports = AddressModel;
