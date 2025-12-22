import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAddressesByUser,
  getDefaultAddress,
  createAddress,
  setDefaultAddress,
} from "../api/addressService";
import { useAuth } from "./AuthContext";

const AddressContext = createContext();
export const useAddress = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddressState] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 📍 Load address CHỈ KHI USER LOGIN
   */
  useEffect(() => {
    if (!user?.user_id) return;

    const loadAddresses = async () => {
      setLoadingAddress(true);
      setError(null);

      try {
        const list = await getAddressesByUser(user.user_id);
        setAddresses(list || []);

        const def = await getDefaultAddress(user.user_id);
        setDefaultAddressState(def || null);
      } catch (err) {
        setError(err.response?.data?.message || "Không tải được địa chỉ");
      } finally {
        setLoadingAddress(false);
      }
    };

    loadAddresses();
  }, [user]);

  /**
   * ➕ THÊM ADDRESS – CHỈ USER
   */
  const addAddress = async (data) => {
    if (!user?.user_id) {
      throw new Error("Guest không có sổ địa chỉ");
    }

    setLoadingAddress(true);
    setError(null);

    try {
      const result = await createAddress({
        ...data,
        address_user_id: user.user_id,
      });

      const list = await getAddressesByUser(user.user_id);
      setAddresses(list || []);

      const def = await getDefaultAddress(user.user_id);
      setDefaultAddressState(def || null);

      return result;
    } finally {
      setLoadingAddress(false);
    }
  };

  /**
   * ⭐ Set mặc định – CHỈ USER
   */
  const makeDefault = async (addressId) => {
    if (!user?.user_id) return;

    setLoadingAddress(true);
    setError(null);

    try {
      await setDefaultAddress(addressId, user.user_id);

      const list = await getAddressesByUser(user.user_id);
      setAddresses(list || []);

      const def = await getDefaultAddress(user.user_id);
      setDefaultAddressState(def || null);
    } finally {
      setLoadingAddress(false);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        defaultAddress,
        addAddress,
        makeDefault,
        loadingAddress,
        error,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};
