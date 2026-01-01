import { createContext, useState, useEffect, useContext } from "react";
import {
  fetchMe,
  signupApi,
  loginApi,
  logoutApi,
  updateProfileApi,
  changePasswordApi,
  sendResetPasswordOtpApi,
  resetPasswordApi,
} from "../api/authenService";

import { auth, googleProvider, facebookProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⭐ THÊM

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetchMe();
        if (res.data.user) setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const signup = async (name, email, password, tel) => {
    const first_name = name.split(" ")[0];
    const last_name = name.split(" ").slice(1).join(" ");

    const body = {
      email,
      password,
      first_name,
      last_name,
      phone: tel,
    };

    const res = await signupApi(body);
    return res.data;
  };

  const login = async (email, password) => {
    await loginApi(email.trim(), password.trim());

    const res = await fetchMe();
    setUser(res.data.user);

    return res.data.user;
  };

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const gUser = result.user;

    const userData = {
      userId: gUser.uid,
      name: gUser.displayName,
      tel: gUser.phoneNumber || "",
      email: gUser.email,
      avatar: gUser.photoURL,
    };

    setUser(userData);
    return userData;
  };

  const loginWithFacebook = async () => {
    facebookProvider.addScope("email");
    facebookProvider.addScope("public_profile");

    const result = await signInWithPopup(auth, facebookProvider);
    const fbUser = result.user;

    const userData = {
      userId: fbUser.uid,
      name: fbUser.displayName,
      tel: fbUser.phoneNumber || "",
      email: fbUser.email,
      avatar: fbUser.photoURL,
    };

    setUser(userData);
    return userData;
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };
  const updateProfile = async (body) => {
    const res = await updateProfileApi(body);

    if (res.data.user) {
      setUser(res.data.user); // ⭐ cập nhật lại context
    }

    return res.data.user;
  };
  const changePassword = async (oldPassword, newPassword) => {
    try {
      const res = await changePasswordApi({
        oldPassword,
        newPassword,
      });

      return res.data.message;
    } catch (err) {
      console.error("Change password error:", err);
      throw err;
    }
  };
  const sendResetPasswordOtp = async (email) => {
    try {
      const res = await sendResetPasswordOtpApi(email);
      return res.data.message; // "Nếu email tồn tại, mã OTP đã được gửi"
    } catch (err) {
      throw err.response?.data?.message || "Server error";
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const res = await resetPasswordApi({ email, otp, newPassword });
      return res.data.message; // "Đặt lại mật khẩu thành công!"
    } catch (err) {
      throw err.response?.data?.message || "Server error";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loading,
        signup,
        loginWithGoogle,
        loginWithFacebook,
        logout,
        updateProfile,
        changePassword,
        sendResetPasswordOtp,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
