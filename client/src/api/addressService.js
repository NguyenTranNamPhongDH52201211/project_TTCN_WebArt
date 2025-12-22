import axios from "axios";

const API_URL = "http://localhost:3000/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// USER
export const getAddressesByUser = async (userId) => {
  const res = await axiosClient.get(`/addresses/${userId}`);
  return res.data;
};

export const getDefaultAddress = async (userId) => {
  const res = await axiosClient.get(`/addresses/${userId}/default`);
  return res.data;
};

// USER + GUEST (user_id có thể null)
export const createAddress = async (data) => {
  const res = await axiosClient.post("/addresses", data);
  return res.data;
};

export const setDefaultAddress = async (addressId, userId) => {
  const res = await axiosClient.put(
    `/addresses/${addressId}/default`,
    { user_id: userId }
  );
  return res.data;
};
