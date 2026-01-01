// utils/passwordUtils.js

export const getPasswordRules = (pwd) => ({
  length6: pwd.length >= 6,
  length8: pwd.length >= 8,
  lower: /[a-z]/.test(pwd),
  upper: /[A-Z]/.test(pwd),
  number: /[0-9]/.test(pwd),
  special: /[^A-Za-z0-9]/.test(pwd),
});

export const checkPasswordStrength = (pwd) => {
  let score = 0;

  if (pwd.length >= 6) score++;
  if (pwd.length >= 8) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 2) return "Yếu";
  if (score <= 4) return "Trung bình";
  return "Mạnh";
};
