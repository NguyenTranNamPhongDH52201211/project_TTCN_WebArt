import React, { useState } from "react";
import styles from "./OrderListCard.module.css";
import thumb1 from "../../../assets/Productimage/thumb1.png";
import thumb2 from "../../../assets/Productimage/thumb2.png";
import thumb3 from "../../../assets/Productimage/thumb3.png";

const ordersData = [
  {
    id: "DH001",
    customer: "Nguyen Van A",
    date: "13/11/2025",
    status: "Chờ xác nhận",
    total: "500.000đ",
    items: [
      {
        name: "Cọ thư pháp Lobeo",
        qty: 2,
        price: "120.000đ",
        image: thumb1, // ảnh demo
      },
      {
        name: "Màu nước Sakura",
        qty: 1,
        price: "90.000đ",
        image: thumb2,
      },
    ],
  },
  {
    id: "DH002",
    customer: "Tran Thi B",
    date: "12/11/2025",
    status: "Chờ giao hàng",
    total: "350.000đ",
    items: [
      {
        name: "Giấy vẽ cao cấp",
        qty: 1,
        price: "150.000đ",
        image: thumb2,
      },
      {
        name: "Bút kỹ thuật Artline",
        qty: 2,
        price: "70.000đ",
        image: thumb3,
      },
    ],
  },
];

const tabs = ["Tất cả", "Chờ xác nhận", "Chờ giao hàng", "Đang giao", "Đã hoàn tất"];

export default function OrderListCard() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleDetail = (id) =>
    setExpandedOrder(expandedOrder === id ? null : id);

  const filteredOrders =
    activeTab === "Tất cả"
      ? ordersData
      : ordersData.filter((order) => order.status === activeTab);

  return (
    <div className={styles.container}>
      <h2>Đơn hàng của tôi</h2>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p className={styles.noOrders}>Không có đơn hàng nào</p>
      ) : (
        filteredOrders.map((order) => (
          <div
            key={order.id}
            className={styles.card}
            onClick={() => toggleDetail(order.id)}
          >
            <div className={styles.header}>
              <div className={styles.info}>
                <span className={styles.orderId}>{order.id}</span>
                <span className={styles.customer}>{order.customer}</span>
                <span className={styles.date}>{order.date}</span>
              </div>
              <div className={styles.status}>{order.status}</div>
            </div>

            {expandedOrder === order.id && (
              <div className={styles.details}>
                {order.items.map((item, i) => (
                  <div key={i} className={styles.item}>
                    <img src={item.image} alt={item.name} />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      <p className={styles.itemPrice}>{item.price}</p>
                      <p className={styles.itemQty}>Số lượng: {item.qty}</p>
                    </div>
                  </div>
                ))}
                <p className={styles.total}>Tổng tiền: {order.total}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
