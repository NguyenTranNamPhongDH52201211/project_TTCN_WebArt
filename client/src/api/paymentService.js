// src/api/paymentService.js
import axios from "axios";

const API = "http://localhost:3000/api/payments";

export const createVnpayPayment = async ({ orderId, amount }) => {
  const res = await axios.post(
    `${API}/vnpay/create`,
    { orderId, amount },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  // ⚠️ redirect sang VNPAY
  window.location.href = res.data.paymentUrl;
};

export const createMomoPayment = async ({ orderId, amount }) => {
  const res = await axios.post(
    `${API}/momo/create`,
    { orderId, amount },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  // ⚠️ redirect sang MOMO
  window.location.href = res.data.payUrl;
};
