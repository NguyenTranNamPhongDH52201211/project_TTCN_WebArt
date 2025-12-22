const db = require("../config/db");

class AuthenModel {
  static async getUserByEmail(email) {
    const [rows] = await db.execute(
      "SELECT * FROM Users WHERE user_email = ?",
      [email]
    );
    return rows[0] || null;
  }
  static async createUser({
    email,
    password_hash,
    first_name,
    last_name,
    phone,
  }) {
    const sql =
      "INSERT INTO Users (user_email, user_password_hash, user_first_name, user_last_name, user_phone) VALUES (?, ?, ?, ?, ?)";

    const [result] = await db.execute(sql, [
      email,
      password_hash,
      first_name,
      last_name,
      phone,
    ]);

    return result;
  }

  static async getUserById(userId) {
    const [rows] = await db.execute(
      `
      SELECT 
        user_id,
        user_email,
        user_first_name,
        user_last_name,
        user_phone,
        user_role_type,
        user_account_status
      FROM Users
      WHERE user_id = ?
      `,
      [userId]
    );

    return rows[0] || null;
  }
}

module.exports = AuthenModel;
