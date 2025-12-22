const crypto = require("crypto");
const qs = require("qs");
const axios = require("axios");
class PaymentService {

  // ========= VNPAY =========
  static createVnpayUrl({ orderId, amount, ipAddr }) {
    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

    const createDate = new Date()
      .toISOString()
      .replace(/[-:TZ]/g, "")
      .slice(0, 14);

    let params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Amount: amount * 100,
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: "Thanh toán VNPAY",
      vnp_OrderType: "other",
      vnp_Locale: "vn",
      vnp_ReturnUrl: process.env.VNP_RETURN_URL,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate
    };

    params = this.sortObject(params);

    const signData = qs.stringify(params, { encode: false });
    const hash = crypto
      .createHmac("sha512", secretKey)
      .update(signData)
      .digest("hex");

    params.vnp_SecureHash = hash;

    return vnpUrl + "?" + qs.stringify(params, { encode: false });
  }

  // ========= MOMO =========
  static async createMomoUrl({ orderId, amount }) {
    const rawSignature =
      `accessKey=${process.env.MOMO_ACCESS_KEY}` +
      `&amount=${amount}` +
      `&extraData=` +
      `&ipnUrl=${process.env.MOMO_IPN_URL}` +
      `&orderId=${orderId}` +
      `&orderInfo=Thanh toán MOMO` +
      `&partnerCode=${process.env.MOMO_PARTNER_CODE}` +
      `&redirectUrl=${process.env.MOMO_REDIRECT_URL}` +
      `&requestId=${orderId}` +
      `&requestType=captureWallet`;

    const signature = crypto
      .createHmac("sha256", process.env.MOMO_SECRET_KEY)
      .update(rawSignature)
      .digest("hex");

    const body = {
      partnerCode: process.env.MOMO_PARTNER_CODE,
      accessKey: process.env.MOMO_ACCESS_KEY,
      requestId: orderId,
      amount,
      orderId,
      orderInfo: "Thanh toán MOMO",
      redirectUrl: process.env.MOMO_REDIRECT_URL,
      ipnUrl: process.env.MOMO_IPN_URL,
      requestType: "captureWallet",
      extraData: "",
      signature,
      lang: "vi"
    };

    const res = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      body
    );

    return res.data.payUrl;
  }

  static sortObject(obj) {
    return Object.keys(obj)
      .sort()
      .reduce((r, k) => {
        r[k] = obj[k];
        return r;
      }, {});
  }
}

module.exports = PaymentService;
