import './AddProductPage.css';
import { FiUpload } from 'react-icons/fi';
import Button from '../../components/Button/Button';
import FormSection from '../../layouts/FormSection/FormSection';
import {useToast} from '../../components/ToastManager/ToastManager'
import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';


const AddProductPage = () => {
    const newProductId = useRef(uuidv4()).current;
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [codeStatus, setCodeStatus] = useState("");
    const [errors, setErrors] = useState({});
    const {showToast} = useToast();
     const fileInputRef = useRef(null);
     const initialProductData = {
        product_name: "",
        product_category_id: "",
        product_brand: "",
        product_code: "",
        stock_quantity: 1,
        product_base_price: "",
        invent_quantity_available: 0,
        product_description: ""
    };
      const [productData, setProductData] = useState(initialProductData);

    useEffect(() => {
        fetch("http://localhost:3000/api/category")
            .then(res => res.json())
            .then(data => {
                const childCategories = data.filter(c => c.cate_parent_id !== null);
                setCategories(childCategories);
            })
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    useEffect(() => {
        const code = productData.product_code.trim();
        if (!code) {
            setCodeStatus(null);
            return;
        }

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/products/check/${code}`);
                const data = await res.json();

                if (!data.exists) {
                    setCodeStatus("Hợp lệ");
                } else {
                    setCodeStatus("Đã tồn tại mã này");
                }

            } catch (err) {
                console.log(err);
                setCodeStatus("Không thể kết nối API");
            }
        }, 500); // debounce 0.5s tránh spam API

        return () => clearTimeout(timeout);
    }, [productData.product_code]);

    const resetForm=()=>{
        setProductData(initialProductData);
        
        setImages([]);
        
        // Xóa lỗi
        setErrors({});
        
        // Reset trạng thái mã sản phẩm
        setCodeStatus("");
        
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

        
    
    const validate = () => {
        const newErrors = {};

        if (images.length === 0) {
            newErrors.images = "Phải có ít nhất 1 ảnh";
        }

        if (!productData.product_name.trim()) {
            newErrors.product_name = "Tên sản phẩm không được để trống";
        }

        if (!productData.product_category_id) {
            newErrors.product_category_id = "Loại sản phẩm không được để trống";
        }

        if (!productData.product_brand) {
            newErrors.product_brand = "Thương hiệu sản phẩm không được để trống";
        }

        if (!productData.product_code.trim()) {
            newErrors.product_code = "Mã sản phẩm không được để trống";

        } else if (!/^[A-Za-z0-9-]+$/.test(productData.product_code)) {

            newErrors.product_code = "Mã sản phẩm chỉ cho phép chữ, số, dấu -";

        } else if (codeStatus === "Đã tồn tại mã này") {

            newErrors.product_code = "Mã sản phẩm đã tồn tại. Hãy nhập mã khác!";
        }

        if (productData.stock_quantity < 0) {
            newErrors.stock_quantity = "Số lượng phải lớn hơn 0";
        }

        if (productData.product_base_price < 0) {
            newErrors.product_base_price = "Giá sản phẩm > = 0";
        } else if (!productData.product_base_price.trim()) {
            newErrors.product_base_price = "Giá sản phẩm không được để trống";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    }



    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);

    }

    const handleChange = (newData) => {
        setProductData(newData);
    };




    const handleSave = async () => {
        if (!validate()) {
            return;
        }

        try {

            const formData = new FormData();
            formData.append("product_id", newProductId);
            formData.append("product_name", productData.product_name);
            formData.append("product_category_id", productData.product_category_id);
            formData.append("product_brand", productData.product_brand);
            formData.append("product_code", productData.product_code);
            formData.append("product_base_price", productData.product_base_price);
            formData.append("product_description", productData.product_description);

            images.forEach(img => {
                formData.append("images", img);
            });

            const productResponse = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                body: formData
            });

            if (!productResponse.ok) {

                const errorData = await productResponse.json();
                if (errorData.error === "duplicate_code") {
                    setErrors(prev => ({
                        ...prev,
                        product_code: "Mã sản phẩm đã tồn tại. Hãy nhập mã khác!"
                    }));
                    return; // Dừng không chạy tiếp
                }
                throw new Error(errorData.message || "Failed to create product");

            }
            const productResult = await productResponse.json();
            console.log("Created product:", productResult);


            await fetch("http://localhost:3000/api/inventory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    invent_product_id: newProductId,
                    invent_quantity_available: parseInt(productData.stock_quantity, 10)
                })
            });
           showToast("Thêm sản phẩm thành công!", "success");
           resetForm();

        } catch (error) {
            console.log("Error", error);
            showToast("Lỗi thêm sản phẩm!", "error"); 
        }
    }



    return (

        <div className="add-product">
            <h1>Add Product</h1>
            <div className="breadcrumb">Home &gt; Add Product</div>

            <div className="content-wrapper">


                <div className="upload-section">
                    <h3>Products Images</h3>
                    <div className="upload-box">
                        <FiUpload className="upload-icon" />
                        <p>Click to upload or drag and drop  PNG, JPG</p>
                        <input type="file" multiple accept='image/*' onChange={handleImageUpload} />
                    </div>
                    {errors.images && (
                        <p style={{ color: "red", marginTop: "5px" }}>{errors.images}</p>
                    )}
                    <div className="preview-images">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(img)}
                                alt="preview"
                                className="preview-thumb"
                            />
                        ))}
                    </div>
                </div>

                <FormSection
                    title="Products Description"
                    fields={[
                        { key: 'product_name', label: 'Product Name', type: 'input', placeholder: 'Enter product name', value: productData.product_name },
                        { key: 'product_category_id', label: 'Category', type: 'select', placeholder: 'Select a category', options: categories.map(c => ({ label: c.cate_name, value: c.cate_id })), value: productData.product_category_id },
                        { key: 'product_brand', label: 'Brand', type: 'select', placeholder: 'Select brand', options: ["Marvy", "Lobeo", "Phoenix", "Corma", "Copic", "Gelly Roll", "Grap Master", "Touchliit"], value: productData.product_brand },
                        { key: 'product_code', label: 'Product Code', type: 'input', value: productData.product_code },
                        { key: 'stock_quantity', label: 'Stock Quantity', type: 'quantity', defaultValue: 1, value: productData.stock_quantity },
                        { key: 'product_base_price', label: 'Price', type: 'input', placeholder: '0', value: productData.product_base_price },
                        { key: 'product_description', label: 'Description', type: 'textarea', placeholder: 'Receipt Info (optional)', rows: 5, value: productData.product_description },
                    ]}
                    onChange={handleChange}
                    errors={errors}
                />
                <div className="button-group">
                    <Button text="Cancel" type="secondary" />
                    <Button text="Publish Product" type="primary" onClick={handleSave} />
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;