import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    userId: null,
    email: null,
    role: null,
    name: null,
  });

  let logoutTimer;

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      const exp = decoded.exp * 1000;
      const now = Date.now();

      if (exp < now) {
        logout();
        return;
      }

      setAuthState({
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.status,
        name: decoded.name,
      });
      localStorage.setItem("authToken", token);

      // Set logout timer
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        logout();
      }, exp - now);
    } catch (error) {
      console.error("Invalid token", error);
    }
  };

  const logout = () => {
    setAuthState({
      userId: null,
      email: null,
      role: null,
      name: null,
    });
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      login(token);
    }
    return () => clearTimeout(logoutTimer);
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
