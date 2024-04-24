import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    if (checkUser) {
      fetchUserData();
    }
  }, [checkUser, user]);

  const fetchUserData = async () => {
    try {
      setCheckUser(true);
      const response = await axiosInstance.post("user/logged-in");
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setCheckUser(false);
    }
  };

  const LogOut = async () => {
    await axiosInstance.post("/user/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        LogOut,
        fetchUserData,
        checkUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
