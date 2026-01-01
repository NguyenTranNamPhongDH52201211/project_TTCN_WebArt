// api/authenService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/authen";

export const fetchMe = () => {
  return axios.get(`${API_URL}/me`, {
    withCredentials: true,
  });
};
export const updateProfileApi = (body) => {
  return axios.put(`${API_URL}/me/profile`, body, {
    withCredentials: true,
  });
};
export const changePasswordApi = (body) => {
  return axios.put(`${API_URL}/me/password`, body, {
    withCredentials: true,
  });
};

export const signupApi = (body) => {
  return axios.post(`${API_URL}/signup`, body, {
    headers: { "Content-Type": "application/json" },
  });
};

export const loginApi = (email, password) => {
  return axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
};

export const logoutApi = () => {
  return axios.post(
    `${API_URL}/logout`,
    {},
    { withCredentials: true }
  );
};
// gửi OTP quên mật khẩu
export const sendResetPasswordOtpApi = (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

// đặt lại mật khẩu
export const resetPasswordApi = ({ email, otp, newPassword }) => {
  return axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
};
