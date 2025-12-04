const ProductModel = require('../models/productModel');
const InventoryModel =require('../models/InventoryModule');

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
      try {
         const productId = await ProductModel.create(data);
         // Nếu bạn dùng UUID từ frontend, trả về data.product_id
         return data.product_id || productId;
      } catch (error) {
         console.error("Service Error:", error);
         throw error;
      }
   }

   static async updateProduct(id, data) {
      const product = await ProductModel.update(id, data);
      if (!product) throw new Error("Product not found");
      return product;
   }

   static async deleteProduct(id) {
      const deleted = await ProductModel.delete(id);
      if (!deleted) throw new Error("Product not found");
      return deleted;
   }

}

module.exports = ProductService;