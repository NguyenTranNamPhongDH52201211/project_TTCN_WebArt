import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../api/productService";
import {
  getCart,
  addCartItem,
  updateCartItemQty,
  deleteCartItem,
  clearCartItems,
} from "../api/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [isSideCartOpen, setSideCartOpen] = useState(false);

  // 🔹 Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Load products failed:", err);
      }
    };

    loadProducts();
  }, []);

  // 🔹 Load cart (guest + user)
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart = await getCart();
        setCartItems(cart.items || []);
      } catch (err) {
        console.error("Load cart failed:", err);
        setCartItems([]);
      }
    };

    loadCart();
  }, [user]);

  // ➕ Add to cart
  const addToCart = async (productId, qty = 1) => {
    try {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      await addCartItem({
        product_id: productId,
        quantity: qty,
        price: product.price,
      });
       
      const cart = await getCart();
      setCartItems(cart.items || []);
      setSideCartOpen(true);
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  // ✏️ Update quantity
  const updateQuantity = async (cartItemId, qty) => {
    try {
      if (qty <= 0) return removeFromCart(cartItemId);

      await updateCartItemQty({
        cart_item_id: cartItemId,
        quantity: qty,
      });

      setCartItems((prev) =>
        prev.map((i) =>
          i.cart_item_id === cartItemId
            ? { ...i, cart_quantity: qty }
            : i
        )
      );
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  // ➕➖ Increase / Decrease (không cần try–catch)
  const increaseQty = (productId) => {
    const item = cartItems.find((i) => i.cart_product_id === productId);
    if (item) updateQuantity(item.cart_item_id, item.cart_quantity + 1);
  };

  const decreaseQty = (productId) => {
    const item = cartItems.find((i) => i.cart_product_id === productId);
    if (!item) return;

    if (item.cart_quantity - 1 <= 0)
      removeFromCart(item.cart_item_id);
    else
      updateQuantity(item.cart_item_id, item.cart_quantity - 1);
  };

  // ❌ Remove item
  const removeFromCart = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      setCartItems((prev) =>
        prev.filter((i) => i.cart_item_id !== cartItemId)
      );
    } catch (err) {
      console.error("Remove item failed:", err);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartItems();
      setCartItems([]);
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };



  const getDetailedCart = () =>
    cartItems
      .map((item) => {
        const product = products.find(
          (p) => p.id === item.cart_product_id
        );
        return product
          ? {
              ...product,
              qty: item.cart_quantity,
              cart_item_id: item.cart_item_id,
            }
          : null;
      })
      .filter(Boolean);

  const getTotalPrice = () =>
    getDetailedCart().reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

  const getFinalTotal = () => {
    const total = getTotalPrice();
    const discount = appliedDiscount
      ? (total * appliedDiscount.value) / 100
      : 0;
    return Math.max(total - discount + shippingFee, 0);
  };

  const getCartCount = () =>
    cartItems.reduce((sum, i) => sum + i.cart_quantity, 0);

  const toggleSideCart = () =>
    setSideCartOpen((prev) => !prev);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        getDetailedCart,
        getTotalPrice,
        getFinalTotal,
        getCartCount,
        toggleSideCart,
        isSideCartOpen,
        appliedDiscount,
        shippingFee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
