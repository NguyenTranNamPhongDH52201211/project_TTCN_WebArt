const CategoryModel = require("../models/CategoryModel");

class CategoryServices {
  static async getAllCate() {
    return await CategoryModel.getAll();
  }
  static async getAllCateType() {
    return await CategoryModel.getType();
  }
  static async getAllSubCateByType(id) {
    return await CategoryModel.getTypeById(id);
  }
  static async getCateDetails(id) {
    const [cate] = await CategoryModel.getById(id);
    if (!cate) throw new Error("Category not found");
    return cate[0];
  }

  static async createCate(data) {
    return await CategoryModel.create(data);
  }

  static async updateCate(id, data) {
    const cate = await CategoryModel.update(id, data);
    if (!cate) throw new Error("Cate not found");
    return cate;
  }

  static async deleteCate(id) {
    const deleted = await CategoryModel.delete(id);
    if (!deleted) throw new Error("Cate not found");
    return deleted;
  }
}

module.exports = CategoryServices;
