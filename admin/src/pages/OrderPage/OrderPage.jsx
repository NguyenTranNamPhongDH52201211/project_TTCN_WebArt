// src/layouts/AdminLayout.jsx
import React from 'react';
import OrderDashboard from '../../layouts/OrderDashBoard/OrderDashBoard';
import { FiGrid, } from 'react-icons/fi';

const OrderPage = () => {
  return (
    <div className="order-layout">
       <OrderDashboard />
      </div>
  );
};

export default OrderPage;
