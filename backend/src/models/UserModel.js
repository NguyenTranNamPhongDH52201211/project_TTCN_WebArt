const db = require("../config/db");

class UserModel {

  //getUserByEmail
  static async getUserByEmail(user_email) {
    const [rows] = await db.query("SELECT * FROM Users WHERE user_email = ? LIMIT 1", [
      user_email
    ]);
    return rows[0] || null;
  }

  //create
  static async createUser(data) {
    const sql =
      "INSERT INTO Users (user_email, user_password_hash, user_first_name, user_last_name, user_phone,user_role_type,user_account_status,user_email_verified) VALUES (?, ?, ?, ?, ?)";

    const [result] = await db.query(sql, [
      data.email,
      data.password_hash,
      data.first_name ||null,
      data.last_name ||null,
      data.phone ||null,
    ]);

    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.execute(`
      SELECT *
      FROM Users
      ORDER BY user_created_at DESC
    `);

    return rows;
  }

  static async getById(user_id) {
    const [rows] = await db.execute(
      "SELECT * FROM Users WHERE user_id = ? LIMIT 1",
      [user_id]
    );

    return rows[0] || null;
  }
  
  static async updateProfile(user_id, data) {
    const sql = `
      UPDATE Users SET
        user_first_name = ?,
        user_last_name = ?,
        user_phone = ?
      WHERE user_id = ?
    `;

    const values = [
      data.user_first_name,
      data.user_last_name,
      data.user_phone,
      user_id
    ];

    const [result] = await db.execute(sql, values);
    return result.affectedRows > 0;
  }

  
  static async updatePassword(user_id, user_password_hash) {
    const [result] = await db.execute(
      "UPDATE Users SET user_password_hash = ? WHERE user_id = ?",
      [user_password_hash, user_id]
    );

    return result.affectedRows > 0;
  }

  static async updateLastLogin(user_id) {
    await db.execute(
      "UPDATE Users SET user_last_login = NOW() WHERE user_id = ?",
      [user_id]
    );
  }


   static async verifyEmail(user_id) {
    const [result] = await db.execute(
      "UPDATE Users SET user_email_verified = true WHERE user_id = ?",
      [user_id]
    );

    return result.affectedRows > 0;
  }

  
  static async updateStatus(user_id, user_account_status) {
    const [result] = await db.execute(
      "UPDATE Users SET user_account_status = ? WHERE user_id = ?",
      [user_account_status, user_id]
    );

    return result.affectedRows > 0;
  }

   static async updateRole(user_id, user_role_type) {
    const [result] = await db.execute(
      "UPDATE Users SET user_role_type = ? WHERE user_id = ?",
      [user_role_type, user_id]
    );

    return result.affectedRows > 0;
  }

  static async deactivate(user_id) {
    const [result] = await db.execute(
      "UPDATE Users SET user_account_status = 'inactive' WHERE user_id = ?",
      [user_id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = UserModel;
