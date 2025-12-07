const express = require("express");
const router = express.Router();
const  ProductController = require('..//controllers/ProductController');
const upload= require ( "../Middleware/upload");


router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/",upload.array("images",5), ProductController.create);
router.put("/:id",upload.array("images",5), ProductController.update);
router.delete("/:id", ProductController.delete);


module.exports = router;
