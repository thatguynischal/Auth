import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const saveAuthToStorage = (authData) => {
    // Save the authData to localStorage or sessionStorage
    localStorage.setItem("user", JSON.stringify(authData));
  };

  const updateAuth = (authData) => {
    setAuth(authData);
    saveAuthToStorage(authData);
  };

  const removeAuthFromStorage = () => {
    // Remove the auth data from localStorage or sessionStorage
    localStorage.removeItem("auth");
  };

  const getAuth = () => {
    const user = localStorage.getItem("data");

    if (data) {
      return JSON.parse(data);
    }
    return undefined;
  };

  const getToken = () => {
    const { token_type, access_token } = getAuth();
    const token = `${token_type} ${access_token}`;
    return token;
  };

  const logout = () => {
    setAuth(null);
    removeAuthFromStorage();
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: updateAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
