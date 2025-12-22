import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericDashboard from "../GenericDashBoard/GenericDashBoard";

const OrderDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 5;

  // MOCK DATA (sau này thay bằng API)
  const orders = [
    {
      order_id: 1,
      order_number: "#ORD-001",
      order_created_at: "2025-01-10 14:30",
      user_name: "Phong",
      order_status: "Paid",
      order_items_total: 3,
      order_total_amount: "450,000 VND",
    },
  ];

 const handleView = (row) => {
  navigate(`/orders/${row.order_id}`);
};


  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns = [
    {
      key: "order_number",
      title: "Order Number",
      minWidth: "200px",
      sortable: true,
    },
    { key: "order_created_at", title: "Date/Time", sortable: true },
    { key: "user_name", title: "Customer", sortable: true },
    { key: "order_status", title: "Status", sortable: true },
    { key: "order_items_total", title: "Items", sortable: true },
    { key: "order_total_amount", title: "Total", sortable: true },
  ];

  return (
    <GenericDashboard
      title="Order List"
      subtitle="Manage and track customer orders"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Orders" },
      ]}
      columns={columns}
      data={orders}
      idField="order_id"
      currentPage={currentPage}
      totalItems={orders.length}
      itemsPerPage={itemsPerPage}
      onPageChange={handlePageChange}
      onView={handleView}
      showAddButton={false}   // ✅ đúng nghiệp vụ Order
    />
  );
};

export default OrderDashboard;
