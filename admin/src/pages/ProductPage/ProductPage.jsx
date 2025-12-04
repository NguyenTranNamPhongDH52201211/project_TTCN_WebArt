// src/layouts/AdminLayout.jsx
import React from 'react';
import Sidebar from '../../layouts/SideBar/SideBar';
import Header from '../../layouts/Header/Header';
import ProductDashboard from '../../layouts/ProductDashBoard/ProductDashBoard';
import { FiGrid, } from 'react-icons/fi';

const ProductPage = () => {
  return (
    <div className="product-layout">
        <ProductDashboard  />
      </div>
  );
};

export default ProductPage;
