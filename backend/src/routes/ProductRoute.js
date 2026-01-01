const express = require("express");
const router = express.Router();
const  ProductController = require('../controllers/ProductController');
const upload= require ( "../Middleware/upload");
const validateProduct = require("../Middleware/ProductValidate")


router.get("/", ProductController.getAll);
router.get("/filter/:id", ProductController.getfilterByParentOfChild);
router.get("/:id", ProductController.getById);
router.post("/",upload.array("images",5),validateProduct, ProductController.create);
router.put("/:id",upload.array("images",5),validateProduct, ProductController.update);
router.delete("/:id", ProductController.delete);
router.get("/check/:code", ProductController.checkProductCode);
router.get("/detail/:id", ProductController.getDetailWithImages);


module.exports = router;
