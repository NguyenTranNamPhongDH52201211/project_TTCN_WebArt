const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

class AuthenService {

  static async login(email, password) {
    const user = await UserModel.getUserByEmail(email);

    if (!user || user.user_account_status !== "active") return null;

    const match = await bcrypt.compare(password, user.user_password_hash);

    console.log(match);

    if (!match) return null;
    const token = jwt.sign(
      { user_id: user.user_id, email: user.user_email },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    return {
      user: {
        user_id: user.user_id,
        email: user.user_email,
        first_name: user.user_first_name,
        last_name: user.user_last_name,
      },
      token,
    };
  }


  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return null;
    }
  }


  static async signup(data) {
    const { email, password, first_name, last_name, phone } = data;

    // ---- 6. Check email đã tồn tại chưa ----
    const exist = await UserModel.getUserByEmail(email);
    if (exist) return { error: "Email đã tồn tại!" };

    // ---- 7. Hash password ----
    const password_hash = await bcrypt.hash(password, 10);

    // ---- 8. Lưu vào DB ----
    await UserModel.createUser({
      email,
      password_hash,
      first_name,
      last_name,
      phone,
    });

    return { success: true };
  }

  

  static async resetPasswordByToken(token, newPassword) {
  if (!token || !newPassword) {
    throw new Error("Thiếu token hoặc mật khẩu mới");
  }

  if (newPassword.length < 6) {
    throw new Error("Mật khẩu phải ≥ 6 ký tự");
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }

  // bảo vệ: đảm bảo token dùng đúng mục đích
  if (payload.type !== "reset-password") {
    throw new Error("Token không hợp lệ");
  }

  const user = await UserModel.getById(payload.user_id);
  if (!user) {
    throw new Error("User không tồn tại");
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await UserModel.updatePassword(user.user_id, newHash);

  return true;
}


}

module.exports = AuthenService;
