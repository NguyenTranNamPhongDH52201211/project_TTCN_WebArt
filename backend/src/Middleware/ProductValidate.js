const validateProduct = (req, res, next) => {
    const {
        product_name,
        product_category_id,
        product_base_price,
        product_brand,
        stock_quantity,
        product_code
    } = req.body;

    if (product_name) req.body.product_name = product_name.trim();
    if (product_code) req.body.product_code = product_code.trim();


    if (!product_name) {
        return res.status(400).json({ message: "Product name is required" });
    }

    if (!product_category_id) {
        return res.status(400).json({ message: "Product category is required" });
    }

    if (!product_brand) {
        return res.status(400).json({ message: "Product brand is required" });
    }

    if (!product_code) {
        return res.status(400).json({ message: "Product brand is required" });
    }


    if (product_base_price < 0 || isNaN(product_base_price)) {
        return res.status(400).json({ message: "Price must be a positive number" });
    }

    next();
}

module.exports= validateProduct;