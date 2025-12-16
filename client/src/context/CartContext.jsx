import React, { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../api/productService";
import {
  getCartByUser,
  getCartItems,
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
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [isSideCartOpen, setSideCartOpen] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);


  useEffect(() => {
    if (!user?.user_id) return;

    const loadCart = async () => {
      const data = await getCartByUser(user.user_id);
      setCartId(data.cart_id);
    };

    loadCart();
  }, [user]);


  useEffect(() => {
    if (!cartId) return;

    const loadItems = async () => {
      const data = await getCartItems(cartId);
      setCartItems(data);
    };

    loadItems();
  }, [cartId]);

  const addToCart = async (productId, qty = 1) => {
    if (!cartId) return;

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    await addCartItem({
      cart_id: cartId,
      product_id: productId,
      quantity: qty,
      price: product.price,
    });

    setCartItems(await getCartItems(cartId));
    setSideCartOpen(true);
  };


  const updateQuantity = async (productId, qty) => {
    if (!cartId || qty <= 0) return;

    await updateCartItemQty({
      cart_id: cartId,
      product_id: productId,
      quantity: qty,
    });

    setCartItems((prev) =>
      prev.map((item) =>
        item.cart_product_id === productId
          ? { ...item, cart_quantity: qty }
          : item
      )
    );
  };

  const increaseQty = (productId) => {
    const item = cartItems.find((i) => i.cart_product_id === productId);
    if (item) updateQuantity(productId, item.cart_quantity + 1);
  };

  const decreaseQty = (productId) => {
    const item = cartItems.find((i) => i.cart_product_id === productId);
    if (!item) return;
    if (item.cart_quantity - 1 <= 0)
      removeFromCart(item.cart_item_id);
    else updateQuantity(productId, item.cart_quantity - 1);
  };

 
  const removeFromCart = async (cartItemId) => {
    await deleteCartItem(cartItemId);
    setCartItems((prev) =>
      prev.filter((i) => i.cart_item_id !== cartItemId)
    );
  };


  const clearCart = async () => {
    if (!cartId) return;
    await clearCartItems(cartId);
    setCartItems([]);
  };


  const parsePrice = (price) =>
    Number(String(price).replace(/[^\d]/g, ""));

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
      (sum, item) => sum + parsePrice(item.price) * item.qty,
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

  const toggleSideCart = () => setSideCartOpen((prev) => !prev);

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
