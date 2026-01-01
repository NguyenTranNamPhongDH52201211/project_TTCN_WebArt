import styles from "./OrderHistoryDetail.module.css";

export default function OrderHistoryDetail({
  order,
  isOpen,
  onClose,
  formatCurrency,
}) {
  if (!order) return null;

  const { order: orderInfo, items = [] } = order;

  return (
    <div
      className={`${styles.modalOverlay} ${
        isOpen ? styles.modalActive : ""
      }`}
      onClick={onClose}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>Đơn hàng #{orderInfo.order_number}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.orderMeta}>
            <span>
              📅 {new Date(orderInfo.order_created_at).toLocaleString()}
            </span>
          </div>

          <div className={styles.productList}>
            {items.map((item) => (
              <div
                key={item.order_item_id}
                className={styles.productItem}
              >
                <div>
                  <p className={styles.productName}>
                    {item.product_name}
                  </p>
                  <span className={styles.productQty}>
                    Số lượng: {item.quantity}
                  </span>
                </div>

                <div className={styles.productPrice}>
                  {formatCurrency(
                    Number(item.unit_price) *
                      Number(item.quantity)
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalBox}>
            <span>Tổng thanh toán</span>
            <strong>
              {formatCurrency(
                Number(orderInfo.order_total_amount)
              )}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

