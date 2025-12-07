const express =require('express');
const router=express.Router();
const CategoryController= require('../controllers/CategoryController');

router.get("/", CategoryController.getAll);
router.get("/type", CategoryController.getAllParentType);
router.get("/type/:id", CategoryController.getSubTypeByParentId);

router.get("/:id", CategoryController.getById);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

module.exports=router;
