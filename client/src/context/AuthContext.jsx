import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { auth, googleProvider, facebookProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/authen/me", {
          withCredentials: true,
        });
        if (res.data.user) setUser(res.data.user);
      } catch {}
    };
    fetchUser();
  }, []);

  const signup = async (name, email, password, tel) => {
    const first_name = name.split(" ").slice(0, 1).join(" ");
    const last_name = name.split(" ").slice(1).join(" ");

    const body = {
      email,
      password,
      first_name,
      last_name,
      phone: tel
    };
    const res = await axios.post(
      "http://localhost:3000/api/authen/signup",
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    return res.data;
  };

  const login = async (email, password) => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    const res = await axios.post(
      "http://localhost:3000/api/authen/login",
      { email: cleanEmail, password: cleanPassword },
      { withCredentials: true }
    );

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
    facebookProvider.setCustomParameters({
      auth_type: "reauthenticate",
      display: "popup",
    });

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
    await axios.post(
      "http://localhost:3000/api/authen/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,                // <--- Thêm vào Context
        loginWithGoogle,
        loginWithFacebook,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
