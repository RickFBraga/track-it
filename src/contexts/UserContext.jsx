import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", image: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("login");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        localStorage.removeItem("login");
      }
    }
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
