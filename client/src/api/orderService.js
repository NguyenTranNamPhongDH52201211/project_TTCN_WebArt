import axios from "axios";

const API_URL = "http://localhost:3000/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getOrderHistoryByUser = async (userId, status = "all") => {
  const res = await axiosClient.get(
    `/orders/history/${userId}?status=${status}`
  );
  return res.data;
};

export const getOrderDetail = async (orderId) => {
  const res = await axiosClient.get(`/orders/${orderId}`);
  return res.data;
};


export const createOrder = async (body) => {
  const res = await axiosClient.post("/orders", body);
  return res.data;
};
