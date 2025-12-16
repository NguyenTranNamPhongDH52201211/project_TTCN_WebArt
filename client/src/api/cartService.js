// api/cartService.js
const API_URL = "http://localhost:3000/api";

export const getCartByUser = async (userId) => {
  const res = await fetch(`${API_URL}/cart/${userId}`);
  return res.json();
};

export const getCartItems = async (cartId) => {
  const res = await fetch(`${API_URL}/cart-item/${cartId}`);
  return res.json();
};

export const addCartItem = async (body) => {
  await fetch(`${API_URL}/cart-item/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const updateCartItemQty = async (body) => {
  await fetch(`${API_URL}/cart-item/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const deleteCartItem = async (cartItemId) => {
  await fetch(`${API_URL}/cart-item/${cartItemId}`, {
    method: "DELETE",
  });
};

export const clearCartItems = async (cartId) => {
  await fetch(`${API_URL}/cart-item/clear/${cartId}`, {
    method: "DELETE",
  });
};
