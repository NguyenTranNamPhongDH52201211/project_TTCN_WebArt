const OrderService = require("../services/OrderService");

class OrderController {
  // Lấy chi tiết order
  static async getOrderDetail(req, res) {
    try {
      const order_id = req.params.order_id;
      const data = await OrderService.getOrderDetail(order_id);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(404).json({ message: err.message });
    }
  }

  // Tạo order
  static async createOrder(req, res) {
    try {
      const { order, items } = req.body;

      const result = await OrderService.createOrder(
        {
          ...order,
        },
        items
      );

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Cập nhật trạng thái
  static async updateStatus(req, res) {
    try {
      const { order_id } = req.params;
      const { order_status, payment_status } = req.body;

      const result = await OrderService.updateOrderStatus(
        order_id,
        order_status,
        payment_status
      );

      res.json({ success: true, result });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
  static async getOrderHistory(req, res) {
    try {
      const user_id = req.params.user_id;
      const { status } = req.query; // ⭐ từ FE

      const orders = await OrderService.getOrderHistory(
        user_id,
        status || "all"
      );

      res.json(orders);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = OrderController;
