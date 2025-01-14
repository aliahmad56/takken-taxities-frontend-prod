import React, { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Create the context provider
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState();

  const isLoggedIn = () => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    if (userData && userData.token) {
      return { isLoggedIn: true, userData: userData };
    } else {
      return { isLoggedIn: false };
    }
  };

  const logOut = () => {
    // Clear local storage
    localStorage.removeItem("userData");
    setAuthUser(null);
    // window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoggedIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
