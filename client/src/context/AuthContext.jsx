import { createContext, useState, useEffect, useContext } from "react";
import { fetchMe, signupApi, loginApi, logoutApi } from "../api/authenService";

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
      }finally{
        setLoading(false)
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
    const res = await loginApi(email.trim(), password.trim());
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
