const OrderModel = require("../models/OrderModel");
const OrderItemModel = require("../models/OrderItemModel");

class OrderService {
 
  // Lấy chi tiết order (order + items)
  static async getOrderDetail(order_id) {
    if (!order_id) throw new Error("order_id is required");

    const order = await OrderModel.getById(order_id);
    if (!order) throw new Error("Order not found");

    const items = await OrderItemModel.getByOrderId(order_id);

    return { order, items };
  }

  // Tạo order + order items
 static async createOrder(orderData, orderItems) {
    if (!orderData) throw new Error("orderData is required");
    if (!orderItems || !orderItems.length)
      throw new Error("orderItems is required");

    const {
      order_user_id,
      guest_email,
      order_address_id,
      order_total_amount,
    } = orderData;

    // ⭐ PHÂN LUỒNG USER / GUEST
    if (!order_user_id) {
      // Guest
      if (!guest_email) {
        throw new Error("Guest phải nhập email để tạo đơn hàng");
      }
    }

    if (!order_address_id || !order_total_amount) {
      throw new Error("Thiếu thông tin đơn hàng");
    }

    // 1️⃣ Insert order
    const { order_id } = await OrderModel.insert(orderData);

    // 2️⃣ Insert items
    for (const item of orderItems) {
      await OrderItemModel.insert({
        ...item,
        order_id,
      });
    }

    // 3️⃣ Trả về chi tiết order
    return await this.getOrderDetail(order_id);
  }

  // Cập nhật trạng thái
  static async updateOrderStatus(order_id, order_status, payment_status) {
    if (!order_id) throw new Error("order_id is required");
    return await OrderModel.updateStatus(order_id, order_status, payment_status);
  }

  // Lấy lịch sử đơn hàng
  // OrderService.js
static async getOrderHistory(user_id, status = "all") {
  if (!user_id) throw new Error("user_id is required");

  const validStatus = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "refunded",
    "all",
  ];

  if (!validStatus.includes(status)) {
    throw new Error("Trạng thái không hợp lệ");
  }

  return await OrderModel.getHistoryByUserIdAndStatus(user_id, status);
}


}

module.exports = OrderService;
