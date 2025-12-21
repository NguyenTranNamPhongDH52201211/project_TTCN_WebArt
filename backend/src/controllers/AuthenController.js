const AuthenService = require("../services/AuthenService");

class AuthenController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthenService.login(email, password);
      if (!result)
        return res.status(401).json({ message: "Email hoặc mật khẩu sai" });

      // Gửi cookie HttpOnly
      res.cookie("token", result.token, {
        httpOnly: true,
        secure: false, // true nếu dùng HTTPS
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 ngày
      });

      res.json({ user: result.user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  static async me(req, res) {
    // Middleware auth sẽ gắn req.user
    if (!req.user) return res.status(401).json({ message: "Chưa đăng nhập" });
    res.json({ user: req.user });
  }

static async logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Đăng xuất thành công" });
}

  static async signup(req, res) {
    try {
      const result = await AuthenService.signup(req.body);

      if (result.error) return res.status(400).json({ message: result.error });

      return res.json({ message: "Đăng ký thành công!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error!" });
    }
  }
}

module.exports = AuthenController;
