const SignUpValidate = (req, res, next) => {
  const { email, password, first_name, last_name, phone } = req.body;

  if (![email, password, first_name, last_name, phone].every(Boolean)) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Email không hợp lệ" });
  }

  if (!/^0\d{9}$/.test(phone)) {
    return res.status(400).json({ message: "SĐT không hợp lệ" });
  }

  if (!/^[a-zA-ZÀ-ỹ\s]{2,50}$/.test(first_name)
   || !/^[a-zA-ZÀ-ỹ\s]{2,50}$/.test(last_name)) {
    return res.status(400).json({ message: "Tên không hợp lệ" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Mật khẩu tối thiểu 6 ký tự" });
  }

  next();
};

module.exports = SignUpValidate;
