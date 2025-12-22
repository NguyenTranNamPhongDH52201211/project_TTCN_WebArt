const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

class AuthenService {

  // LOGIN
  static async login(email, password) {
    if (!email || !password) throw new Error("Email và mật khẩu là bắt buộc");

    const user = await AuthenModel.getUserByEmail(email);
    if (!user || user.user_account_status !== "active") return null;


    const match = await bcrypt.compare(password, user.user_password_hash);
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


  // SIGNUP
  static async signup(data) {
    const { email, password, first_name, last_name, phone } = data;

    // 1. Kiểm tra rỗng
    if (!email || !password || !first_name || !last_name || !phone)
      return { error: "Vui lòng điền đầy đủ thông tin!" };

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { error: "Email không hợp lệ!" };

    // 3. Validate Phone
    const phoneRegex = /^(0[0-9]{9})$/;
    if (!phoneRegex.test(phone))
      return { error: "Số điện thoại phải có 10 số và bắt đầu bằng 0!" };

    // 4. Validate Name
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]{2,50}$/;
    if (!nameRegex.test(first_name + " " + last_name))
      return { error: "Họ tên không hợp lệ!" };

    // 5. Validate Password
    if (password.length < 6) return { error: "Mật khẩu phải ít nhất 6 ký tự!" };

    // 6. Check email đã tồn tại chưa
    const exist = await AuthenModel.getUserByEmail(email);
    if (exist) return { error: "Email đã tồn tại!" };

    // 7. Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // 8. Lưu vào DB
    await AuthenModel.createUser({
      email,
      password_hash,
      first_name,
      last_name,
      phone,
    });

    return { success: true };
  }

  // VERIFY TOKEN
  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return null;
    }
  }

  // LOGOUT (chỉ trả cookie rỗng)
  static logout(res) {
    res.clearCookie("token");
  }
}
module.exports = AuthenService;
