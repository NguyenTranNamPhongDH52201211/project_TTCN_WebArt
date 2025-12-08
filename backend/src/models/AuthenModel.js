const db = require("../config/db");

class AuthenModel {
  static async getUserByEmail(email) {
    const [rows] = await db.query("SELECT * FROM Users WHERE user_email = ?", [
      email,
    ]);
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

    const [result] = await db.query(sql, [
      email,
      password_hash,
      first_name,
      last_name,
      phone,
    ]);

    return result;
  }
}

module.exports = AuthenModel;
