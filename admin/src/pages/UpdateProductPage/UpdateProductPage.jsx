import { FiUpload } from 'react-icons/fi';
import Button from '../../components/Button/Button';
import FormSection from '../../layouts/FormSection/FormSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo, useRef } from 'react';
import "./UpdateProductPage.css";

const UpdateProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // image upload state
  const [newImages, setNewImages] = useState([]); // File objects to upload
  const [previewUrls, setPreviewUrls] = useState([]); // local previews
  const fileInputRef = useRef(null);

  // Load product + category + inventory
  useEffect(() => {
    let mounted = true;

    Promise.all([
      fetch(`http://localhost:3000/api/products/${id}`).then(res => res.json()),
      fetch(`http://localhost:3000/api/category`).then(res => res.json()),
      fetch(`http://localhost:3000/api/inventory/${id}`).then(res => res.json())
    ])
      .then(([productData, categoriesData, inventoryData]) => {
        console.log("ProductData:", productData);
        console.log("CategoriesData:", categoriesData);
        console.log("InventoryData:", inventoryData);

        // Normalize productData if backend returns array rows
        let productObj = productData;
        if (Array.isArray(productData)) {
          productObj = productData.length > 0
            ? (Array.isArray(productData[0]) ? productData[0][0] : productData[0])
            : {};
        }

        // Normalize inventory
        const inventory = Array.isArray(inventoryData)
          ? (Array.isArray(inventoryData[0]) ? inventoryData[0][0] : inventoryData[0])
          : inventoryData;

        // Ensure images is an array (not used in UI here but kept consistent)
        productObj.images = productObj.images
          ? (Array.isArray(productObj.images) ? productObj.images : [productObj.images])
          : [];

        if (mounted) {
          setProduct({
            ...productObj,
            product_stock: inventory?.invent_quantity_available ?? 0
          });
          setCategories(categoriesData || []);
          setIsLoading(false);

          console.log("Product state sau khi set:", {
            ...productObj,
            product_stock: inventory?.invent_quantity_available ?? 0
          });
        }
      })
      .catch(err => {
        console.error(err);
        if (mounted) setIsLoading(false);
      });

    return () => { mounted = false; };
  }, [id]);

  // Create fields from product state
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
        options: ["Marvy", "Lobeo", "Phoenix", "Corma", "Copic", "Gelly Roll","Grap Master","Touchliit"].map(b => ({ value: b, label: b })),
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

  // Handle form changes - update product state
  const handleFormChange = (updatedData) => {
    setProduct(prev => ({ ...prev, ...updatedData }));
  };

  // Handle image selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setNewImages(prev => [...prev, ...files]);
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviewUrls(prev => [...prev, ...urls]);
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(u => {
        try { URL.revokeObjectURL(u); } catch (e) { /* ignore */ }
      });
    };
  }, [previewUrls]);

  // Handle save button (keeps your inventory logic; supports uploading images if selected)
  const handleSave = async () => {
    const { product_stock, ...productPayload } = product || {};

    try {
      console.log("Sending product:", product);

      // If there are new images -> send FormData (do not set Content-Type)
      if (newImages && newImages.length > 0) {
        const formData = new FormData();
        Object.keys(productPayload).forEach(key => {
          const val = productPayload[key];
          if (val !== undefined && val !== null) formData.append(key, val);
        });
        newImages.forEach(img => formData.append("images", img)); // backend expects upload.array("images")

        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: 'PUT',
          body: formData
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.message || "Failed to update product with images");
        }
      } else {
        // No new images: send JSON as before
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productPayload)
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.message || "Failed to update product");
        }
      }

      // Inventory update (kept as in your original code)
      if (product_stock != null) {
        const inventoryResponse = await fetch(`http://localhost:3000/api/inventory/${id}/restock`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: product_stock })
        });

        if (!inventoryResponse.ok) {
          alert('Failed to update inventory');
          return;
        }
      }

      // Refetch product to get updated images/fields and update frontend
      try {
        const detailRes = await fetch(`http://localhost:3000/api/products/${id}`);
        const detailData = await detailRes.json();
        let updated = detailData;
        if (Array.isArray(detailData)) {
          updated = detailData.length > 0 ? (Array.isArray(detailData[0]) ? detailData[0][0] : detailData[0]) : {};
        }
        updated.images = updated.images ? (Array.isArray(updated.images) ? updated.images : [updated.images]) : [];
        updated.product_stock = product_stock ?? product.product_stock ?? updated.product_stock ?? 0;
        setProduct(prev => ({ ...prev, ...updated }));
      } catch (refetchErr) {
        console.warn("Refetch product failed:", refetchErr);
      }

      // Cleanup previews and reset newImages
      try { previewUrls.forEach(u => { try { URL.revokeObjectURL(u); } catch(e){} }); } catch(e){}
      setNewImages([]);
      setPreviewUrls([]);

      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product: ' + (error.message || 'Unknown error'));
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    window.history.back();
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="add-product">
      <h1>Update Product</h1>
      <div className="breadcrumb">Home &gt; Update Product</div>

      <div className="content-wrapper">
        {/* Upload Section (no existing images shown) */}
        <div className="upload-section">
          <h3>Products Images</h3>

          <div
            className="upload-box"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            <FiUpload className="upload-icon" />
            <p>Click to upload or drag and drop PNG, JPG or GIF (MAX. 800x400px)</p>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ position: 'absolute', left: '-9999px' }}
            />
          </div>

          {/* preview ảnh mới (nếu user đã chọn) */}
          <div className="preview-images">
            {previewUrls.map((url, idx) => (
              <img key={idx} src={url} alt={`preview-${idx}`} className="preview-thumb" />
            ))}
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