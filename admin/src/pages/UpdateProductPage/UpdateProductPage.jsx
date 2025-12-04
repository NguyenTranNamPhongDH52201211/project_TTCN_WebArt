import { FiUpload } from 'react-icons/fi';
import Button from '../../components/Button/Button';
import FormSection from '../../layouts/FormSection/FormSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import "./UpdateProductPage.css";

const UpdateProductPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load product + category
    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:3000/api/products/${id}`).then(res => res.json()),
            fetch(`http://localhost:3000/api/category`).then(res => res.json()),
            fetch(`http://localhost:3000/api/inventory/${id}`).then(res => res.json())
        ])
            .then(([productData, categoriesData, inventoryData]) => {
                console.log("ProductData:", productData);
                console.log("CategoriesData:", categoriesData);
                console.log("InventoryData:", inventoryData);
                const inventory = inventoryData?.[0]?.[0];
                setProduct({
                    ...productData,
                    product_stock: inventory.invent_quantity_available ?? 0
                });
                setCategories(categoriesData);
                setIsLoading(false);

                console.log("Product state sau khi set:", {
                    ...productData,
                    product_stock: inventoryData.invent_quantity_available ?? 0
                });

            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, [id]);

    // FIX: Tạo fields với value từ product state
    const fields = useMemo(() => {

        if (!product) return [];

        return [
            {
                key: "product_name",
                label: "Product Name",
                type: "input",
                placeholder: "Enter product name",
                value: product.product_name || ""
            },
            {
                key: "product_category_id",
                label: "Category",
                type: "select",
                placeholder: "Select a category",
                options: categories.map(c => ({ value: c.cate_id, label: c.cate_name })),
                value: product.product_category_id || ""
            },
            {
                key: "product_brand",
                label: "Brand",
                type: "select",
                placeholder: "Select a brand",
                options: ["Marvy", "Lobeo", "Phoenix", "Corma"].map(b => ({ value: b, label: b })),
                value: product.product_brand || ""
            },
            {
                key: "product_code",
                label: "Product Code",
                type: "input",
                placeholder: "Enter product code",
                value: product.product_code || ""
            },
            {
                key: "product_stock",
                label: "Stock Quantity",
                type: "quantity",
                value: product.product_stock ?? 0
            },
            {
                key: "product_base_price",
                label: "Price",
                type: "input",
                placeholder: "0",
                value: product.product_base_price || ""
            },
            {
                key: "product_description",
                label: "Description",
                type: "textarea",
                rows: 5,
                value: product.product_description || ""
            }
        ];
    }, [product, categories]);
    console.log("Fields:", fields);


    // Handle form changes - update product state
    const handleFormChange = (updatedData) => {
        setProduct(prev => ({ ...prev, ...updatedData }));
    };

    // Handle save button
    const handleSave = async () => {
        const { product_stock, ...productPayload } = product;


        try {
            console.log("Sending product:", product);
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productPayload)
            });

            if (response.ok) {
                alert('Product updated successfully!');
                // Optional: redirect hoặc reload data
            } else {
                alert('Failed to update product');
            }
            console.log("Update response:", response);
            const result = await response.json();
            console.log("Response body:", result);

            if (product.product_stock != null) {
                const inventoryResponse = await fetch(`http://localhost:3000/api/inventory/${id}/restock`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: product_stock }) // số lượng muốn set
                });

                if (!inventoryResponse.ok) {
                    alert('Failed to update inventory');
                    return;
                }
            }


        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        }
    };

    // Handle cancel button
    const handleCancel = () => {
        window.history.back();
        // hoặc navigate('/products') nếu dùng useNavigate
    };

    if (isLoading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="add-product">
            <h1>Update Product</h1>
            <div className="breadcrumb">Home &gt; Update Product</div>

            <div className="content-wrapper">
                {/* Upload Section */}
                <div className="upload-section">
                    <h3>Products Images</h3>
                    <div className="upload-box">
                        <FiUpload className="upload-icon" />
                        <p>Click to upload or drag and drop SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                </div>

                {/* Form Section */}
                <FormSection
                    title="Products Description"
                    fields={fields}
                    onChange={handleFormChange}
                />

                {/* Buttons */}
                <div className="button-group">
                    <Button text="Cancel" type="secondary" onClick={handleCancel} />
                    <Button text="Save" type="primary" onClick={handleSave} />
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;
