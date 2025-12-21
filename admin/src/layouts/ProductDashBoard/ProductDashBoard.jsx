// Example: src/components/ProductDashboard.jsx
import React, { useState, useEffect } from 'react';
import GenericDashboard from '../GenericDashBoard/GenericDashBoard';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();

      // unwrap nếu backend trả nested array
      const payload = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : data;

      const normalized = (Array.isArray(payload) ? payload : []).map(p => ({
        ...p,
        // fallback đúng: dùng alias product_stock nếu có, nếu không dùng invent_quantity_available
        product_stock: Number(p.product_stock ?? p.invent_quantity_available ?? 0),
        product_base_price: Number(p.product_base_price ?? 0),
        images: p.images ? (Array.isArray(p.images) ? p.images : [p.images]) : []
      }));

      console.log('normalized products (stock):', normalized.map(x => ({ id: x.product_id, stock: x.product_stock })));
      setProducts(normalized);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
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



  // ✅ PHÂN TRANG DATA - Cắt array theo currentPage
  const paginatedProducts = products.slice(
    (page - 1) * itemsPerPage,  // Start index
    page * itemsPerPage         // End index
  );

  const columns = [
    {
      key: 'product_name', title: 'Products', minWidth: '200px', flex: 2, sortable: true, render: (value, row) => (
        <div className="product-cell">
          {row.images && row.images.length > 0 ? (
            <img src={row.images[0]} alt={value} className="product-image" />
          ) : (
            <div className="no-image">No image</div>
          )}
          {value}
        </div>
      )
    },
    { key: 'category_name', title: 'Category', sortable: true },
    { key: 'product_brand', title: 'Brand', sortable: true },
    {
      key: 'product_base_price',
      title: 'Price',
      sortable: true,
      render: (value, row) => {
        // format hiển thị giá nếu muốn (ví dụ "25.000 ₫")
        const price = Number(row.product_base_price ?? value ?? 0);
        return <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(price)}</span>;
      }
    },


    {
      key: 'product_stock',
      title: 'Stock',
      sortable: true,
      render: (value, row) => {
        // Lấy từ row.product_stock (đã normalize ở fetchProducts)
        const stock = Number(row.product_stock ?? 0);
        return <span>{stock}</span>;
      }
    }
  ];

  return (
    <GenericDashboard
      breadcrumb="Home > Product List"
      title="Product List"
      subtitle="Track your store's progress to boost your sales."
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Product List' }
      ]}
      titleView="View"
      titleUpdate="Update"
      titleDelete="Delete"
      updatePath="/updateproductpage/:id"
      columns={columns}
      data={paginatedProducts}
      idField="product_id"
      currentPage={page}
      onPageChange={setPage}
      actions={{
        view: handleView,
        delete: handleDelete
      }}
      totalItems={products.length} // Example total for pagination
      itemsPerPage={itemsPerPage} // As in screenshot
      addButtonPath="/addproductpage"
    // Optional handlers: onExport, onAdd, onFilter
    />
  );
};

export default ProductDashboard;