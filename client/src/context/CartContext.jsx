import React, { createContext, useContext, useState, useEffect } from "react";
import { products } from "../data/product";
import { discounts } from "../data/discount";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [appliedDiscount, setAppliedDiscount] = useState(null); // mã giảm giá đã áp dụng
  const [shippingFee, setShippingFee] = useState(0); // phí vận chuyển
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  // [{id, qty}]
  const [isSideCartOpen, setSideCartOpen] = useState(false);

  // Thêm ID vào giỏ hàng
  const addToCart = (id, qty = 1) => {
    setCartItems((prev) => {
      const exist = prev.find((x) => x.id === id);
      if (exist) {
        // Thay vì chỉ +1, cộng với qty truyền vào
        return prev.map((x) =>
          x.id === id ? { ...x, qty: x.qty + qty } : x
        );
      }
      return [...prev, { id, qty }]; // thêm mới với qty truyền vào
    });
    setSideCartOpen(true);
  };



  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x.id !== id));
  };

  const toggleSideCart = () => setSideCartOpen((prev) => !prev);
  const getDetailedCart = () => {
    return cartItems
      .map((item) => {
        const product = products.find((p) => p.id == item.id); // dùng == để tránh mismatch
        if (!product) return null; // bỏ qua nếu không tìm thấy
        return { ...product, qty: item.qty };
      })
      .filter(Boolean); // loại bỏ null
  };
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0) // loại bỏ sản phẩm qty = 0
    );
  };

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return Number(priceStr.replace(/[^\d]/g, ""));
    // loại bỏ tất cả ký tự không phải số, ví dụ: "120.000đ" → 120000
  };

  // Thêm hàm này vào bên trong CartProvider, cùng với getDetailedCart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id == item.id);
      if (!product) return total;
      const price = parsePrice(product.price);
      const qty = Number(item.qty) || 0;
      return total + price * qty;
    }, 0);
  };
  const applyDiscount = (code) => {
    const discountObj = discounts.find(d => d.code === code.toUpperCase());
    if (discountObj) {
      setAppliedDiscount(discountObj);
      return true; // áp dụng thành công
    } else {
      setAppliedDiscount(null);
      return false; // mã không hợp lệ
    }
  };

  // Tính tổng cuối cùng sau giảm giá + phí vận chuyển
  const getFinalTotal = () => {
    const totalPrice = getTotalPrice(); // từ cartItems
    let discountAmount = 0;
    if (appliedDiscount) {
      discountAmount = (totalPrice * appliedDiscount.value) / 100;
    }
    return Math.max(totalPrice - discountAmount + shippingFee, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isSideCartOpen,
        toggleSideCart,
        getDetailedCart,
        increaseQty,
        decreaseQty,
        getTotalPrice,
        applyDiscount,
        getFinalTotal, appliedDiscount, shippingFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
