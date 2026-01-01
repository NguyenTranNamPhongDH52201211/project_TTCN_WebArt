import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getOrderHistoryByUser,
  getOrderDetail,
  createOrder,
} from "../api/orderService";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [error, setError] = useState(null);

  const loadOrders = async (status = "all") => {
    if (!user?.user_id) return;

    setLoadingOrder(true);
    setError(null);
    try {
      const data = await getOrderHistoryByUser(user.user_id, status);
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Không tải được lịch sử đơn hàng");
    } finally {
      setLoadingOrder(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [user]);

  const fetchOrderDetail = async (orderId) => {
    setLoadingOrder(true);
    setError(null);
    try {
      const data = await getOrderDetail(orderId);
      setSelectedOrder(data);
    } catch (err) {
      console.error("Fetch order detail error:", err);
      setError(
        err.response?.data?.message || "Không lấy được chi tiết đơn hàng"
      );
    } finally {
      setLoadingOrder(false);
    }
  };
  const closeOrderDetail = () => {
    setSelectedOrder(null);
  };

  const checkout = async (orderData, items) => {
    setLoadingOrder(true);
    setError(null);
    try {
      const result = await createOrder({
        order: orderData,
        items,
      });

      // reload lịch sử sau khi tạo
      try {
        const history = await getOrderHistoryByUser(orderData.order_user_id);
        setOrders(history);
      } catch (err) {
        console.error("Reload order history error:", err);
      }

      return result;
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.response?.data?.message || "Tạo đơn hàng thất bại");
      throw err;
    } finally {
      setLoadingOrder(false);
    }
  };
  if (loading) return null;

  return (
    <OrderContext.Provider
      value={{
        orders,
        selectedOrder,
        fetchOrderDetail,
        closeOrderDetail,
        checkout,
        loadingOrder,
        error,
        loadOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
