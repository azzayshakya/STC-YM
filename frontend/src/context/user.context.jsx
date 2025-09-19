import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("stcUser")) || null;
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("stcUser"));
    const token = localStorage.getItem("stcUserToken");
    if (!token || !storedUser) {
      setUser(null);
      localStorage.removeItem("stcUser");
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("stcUser", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
