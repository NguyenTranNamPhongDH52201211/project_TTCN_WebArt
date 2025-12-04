const ProductService = require('../services/ProductService');

class ProductController {
    static async getAll(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    static async getById(req, res) {
        try {
            const product = await ProductService.getProductDetails(req.params.id);
            console.log(req.params.id);
            res.json(product);

        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    static async create(req, res) {
        try {
            console.log("REQ BODY PRODUCT:", req.body);

            // Validate dữ liệu cơ bản
            if (!req.body.product_name || !req.body.product_id) {
                return res.status(400).json({
                    message: "Missing required fields: product_name, product_id"
                });
            }

            const productId = await ProductService.createProduct(req.body);

            // Trả về product_id từ body (vì bạn đã tạo UUID từ frontend)
            res.status(201).json({
                productId: req.body.product_id, // Hoặc productId nếu insertId hợp lệ
                success: true
            });
        } catch (err) {
            console.error("CREATE PRODUCT ERROR:", err);
            res.status(400).json({
                message: err.message,
                error: err.sqlMessage || err // Thêm chi tiết lỗi SQL
            });
        }
    }

    static async update(req, res) {
        try {
            const product = await ProductService.updateProduct(req.params.id, req.body);
            res.json(product);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async delete(req, res) {
        try {
            await ProductService.deleteProduct(req.params.id);
            res.json({ message: "Product deleted" });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

}

module.exports = ProductController;