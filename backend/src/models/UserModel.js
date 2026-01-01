const db = require("../config/db");

class UserModel {
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

  static async getAll() {
    const [rows] = await db.execute(`
    SELECT 
      user_id,
      user_email,
      CONCAT(user_first_name, ' ', user_last_name) as user_full_name,
      user_phone,
      user_role_type,
      user_account_status,
      user_created_at
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
      user_email = ?,
      user_first_name = ?,
      user_last_name = ?,
      user_phone = ?
    WHERE user_id = ?
  `;

    const values = [
      data.email,
      data.user_first_name,
      data.user_last_name,
      data.user_phone,
      user_id,
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
  static async updateOtp(user_id, otp, otp_expires) {
  const [result] = await db.execute(
    "UPDATE Users SET reset_password_otp = ?, otp_expires = ? WHERE user_id = ?",
    [otp, otp_expires, user_id]
  );

  return result.affectedRows > 0;
}

}

module.exports = UserModel;
