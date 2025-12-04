// Example: src/components/ProductDashboard.jsx
import React, { useState, useEffect } from 'react';
import GenericDashboard from '../GenericDashBoard/GenericDashBoard';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const handleDelete = async (row) => {
    // Confirm trước khi xóa
    if (!window.confirm(`Delete "${row.product_name}"? This will also delete its inventory.`)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/products/${row.product_id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      alert("Product deleted successfully!");

      // Refresh lại danh sách
      fetchProducts();

    } catch (error) {
      console.error("Delete error:", error);
      alert(`Failed to delete product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (row) => {
    console.log("View product:", row);
    // Hoặc navigate đến detail page
    // navigate(`/products/${row.product_id}`);
  };

  // ✅ PAGINATION HANDLER
   const handlePageChange = (page) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
    // Scroll to top khi đổi page (optional)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ PHÂN TRANG DATA - Cắt array theo currentPage
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,  // Start index
    currentPage * itemsPerPage         // End index
  );
  const columns = [
    {
      key: 'product_name', title: 'Products', minWidth: '200px', flex: 2, sortable: true, render: (value, row) => (
        <div className="product-cell">
          <img src={row.image} alt={value} className="product-image" />
          {value}
        </div>
      )
    },
    { key: 'category_name', title: 'Category', sortable: true },
    { key: 'product_brand', title: 'Brand', sortable: true },
    { key: 'product_base_price', title: 'Price', sortable: true },
    { key: 'product_created_at', title: 'Created At' },
  ];

  return (
    <GenericDashboard
      breadcrumb="Home > Product List"
      title="Product List"
      description="Track your store's progress to boost your sales."
      columns={columns}
      data={paginatedProducts}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onView={handleView}
      onDelete={handleDelete}
      totalItems={products.length} // Example total for pagination
      itemsPerPage={itemsPerPage} // As in screenshot
      addButtonText="Add Product"
    // Optional handlers: onExport, onAdd, onFilter
    />
  );
};

export default ProductDashboard;