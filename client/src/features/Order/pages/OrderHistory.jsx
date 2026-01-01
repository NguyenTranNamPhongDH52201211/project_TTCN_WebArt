import React, { useState, useEffect } from "react";
import styles from "./OrderHistory.module.css";
import OrderHistoryItem from "./OrderHistoryItem";
import OrderHistoryDetail from "./OrderHistoryDetail";
import { useOrder } from "../../../context/OrderContext";
export default function OrderHistory() {
  const {
    orders,
    loadOrders,
    selectedOrder,
    loadingOrder,
    fetchOrderDetail,
    closeOrderDetail,
  } = useOrder();
  const [currentTab, setCurrentTab] = useState("all");
  const [page, setPage] = useState(1);


  const TABS = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "confirmed", label: "Đã xác nhận" },
    { key: "processing", label: "Đang xử lý" },
    { key: "shipped", label: "Đang giao" },
    { key: "delivered", label: "Đã giao" },
    { key: "cancelled", label: "Đã hủy" },
    { key: "refunded", label: "Hoàn tiền" },
  ];

  const statusLabels = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    processing: "Đang chuẩn bị",
    shipped: "Đang giao hàng",
    delivered: "Đã giao hàng",
    cancelled: "Đã hủy",
  };

  const statusIcons = {
    pending: "🕐",
    confirmed: "✅",
    processing: "📦",
    shipped: "🚚",
    delivered: "🎉",
    cancelled: "❌",
  };

  const handleTabChange = (status) => {
    setCurrentTab(status);
    setPage(1);
    loadOrders(status); // ⭐ backend xử lý
  };
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN").format(amount) + "đ";

  // 🔹 Filter theo tab
  const filteredOrders = orders.filter((order) => {
    if (currentTab === "all") return true;
    if (currentTab === "processing") {
      return ["pending", "confirmed", "processing", "shipped"].includes(
        order.order_status
      );
    }
    return order.order_status === currentTab;
  });

  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const pagedOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // 🔹 Click → gọi API lấy chi tiết
  const openModal = (orderId) => {
    fetchOrderDetail(orderId);
  };

  return (
    <div className={styles.appWrapper}>
      <main className={styles.mainContent}>
        <nav className={styles.tabsNav}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${
                currentTab === tab.key ? styles.tabActive : ""
              }`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* LIST */}
        <div className={styles.ordersList}>
          {loadingOrder ? (
            <div className={styles.loading}>Đang tải...</div>
          ) : pagedOrders.length === 0 ? (
            <div className={styles.emptyState}>Không có đơn hàng</div>
          ) : (
            pagedOrders.map((order) => (
              <OrderHistoryItem
                key={order.order_id}
                order={order}
                statusLabels={statusLabels}
                statusIcons={statusIcons}
                formatCurrency={formatCurrency}
                onClick={openModal}
              />
            ))
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ‹
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={page === i + 1 ? styles.activePage : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              ›
            </button>
          </div>
        )}
      </main>

      {/* MODAL */}
      <OrderHistoryDetail
        order={selectedOrder}
  isOpen={!!selectedOrder}
        onClose={closeOrderDetail}
        formatCurrency={formatCurrency}
      />
    </div>
  );
}
