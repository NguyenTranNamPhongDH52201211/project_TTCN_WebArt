const multer = require("multer");

const storage = multer.memoryStorage(); // memoryStorage không có filename

const upload = multer({ storage });

module.exports = upload;
