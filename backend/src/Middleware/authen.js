const AuthenService = require("../services/AuthenService");
const authMiddleware = (req, res, next) => {
  
  const token = req.cookies.token;
  
  if (!token) return next(); // không bắt buộc, để me() xử lý

  const decoded = AuthenService.verifyToken(token);

  if (!decoded) return next();

  req.user = decoded;

  next();

};

module.exports=authMiddleware;