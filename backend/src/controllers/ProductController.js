
const ProductService = require("../services/ProductServices");
const ImageService = require("../services/ImagesServices");


class ProductController {
  static async getAll(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getfilterByParentOfChild(req, res) {
    try {
      const products = await ProductService.getfilterByParentOfChild(
        req.params.id
      );
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

 static async checkProductCode(req, res) {
  try {
    const total = await ProductService.getByCode(req.params.code);

    return res.json({ exists: total > 0 });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}



  static async getById(req, res) {
    try {
      const product = await ProductService.getProductDetails(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }


  static async create(req, res) {
    try {
      console.log("REQ BODY:", req.body);
      console.log("REQ FILES:", req.files);

      if (!req.body.product_name) {
        return res.status(400).json({
          message: "Missing required fields: product_name or product_id",
        });
      }

      const productData = {
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        product_category_id: req.body.product_category_id,
        product_brand: req.body.product_brand,
        product_code: req.body.product_code,
        product_base_price: req.body.product_base_price,
        product_description: req.body.product_description,
      };

      const productId = await ProductService.createProduct(productData);


      let uploadedImages = [];
      if (req.files && req.files.length > 0) {
        uploadedImages = await ImageService.uploadMultiple(productId,req.files);
      }

      return res.status(201).json({
        success: true,
        productId,
        images: uploadedImages,
      });
    } catch (err) {
       if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
            error: "duplicate_code",
            message: "Mã sản phẩm đã tồn tại"
        });
    }
    return res.status(500).json({ message: err.message });
    }
  }


  static async update(req, res) {
    try {
      const result = await ProductService.updateProduct(
        req.params.id,
        req.body,
        req.files
      );
      res.json(result);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
            error: "duplicate_code",
            message: "Mã sản phẩm đã tồn tại"
        });
    }
    return res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      await ProductService.deleteProduct(req.params.id);
      res.json();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  // ProductController.js
static async getDetailWithImages(req, res) {
  try {
    const product = await ProductService.getProductDetailWithImages(
      req.params.id
    );
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

}

module.exports = ProductController;
