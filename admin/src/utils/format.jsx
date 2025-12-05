// src/utils/format.js
export const formatVND_vi = (value) => {
  if (value === null || value === undefined || value === "") return "";
  const n = Number(value);
  if (Number.isNaN(n)) return "";
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(Math.round(n));
};

export const parseVND = (str) => {
  if (!str) return null;
  const cleaned = String(str).replace(/[^\d]/g, '');
  if (!/^\d+$/.test(cleaned)) return null;
  return parseInt(cleaned, 10);
};