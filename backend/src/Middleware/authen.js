const AuthenService = require("../services/AuthenService");

const authMiddleware = (req, res, next) => {
  if (!req.cookies) return next();

  const token = req.cookies.token;
  if (!token) return next();

  const decoded = AuthenService.verifyToken(token);

  if (!decoded) return next();

  req.userId = decoded.user_id;
  next();

};


module.exports = authMiddleware;
