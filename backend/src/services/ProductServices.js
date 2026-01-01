const ProductModel = require("../models/productModel");
const ImagesService = require("./ImagesServices");
const ProductImagesModel = require("../models/ProductImagesModel");

class ProductService {
  static async getAllProducts() {
    return await ProductModel.getAll();
  }

  static async getProductDetails(id) {
    const [product] = await ProductModel.getById(id);
    if (!product) throw new Error("Product not found");
    return product[0];
  }

  static async createProduct(data) {
    const productId = await ProductModel.create(data);
    return productId;
  }

  static async getByCode(data) {
    const existedTotal = await ProductModel.getByCode(data.product_code);

    return existedTotal;
  }

  static async getfilterByParentOfChild(id) {
    return await ProductModel.filterByParentOfChild(id);
  }

  static async updateProduct(id, data, files) {
    const { images, ...productData } = data;

    const [check] = await ProductModel.getById(id);
    if (check.length === 0) throw new Error("Product not found");

    await ProductModel.update(id, productData);

    if (files && files.length > 0) {
      await ProductImagesModel.deleteByProductId(id);

      await ImagesService.uploadMultiple(id, files);
    }

    return { message: "Product updated successfully" };
  }

  static async deleteProduct(id) {
    await ImagesService.deleteByProductId(id);
    const deleted = await ProductModel.delete(id);
    if (!deleted) throw new Error("Product not found");
    return deleted;
  }
  // ProductServices.js
  static async getProductDetailWithImages(id) {
    const product = await ProductModel.getDetailWithImages(id);
    if (!product) throw new Error("Product not found");
    return product;
  }
}

module.exports = ProductService;
