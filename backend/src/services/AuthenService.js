const UserModel = require("../models/UserModel");
const OrderModel = require("../models/OrderModel");
const { sendEmail } =require("../utils/mailService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 số
};
class AuthenService {
  // LOGIN
  static async login(email, password) {
    if (!email || !password) throw new Error("Email và mật khẩu là bắt buộc");

    const user = await UserModel.getUserByEmail(email);
    if (!user || user.user_account_status !== "active") return null;

    const match = await bcrypt.compare(password, user.user_password_hash);
    if (!match) return null;

    const token = jwt.sign(
      { user_id: user.user_id, email: user.user_email },
      SECRET_KEY,
      { expiresIn: "1d" }
    );
    await OrderModel.mergeGuestOrders(user.user_id, user.user_email);

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
    const exist = await UserModel.getUserByEmail(email);
    if (exist) return { error: "Email đã tồn tại!" };

    // 7. Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // 8. Lưu vào DB
    await UserModel.createUser({
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
  static async getUserById(userId) {
    const user = await UserModel.getUserById(userId);
    if (!user) return null;

    return {
      user_id: user.user_id,
      user_email: user.user_email,
      user_first_name: user.user_first_name,
      user_last_name: user.user_last_name,
      user_phone: user.user_phone,
      user_role_type: user.user_role_type,
    };
  }
  // UPDATE PROFILE
  static async updateProfile(userId, data) {
    const { first_name, last_name, phone, email } = data;

    // 1. Validate rỗng
    if (!first_name || !last_name || !phone || !email) {
      throw new Error("Vui lòng điền đầy đủ thông tin");
    }

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email không hợp lệ");
    }

    // 3. Validate Phone
    const phoneRegex = /^(0[0-9]{9})$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("Số điện thoại không hợp lệ");
    }

    // 4. Validate Name
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]{2,50}$/;
    if (!nameRegex.test(first_name + " " + last_name)) {
      throw new Error("Họ tên không hợp lệ");
    }

    // 5. Check user tồn tại
    const currentUser = await UserModel.getById(userId);
    if (!currentUser) {
      throw new Error("User không tồn tại");
    }

    // 6. Nếu đổi email → check trùng
    if (email !== currentUser.user_email) {
      const exist = await UserModel.getUserByEmail(email);
      if (exist) {
        throw new Error("Email đã được sử dụng");
      }
    }

    // 7. Update DB
    const success = await UserModel.updateProfile(userId, {
      user_first_name: first_name,
      user_last_name: last_name,
      user_phone: phone,
      user_email: email,
    });

    if (!success) throw new Error("Update profile thất bại");

    // 8. Trả user mới
    return await UserModel.getUserById(userId);
  }
  // UPDATE PASSWORD
  static async updatePassword(userId, oldPassword, newPassword) {
    // 1. Validate
    if (!oldPassword || !newPassword) {
      throw new Error("Vui lòng nhập đầy đủ mật khẩu");
    }

    if (newPassword.length < 6) {
      throw new Error("Mật khẩu mới phải ít nhất 6 ký tự");
    }

    // 2. Lấy user
    const user = await UserModel.getById(userId);
    if (!user) {
      throw new Error("User không tồn tại");
    }

    // 3. Check mật khẩu cũ
    const match = await bcrypt.compare(oldPassword, user.user_password_hash);

    if (!match) {
      throw new Error("Mật khẩu cũ không đúng");
    }

    // 4. Hash & update
    const newHash = await bcrypt.hash(newPassword, 10);
    await UserModel.updatePassword(userId, newHash);

    return true;
  }
  static async sendResetPasswordOTP(email) {
    const user = await UserModel.getUserByEmail(email);
    if (!user) return; // không báo lỗi, bảo mật

    const otp = generateOTP();
    const expireTime = new Date(Date.now() + 10 * 60 * 1000); // 10 phút
    await UserModel.updateOtp(user.user_id, otp, expireTime);

    await sendEmail({
      to: email,
      subject: "Mã OTP đặt lại mật khẩu",
      text: `Mã OTP của bạn là: ${otp}. Hết hạn trong 10 phút.`,
    });
  }

  // 2. Xác nhận OTP
  static async verifyResetPasswordOTP(email, otp) {
    const user = await UserModel.getUserByEmail(email);
    if (!user) throw new Error("Email không tồn tại");

    if (!user.reset_password_otp || user.reset_password_otp !== otp)
      throw new Error("OTP không hợp lệ");

    if (new Date() > new Date(user.otp_expires))
      throw new Error("OTP đã hết hạn");

    return user.user_id;
  }

  // 3. Đặt mật khẩu mới
  static async resetPassword(userId, newPassword) {
    if (!newPassword || newPassword.length < 6)
      throw new Error("Mật khẩu mới phải ít nhất 6 ký tự");

    const newHash = await bcrypt.hash(newPassword, 10);
    await UserModel.updatePassword(userId, newHash);

    // Xoá OTP
    await UserModel.updateOtp(userId, null, null);

    return true;
  }
}
module.exports = AuthenService;
