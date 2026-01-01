import React from "react";
import styles from "./OrderHistoryItem.module.css";

export default function OrderHistoryItem({
  order,
  statusLabels,
  statusIcons,
  formatCurrency,
  onClick,
}) {
  return (
    <div
      className={styles.orderCard}
      onClick={() => onClick(order.order_id)}
    >
      <div className={styles.orderInfo}>
        <div className={styles.orderTitleWrapper}>
          <span className={styles.orderIcon}>
            {statusIcons[order.order_status]}
          </span>
          <span className={styles.orderNumber}>
            #{order.order_number}
          </span>
        </div>

        <div className={styles.orderMeta}>
          {new Date(order.order_created_at).toLocaleDateString("vi-VN")}
        </div>
      </div>

      <div className={styles.orderPriceSection}>
        <div className={styles.orderAmount}>
          {formatCurrency(order.order_total_amount)}
        </div>
        <div className={styles.statusBadge}>
          {statusLabels[order.order_status]}
        </div>
      </div>
    </div>
  );
}
