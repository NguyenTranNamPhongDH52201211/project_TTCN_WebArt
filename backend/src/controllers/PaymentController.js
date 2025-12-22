const PaymentService=require("../services/PaymentService")
const PaymentModel=require("../models/PaymentModel")
class PaymentController {
  static async createVnpay(req, res) {
    const { orderId, amount } = req.body;

    await PaymentModel.create({
      orderId,
      method: "vnpay",
      amount,
    });

    const url = PaymentService.createVnpayUrl({
      orderId,
      amount,
      ipAddr: req.ip,
    });

    res.json({ paymentUrl: url });
  }

  static async vnpayCallback(req, res) {
    await PaymentService.handleVnpayCallback(req.query);
    res.redirect(process.env.VNP_SUCCESS_URL);
  }

  static async createMomo(req, res) {
    const { orderId, amount } = req.body;

    await PaymentModel.create({
      orderId,
      method: "momo",
      amount,
    });

    const payUrl = await PaymentService.createMomoUrl({ orderId, amount });
    res.json({ payUrl });
  }

  static async momoCallback(req, res) {
    await PaymentService.handleMomoCallback(req.body);
    res.sendStatus(200);
  }
}
module.exports = PaymentController;
