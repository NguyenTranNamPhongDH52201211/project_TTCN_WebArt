import axios from "axios";

const API_URL = "http://localhost:3000/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ⭐⭐⭐ BẮT BUỘC
});

/**
 * 🛒 Lấy giỏ hàng của user
 */
export const getCart = async () => {
  const res = await axiosClient.get("/cart");
  return res.data;
};
/**
 * 🛍️ Lấy các item trong giỏ
 */
export const getCartItems = async (cartId) => {
  const res = await axiosClient.get(`/cart-item/${cartId}`);
  return res.data;
};

/**
 * ➕ Thêm item vào giỏ
 */
export const addCartItem = async (body) => {
  const res = await axiosClient.post("/cart-item/", body);
  return res.data;
};

export const updateCartItemQty = async (body) => {
  const res = await axiosClient.put("/cart-item", body);
  return res.data;
};
/**
 * ❌ Xoá 1 item trong giỏ
 */
export const deleteCartItem = async (cartItemId) => {
  const res = await axiosClient.delete(`/cart-item/${cartItemId}`);
  return res.data;
};

export const clearCartItems = async () => {
  const res = await axiosClient.delete("/cart-item/clear/all");
  return res.data;
};
