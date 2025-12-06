const CategoryService = require('../services/CategoryServices');

class CategoryController{
    static async getAll(req,res){
        try {
            const Cates= await CategoryService.getAllCate() ;
            res.json(Cates);
        } catch (error) {
            console.error('Controller error:', error); 
            res.status(500).json({message: error.message});
        }
    }
    static async getAllParentType(req,res){
        try {
            const Cates= await CategoryService.getAllParentType() ;
            res.json(Cates);
        } catch (error) {
            console.error('Controller error:', error); 
            res.status(500).json({message: error.message});
        }
    }
     static async getById(req,res){
        try {
            const Cates= await CategoryService.getCateDetails(req.params.id);
            res.json(Cates);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
     static async getSubTypeByParentId(req,res){
        try {
            const Cates= await CategoryService.getSubTypeByParentId(req.params.id);
            res.json(Cates);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
     static async create(req,res){
        try {
            const Cates= await CategoryService.createCate(req.body);
            res.status(201).json(Cates);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
     static async update(req,res){
        try {
            const Cates= await CategoryService.updateCate(req.params.id,req.body);
            res.json(Cates);
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
     static async delete(req,res){
        try {
            await CategoryService.deleteCate(req.params.id);
            res.json({message:"Cate deleted"});
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    }
}

module.exports=CategoryController;