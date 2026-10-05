
import React, { createContext, useState } from "react";

// 1️⃣ Context create
const UserContext = createContext(null);

// 2️⃣ Provider create
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // admin / logged user
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user, isLoggedIn, login, logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// 3️⃣ Context export
export default UserContext;
